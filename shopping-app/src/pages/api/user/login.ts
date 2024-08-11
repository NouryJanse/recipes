import type { APIRoute } from 'astro'
import getAPIDatabaseConnection from '../../../services/getAPIDatabaseConnection'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../../../data/User'
import Tokens from 'csrf'
const tokens = new Tokens()

const jwtSecret = import.meta.env.JWT_SECRET || ''
const csrfSecret: string = import.meta.env.CSRF_SECRET as string

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    await getAPIDatabaseConnection()
    const formData = await request.formData()
    const username = formData.get('username')?.toString()
    const password = formData.get('password')?.toString()
    const _csrf = formData.get('_csrf')?.toString()

    if (!_csrf || (_csrf && !tokens.verify(csrfSecret, _csrf))) {
        return new Response(
            JSON.stringify({
                message: 'Login not succesful',
            }),
        )
    }

    if (!username || !password) {
        return new Response(
            JSON.stringify({
                message: 'Username or Password not present',
            }),
        )
    }

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return new Response(
                JSON.stringify({
                    message: 'Login not successful',
                    error: 'User not found',
                }),
            )
        } else {
            // comparing given password with hashed password
            return bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const maxAge = 3 * 60 * 60
                    const token = jwt.sign({ id: user._id, username, role: user.role }, jwtSecret, {
                        expiresIn: maxAge, // 3hrs in sec
                    })

                    cookies.set('jwt', token, {
                        path: '/',
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    })

                    return redirect('/')
                } else {
                    return new Response(
                        JSON.stringify({
                            message: 'Login not succesful',
                        }),
                    )
                }
            })
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(
                JSON.stringify({
                    message: 'An error occurred',
                    error: error.message,
                }),
            )
        }
    }
}
