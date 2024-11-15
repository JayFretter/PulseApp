import { useEffect, useState } from 'react';
import { useGetProfile } from '../../Hooks/useGetProfile';
import { Profile } from '../../Models/Profile';
import { LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom';
import PulseChart from '../Shared/PulseChart';

export async function loader(x: LoaderFunctionArgs) {
  return x.params.username;
}

function ProfilePage() {
  const username = useLoaderData() as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const getProfile = useGetProfile();
  const navigate = useNavigate();

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    setProfile(await getProfile(username));
  };

  const handleOnClickPulse = (e: React.MouseEvent<HTMLButtonElement>, pulseId: string) => {
    e.preventDefault();
    navigate(`/discussion/${pulseId}`);
  };

  if (profile) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-4xl text-white">
        <div className="flex flex-col justify-center items-center gap-2 mb-12 border-l-2 border-r-2 border-blue-500 px-4">
          <p className="text-5xl">{profile.username}</p>
          <p className="text-slate-400 text-sm">Member since {new Date(profile.userSinceUtc).toLocaleDateString()}</p>
        </div>
        <p className="mb-8 text-3xl">
          Pulses made by <span className="text-blue-500">{username}</span>:
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-8 justify-center max-w-7xl">
          {profile.pulses.map((pulse, i) => (
            <div className="bg-slate-800 p-4 rounded-xl flex flex-col gap-1 items-center justify-center" key={i}>
              <p className="text-xl">{pulse.title}</p>
              <PulseChart chartHeight={280} pulse={pulse} />
              <button
                className="text-base border-2 border-blue-500 hover:bg-blue-800 transition-colors px-3 py-1 rounded-xl"
                onClick={(e) => handleOnClickPulse(e, pulse.id)}
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>User not found</h2>
      </div>
    );
  }
}

export default ProfilePage;
