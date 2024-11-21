import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostNewUserBody } from '../../Models/PostNewUserBody';
import { usePostNewUser } from '../../Hooks/usePostNewUser';

function SignUpPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();
  const postNewUser = usePostNewUser();

  const sendSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as any;

    if (target.confirmPassword.value !== target.password.value) {
      setPasswordsMatch(false);
      return;
    } else {
      setPasswordsMatch(true);
    }

    var body: PostNewUserBody = {
      username: target.username.value,
      password: target.password.value,
    };

    const response = await postNewUser(body);
    if (response.validationErrors.length !== 0) {
      setValidationErrors(response.validationErrors);
      return;
    }

    navigate('/');
  };

  const renderErrorText = () => {
    if (validationErrors.length > 0)
      return (
        <div className="text-xl text-red-600">
          <p>Errors:</p>
          <ul className="list-disc">
            {validationErrors.map((e, i) => (
              <li className="ml-6" key={i}>{e}</li>
            ))}
          </ul>
        </div>
      );
    if (!passwordsMatch) return <p className="text-xl text-red-600">The password fields do not match.</p>;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-4xl text-black">
      <div>
        <form className="flex flex-col gap-8 bg-slate-200 p-12 rounded-xl" onSubmit={sendSignUp}>
          <p className="text-4xl">Sign up</p>
          <p className="text-xl text-slate-600">Create account to vote on other people's Pulses and create your own.</p>
          <input
            className="text-xl text-slate-800 px-2 py-1 border-2 border-slate-300 rounded-xl"
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            className="text-xl text-slate-800 px-2 py-1 border-2 border-slate-300 rounded-xl"
            type="password"
            placeholder="Password"
            name="password"
          />
          <input
            className="text-xl text-slate-800 px-2 py-1 border-2 border-slate-300 rounded-xl"
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
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

export default SignUpPage;
