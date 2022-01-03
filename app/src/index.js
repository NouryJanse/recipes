import React from "react";
import { render } from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { GlobalStyle } from "./styles/globalStyle";
import { GlobalFonts } from "./styles/fonts";
import App from "./App";
import Auth0 from "./Auth0";

const redirectURI = process.env.REACT_APP_AUTH0_REDIRECT_URI;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const useRefreshTokens = process.env.REACT_APP_AUTH0_REFRESH_TOKENS;
const cacheLocation = process.env.REACT_APP_AUTH0_LOCATION;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

const auth0 = new Auth0(redirectURI, scope);
auth0
  .initiate({
    domain,
    clientId,
    audience,
    useRefreshTokens,
    cacheLocation,
    scope,
  })
  .then(() => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <GlobalStyle />
            <GlobalFonts />
            <App auth0={auth0} />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
