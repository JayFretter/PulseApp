import { PostNewUserBody } from '../Models/PostNewUserBody';
import { ValidationErrorResponse } from '../Models/ValidationErrorResponse';

export function usePostNewUser() {
  const postNewUser = async (body: PostNewUserBody): Promise<ValidationErrorResponse> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/users`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    };

    let response: ValidationErrorResponse = {
      validationErrors: [],
    };

    await fetch(url, options)
      .then((res) => {
        if (res.status == 400) {
          return res.json();
        }
      })
      .then((json) => {
        if (json)
          response = json as ValidationErrorResponse;
      })
      .catch((err) => console.error(err));

    return response;
  };

  return postNewUser;
}
