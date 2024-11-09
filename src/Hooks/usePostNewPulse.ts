import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { PostNewPulseBody } from "../Models/PostNewPulseBody";

export function usePostNewPulse() {
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const postNewPulse = async (body: PostNewPulseBody) : Promise<boolean> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/pulses/create`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    };

    let response = await fetch(url, options);

    if (response.ok)
      return true;

    if (response.status == 401) {
      removeCookie('token', { path: '/' });
      navigate('/login');
    }

    return false;
  }

  return postNewPulse;
}