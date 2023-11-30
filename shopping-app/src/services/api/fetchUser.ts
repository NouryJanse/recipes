import type { User } from "../types.db";
import verifyJWT from "../verifyjwt";

const fetchUser = async (jwtCookie: {
  value: string;
  json(): any;
  number(): number;
  boolean(): boolean;
}): Promise<User | false> => {
  const jwt = jwtCookie?.value ? jwtCookie.value : "";
  const verified = verifyJWT(jwt);
  if (typeof verified === "object" && verified?.id) {
    // user exists and verified
    return {
      id: verified.id,
    };
  }
  return false;
};

export { fetchUser };
