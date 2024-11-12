import { useCookies } from "react-cookie";
import { UserCredentials } from "../Models/UserCredentials";

export function useUserCredentials() : [() => boolean, () => UserCredentials | null] {
  const [cookies] = useCookies(["token"]);

  const isLoggedIn = (): boolean => {
    return cookies.token !== undefined;
  };

  const getUserCredentials = (): UserCredentials | null => {
    if (isLoggedIn()) {
      return {
        token: cookies.token,
      } as UserCredentials;
    }

    return null;
  };

  return [isLoggedIn, getUserCredentials];
}
