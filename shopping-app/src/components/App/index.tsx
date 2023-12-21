import type { FunctionComponent } from "preact";
import type { User } from "../../services/types.db";
import { setUser } from "../../services/store";
import { useEffect } from "preact/hooks";

type AppProps = {
  user: User;
};

const App: FunctionComponent<AppProps> = ({ user }) => {
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);
  return <></>;
};

export default App;
