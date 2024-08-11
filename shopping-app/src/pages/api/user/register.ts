import type { APIRoute } from 'astro'
import { User } from '../../../data/User'
import getAPIDatabaseConnection from '../../../services/getAPIDatabaseConnection'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
                message: 'Registration not successful',
            }),
        )
    }

    if (!password || password.length < 6) {
        return new Response(
            JSON.stringify({
                message: 'Password less than 6 characters',
            }),
        )
    }

    try {
        return bcrypt.hash(password, 10).then(async (hash) => {
            return await User.create({
                username,
                password: hash,
            })
                .then((user) => {
                    const maxAge = 3 * 60 * 60
                    const token = jwt.sign({ id: user._id, username, role: user.role }, jwtSecret, {
                        expiresIn: maxAge, // 3hrs in sec
                    })

                    cookies.set('jwt', token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    })

                    return redirect('/user/login')
                })
                .catch((error) => {
                    return new Response(
                        JSON.stringify({
                            message: 'User not successful created',
                            error: error.message,
                        }),
                    )
                })
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(
                JSON.stringify({
                    message: 'User not successful created',
                    error: error.message,
                }),
            )
        }
    }
}
