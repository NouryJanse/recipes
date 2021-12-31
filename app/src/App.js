import "./bootstrap-grid.css";
import "./bootstrap-reboot.css";
import Home from "./containers/Home";
import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "./useApi";
import axios from "axios";

import { Button } from "./components";
import { fetchRecipes } from "./redux/reducers/recipes/recipeSlice";

const endpoint = process.env.REACT_APP_AUTH0_URL;

function App() {
  const opts = {
    audience: `${endpoint}/`,
    scope: "read:users",
  };

  const {
    logout,
    getAccessTokenWithPopup,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user,
  } = useAuth0();

  const { error, refresh, data } = useApi(`${endpoint}/users/`, opts);

  const getTokenAndTryAgain = async () => {
    await getAccessTokenWithPopup(opts);
    refresh();
  };

  const fetchRecipe = async () => {
    const response = await axios.get("http://localhost:1337/api/recipes/1", {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    console.log(response.data);
  };

  const loginButton = (
    <div>
      <Button onClick={() => loginWithRedirect()} label="Login" />
      <Button onClick={fetchRecipe} label="Fetch recipe" />
    </div>
  );

  if (error) {
    if (error.error === "login_required") {
      return loginButton;
    }
    if (error.error === "consent_required") {
      return (
        <Button
          onClick={getTokenAndTryAgain}
          label="Consent to reading users"
        />
      );
    }
    return <div>Oops {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <Button onClick={fetchRecipe} label="Fetch recipe" />
        <Home user={user} logout={logout} />
      </div>
    );
  } else {
    return loginButton;
  }
}

export default App;
