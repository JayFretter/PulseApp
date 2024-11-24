import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { usePostLogin } from '../../Hooks/usePostLogin';
import { PostLoginBody } from '../../Models/PostLoginBody';

function LoginPage() {
  const [credentialsInvalid, setCredentialsInvalid] = useState(false);
  const [_, setCookie] = useCookies(['username', 'token']);
  const postLogin = usePostLogin();
  const navigate = useNavigate();

  const sendLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    var loginRequest: PostLoginBody = {
      username: (e.target as any).username.value,
      password: (e.target as any).password.value,
    };

    const loginResponse = await postLogin(loginRequest);

    if (loginResponse) {
      setCredentialsInvalid(false);
      setCookies(loginResponse.username, loginResponse.token)
    }
    else
      setCredentialsInvalid(true);
  }

  const setCookies = (username: string, token: string) => {
    setCookie('username', username, { path: '/' });
    setCookie('token', token, { path: '/' });
    navigate('/');
  };

  const renderErrorText = () => {
    if (credentialsInvalid) return <p className="text-xl text-red-600">We couldn't find a user with the given credentials. Please try again.</p>;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-4xl text-black">
      <div>
        <form className="flex flex-col gap-8 bg-slate-200 p-12 rounded-xl" onSubmit={sendLogin}>
          <p className="text-4xl">Log in</p>
          <p className="text-xl text-slate-600">Log into your account to vote on other people's Pulses and create your own.</p>
          <input
            className="text-xl text-slate-800 px-2 py-1 border-2 border-slate-300 rounded-xl outline-none"
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            className="text-xl text-slate-800 px-2 py-1 border-2 border-slate-300 rounded-xl outline-none"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className="bg-green-500 hover:bg-green-600 transition-colors text-white text-2xl rounded-full py-2" type="submit">
            Log in
          </button>
          {renderErrorText()}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
