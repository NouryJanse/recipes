import createAuth0Client from "@auth0/auth0-spa-js";

class Auth0 {
  constructor(redirectURI = "", scope = "") {
    this.redirect_uri = redirectURI;
    this.scope = scope;
    this.token = null;
    this.auth0Client = null;
    this.user = null;
    this.error = null;
    this.isLoading = false;
  }

  initiate = async ({
    domain,
    clientId,
    audience,
    useRefreshTokens,
    cacheLocation,
    scope,
  }) => {
    try {
      this.toggleIsloading(true);
      this.auth0Client = await createAuth0Client({
        domain,
        client_id: clientId,
        useRefreshTokens,
        cacheLocation,
        audience,
        scope,
      });
      await this.getTokenSilently();
      this.toggleIsloading(false);
      return;
    } catch (error) {
      this.error = error;
      console.error(error);
    }
  };

  login = async () => {
    try {
      this.toggleIsloading(true);

      const login = await this.auth0Client
        .loginWithPopup({
          redirect_uri: "http://localhost:3000/",
        })
        .then(async (res) => {
          console.log(res);
          return await this.getUser();
        });

      this.toggleIsloading(false);
      return login;
    } catch (error) {
      this.error = error;
      console.error(error);
    }
  };

  getUser = async () => {
    try {
      this.user = await this.auth0Client.getUser();
      return this.user;
    } catch (error) {
      this.error = error;
      console.error(error);
    }
  };

  logout = async () => {
    try {
      await this.auth0Client.logout({
        returnTo: "http://localhost:3000/",
      });
    } catch (error) {
      this.error = error;
      console.error(error);
    }
  };

  getTokenSilently = async () => {
    try {
      this.toggleIsloading(true);
      this.token = await this.auth0Client.getTokenSilently({
        scope: "read:current_user",
      });
      this.toggleIsloading(false);
      return this.token;
    } catch (error) {
      if (error.error !== "login_required") {
        this.error = error;
        console.error(error);
        throw error;
      } else {
        console.log("login required");
      }
    }
  };

  toggleIsloading = (state = false) => {
    this.isLoading = state;
  };
}

export default Auth0;
