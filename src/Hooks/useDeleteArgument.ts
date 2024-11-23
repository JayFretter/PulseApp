import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export function useDeleteArgument() {
  const [cookies, _, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const deleteArgument = async (argumentId: string): Promise<boolean> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/discussions/arguments/${argumentId}/delete`;
    const options = {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
      method: 'DELETE',
    };

    let response = await fetch(url, options);

    if (response.ok)
      return true;

    if (response.status == 401) {
      removeCookie('token', { path: '/' });
      navigate('/login');
    }

    return false;
  };

  return deleteArgument;
}
