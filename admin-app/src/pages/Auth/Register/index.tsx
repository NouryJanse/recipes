import React, { ReactElement, useState } from 'react'
import { Button } from '../../../components'

type RegisterProps = {
    onUserRegistration: (username: string, password: string) => void
    setShowRegistration: React.Dispatch<React.SetStateAction<boolean>>
}

const Register: React.FC<RegisterProps> = ({
    onUserRegistration,
    setShowRegistration,
}): ReactElement => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <div className="page--register-login page--register">
            <div className="container login-hero">
                <h1>Register</h1>
                <div className="blob"></div>
            </div>

            <div className="container login-form">
                <h1>Register</h1>

                <form action="/api/user/register" method="post">
                    <label htmlFor="username">
                        <span>Username</span>

                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            placeholder="Username here..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                    </label>

                    <label htmlFor="new-password">
                        <span>Password</span>

                        <input
                            id="new-password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            placeholder="Password here..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <div className="buttons">
                        <Button
                            type="button"
                            buttonStyle="secondary"
                            onClick={() => setShowRegistration(false)}
                            label="To sign in"
                        />
                        <Button
                            type="button"
                            onClick={() => onUserRegistration(username, password)}
                            label="Sign up"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
