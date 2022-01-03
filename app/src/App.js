import "./bootstrap-grid.css";
import "./bootstrap-reboot.css";
import Home from "./containers/Home";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "./components";
import {
  userSlice,
  storeToken,
  storeUser,
} from "./redux/reducers/users/userSlice";
import { useEffect } from "react";

const endpoint = process.env.REACT_APP_AUTH0_URL;

function App({ auth0 }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.data.user);

  useEffect(() => {
    if (auth0.token) {
      dispatch(storeToken(auth0.token));
    }
    if (auth0.user) {
      dispatch(storeUser(auth0.user));
    }
  }, [auth0, auth0.isAuthenticated, auth0.user]);

  const fetchRecipe = async () => {
    const response = await axios.get("http://localhost:1337/api/recipes/1", {
      headers: {
        Authorization: "Bearer " + auth0.token,
      },
    });
    console.log(response.data);
  };

  const loginUser = async () => {
    const user = await auth0.login();
    dispatch(storeUser(user));
  };

  const loginButton = (
    <div>
      <Button onClick={() => loginUser()} label="Login" />
    </div>
  );

  // if (error) {
  //   if (error.error === "login_required") {
  //     return loginButton;
  //   }
  //   if (error.error === "consent_required") {
  //     return (
  //       <Button
  //         // onClick={getTokenAndTryAgain}
  //         label="Consent to reading users"
  //       />
  //     );
  //   }
  //   return <div>Oops {error.message}</div>;
  // }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (user) {
    return (
      <div>
        <Home user={user} logout={auth0.logout} />
      </div>
    );
  } else {
    return <div>{loginButton}</div>;
  }
}

export default App;
