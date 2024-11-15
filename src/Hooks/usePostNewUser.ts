import { PostNewUserBody } from "../Models/PostNewUserBody";

export function usePostNewUser() {

  const postNewUser = async (body: PostNewUserBody) : Promise<boolean> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/users`;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    };

    let success = true;

    fetch(url, options)
      .then((res) => {
        if (res.status == 400)
          success = false;
      })
      .catch((err) => console.error(err));

      return success;
  }

  return postNewUser;
}