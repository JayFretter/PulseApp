import { useState, useEffect } from 'react';
import { AiFillFire } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { Pulse } from '../../Models/Pulse';
import { useUserCredentials } from '../../Hooks/useUserCredentials';
import PulseChart from '../Shared/PulseChart';
import { useGetAllPulses } from '../../Hooks/useGetAllPulses';

function HomePage() {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [isLoggedIn, _] = useUserCredentials();
  const navigate = useNavigate();
  const getAllPulses = useGetAllPulses();

  const getPulses = async () => {
    const allPulses = await getAllPulses();
    setPulses(allPulses);
  };

  useEffect(() => {
    getPulses();
  }, []);

  const onCreateButtonClicked = () => {
    navigate('pulses/new');
  };

  const renderCreateButton = () => {
    if (isLoggedIn()) {
      return (
        <button className="bg-blue-700 hover:bg-blue-900 px-4 py-2 rounded-lg text-xl" onClick={onCreateButtonClicked}>
          Create a Pulse
        </button>
      );
    }
  };

  const renderPulseContainer = () => {
    return (
      <div className="w-full flex-wrap px-10 flex flex-col items-center lg:flex-row lg:justify-center gap-8 lg:gap-40 text-center text-slate-100">
        {pulses.map((pulse) => {
          let tags = <></>;
          if (pulse.tags) {
            tags = (
              <div className="flex gap-1 items-center justify-center mb-4">
                {pulse.tags.split(',').map((tag, i) => {
                  return (
                    <p className="bg-slate-600 text-base px-2 py-1 rounded-sm" key={i}>
                      {tag}
                    </p>
                  );
                })}
              </div>
            );
          }

          return (
            <div className="pulse-card lg:text-2xl" key={pulse.id}>
              <p className="mt-2 mb-4">{pulse.title}</p>
              {tags}
              <PulseChart chartHeight={340} pulse={pulse} />
              <Link to={`discussion/${pulse.id}`}>
                <button className="border-2 border-blue-700 rounded-xl text-lg px-4 py-2 hover:bg-blue-900 transition-colors">
                  Go to discussion
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-white">
      {renderCreateButton()}
      <p className="mt-12 mb-12 text-3xl">
        Hot Pulses <AiFillFire className="inline text-red-500 pb-1" />
      </p>
      {renderPulseContainer()}
    </div>
  );
}

export default HomePage;
