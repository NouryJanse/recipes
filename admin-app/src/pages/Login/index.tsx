import React, { ReactElement } from 'react'
import { PageTitle } from '../../components'

const Login: React.FC = (): ReactElement => {
  return (
    <div className="inline-flex flex-col justify-center p-5 sm:p-15 md:p-24 xl:p-48">
      <PageTitle text="Please login to continue." />

      <p className="mb-1">
        Hi! My name is Noury Janse and I&apos;m a Web Developer. This recipes application allows you to create and
        manage recipes.
      </p>

      <div className="page--register-login">
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
                autoComplete="username"
                placeholder="Username here..."
                required
                autoFocus
                value="alice"
              />
            </label>

            <label htmlFor="current-password">
              <span>Password</span>
              <input
                id="current-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password here..."
                required
                value="wonderland"
              />
            </label>

            {/* <input type="hidden" name="_csrf" value={token} /> */}

            <div className="buttons">
              <a href="/user/register">
                <button type="button">Register</button>
              </a>

              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <button type="button">Login</button>
      </div>
    </div>
  )
}

export default Login
