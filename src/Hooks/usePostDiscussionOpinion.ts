import { useCookies } from "react-cookie";
import { PostOpinionBody } from "../Models/PostOpinionBody";
import { useNavigate } from "react-router-dom";

export function usePostDiscussionOpinion() {
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const postOpinion = async (body: PostOpinionBody) : Promise<boolean> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/discussions/add-comment`;
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

  return postOpinion;
}