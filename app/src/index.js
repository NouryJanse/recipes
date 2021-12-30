import React from "react";
import { render } from "react-dom";
import App from "./App";

import { GlobalStyle } from "./styles/globalStyle";
import { GlobalFonts } from "./styles/fonts";

import reportWebVitals from "./reportWebVitals";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import { Auth0Provider } from "@auth0/auth0-react";

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />

        <GlobalFonts />

        <Auth0Provider
          domain=""
          clientId=""
          redirectUri={window.location.origin}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
