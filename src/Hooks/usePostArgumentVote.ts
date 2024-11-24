import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ArgumentVoteType } from "../Models/ArgumentVoteType";

export function usePostArgumentVote() {
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const postArgumentVote = async (argumentId: string, voteType: ArgumentVoteType) : Promise<void> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/discussions/arguments/${argumentId}/vote?voteType=${voteType}`;
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    };

    let response = await fetch(url, options);

    if (response.status == 401) {
      removeCookie('token', { path: '/' });
      navigate('/login');
    }
  }

  return postArgumentVote;
}