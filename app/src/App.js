import "./bootstrap-grid.css";
import "./bootstrap-reboot.css";
import Home from "./containers/Home";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "./components";
import { storeToken, storeUser } from "./redux/reducers/users/userSlice";
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
  }, [auth0, auth0.isAuthenticated, auth0.user, auth0.isLoading]);

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

  if (auth0.isLoading) {
    return <div>Loading...</div>;
  }

  if (user && Object.keys(user).length) {
    return (
      <div>
        {auth0.isLoading}
        <Home user={user} logout={auth0.logout} />
      </div>
    );
  } else {
    return <div>{loginButton}</div>;
  }
}

export default App;
