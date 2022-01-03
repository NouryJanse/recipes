import { createAsyncThunk } from "@reduxjs/toolkit";
import createAuth0Client from "@auth0/auth0-spa-js";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const useRefreshTokens = process.env.REACT_APP_AUTH0_REFRESH_TOKENS;
const cacheLocation = process.env.REACT_APP_AUTH0_LOCATION;
const scope = process.env.REACT_APP_AUTH0_SCOPE;

async function initAuth0API(data) {
  try {
    return await createAuth0Client({
      domain,
      client_id: clientId,
      useRefreshTokens,
      cacheLocation,
      audience,
      scope,
    });
  } catch (error) {
    this.error = error;
    console.error(error);
  }
}

export const initiateAuth0Thunk = createAsyncThunk(
  "users/initAuth0",
  async (data, state) => {
    const response = await initAuth0API(data);
    return response;
  }
);
