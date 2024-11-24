import { LoginResponse } from '../Models/LoginResponse';
import { PostLoginBody } from '../Models/PostLoginBody';

export function usePostLogin() {
  const postLogin = async (body: PostLoginBody): Promise<LoginResponse | null> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/users/login`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    };

    let loginResponse: LoginResponse | null = null;

    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => loginResponse = data)
      .catch((err) => console.error(err));

    return loginResponse;
  };

  return postLogin;
}
