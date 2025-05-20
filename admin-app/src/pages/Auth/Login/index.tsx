import React, { KeyboardEvent, KeyboardEventHandler, ReactElement, useState } from 'react'
import { Button, PageTitle } from '../../../components'
import useAuth from '../useAuth'

const Login: React.FC = (): ReactElement => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { onUserLogin, setShowRegistration } = useAuth()

    return (
        <div
            className="page--register-login"
            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                if (e.code === 'Enter' && onUserLogin) onUserLogin(username, password)
            }}
            tabIndex={0}
        >
            <div className="container login-hero">
                <div>
                    <h1>Sign in</h1>
                    <div className="blob"></div>
                </div>
            </div>

            <div className="container login-form">
                <h1>Sign in</h1>

                <form action="/api/user/login" method="post">
                    <label htmlFor="username">
                        <span>Username</span>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username here..."
                            required
                            value={username}
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </label>
                    <label htmlFor="current-password">
                        <span>Password</span>
                        <input
                            id="current-password"
                            name="password"
                            type="password"
                            placeholder="Password here..."
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <div className="buttons">
                        <Button
                            type="button"
                            buttonStyle="secondary"
                            onClick={() => setShowRegistration(true)}
                            label="To register"
                        />
                        <Button
                            type="button"
                            onClick={() => onUserLogin(username, password)}
                            label="Login"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
