import { useState, useEffect } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { isEmpty } from "../../Helpers/Helpers";
import { Pulse } from "../../Models/Pulse";
import DiscussionSection from "../Other/DiscussionSection";
import PulseDetails from "../Other/PulseDetails";
import { useGetPulse } from "../../Hooks/useGetPulse";

export async function loader(x: LoaderFunctionArgs) {
  return x.params.pulseId;
}

function DiscussionPage() {
  const pulseId = useLoaderData() as string;
  const [pulse, setPulse] = useState({} as Pulse);
  const getPulse = useGetPulse();

  const fetchPulse = async () => {
    const fetchedPulse = await getPulse(pulseId);
    if (fetchedPulse)
      setPulse(fetchedPulse);
    else 
      console.error(`Could not fetch pulse with ID ${pulseId}`)
  };

  useEffect(() => {
    fetchPulse();
  }, []);

  const renderPulseContainer = (pulseData: Pulse) => {
    if (!isEmpty(pulseData)) {
      return (
        <div className="w-full flex-wrap lg:px-10 py-10 flex flex-col items-center lg:flex-row lg:justify-center gap-8 lg:gap-4 text-center text-slate-100">
          <PulseDetails pulse={pulseData} />
          <DiscussionSection pulse={pulseData}/>
        </div>
      );
    }
    return <div></div>
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      {renderPulseContainer(pulse)}
    </div>
  );
}

export default DiscussionPage;
