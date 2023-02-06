import React from "react";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { isEmpty } from "../../Helpers/Helpers";
import { Pulse } from "../../Models/Pulse";
import DiscussionSection from "../Other/DiscussionSection";
import PulseDetails from "../Other/PulseDetails";

interface DiscussionLoaderParams {
  params: any
}

export async function loader(x: any) {
  return x.params.pulseId;
}

function DiscussionPage() {
  const pulseId = useLoaderData();
  const [pulse, setPulse] = useState({} as any);

  const getPulse = () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/pulses?id=${pulseId}`;
    const options = {
      method: "GET",
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setPulse(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPulse();
  }, []);

  const getPulseChartData = (pulseData: Pulse) => {
    // console.log(pulseData.opinions);
    const pieSlices: any[] = [];

    let totalVotes = 0;
    pulseData.opinions.forEach((o) => {
      totalVotes += o.votes;
    });

    pulseData.opinions.forEach((o) => {
      pieSlices.push({
        x: `${o.name} (${((o.votes / totalVotes) * 100).toFixed(0)}%)`,
        y: o.votes,
      });
    });

    return pieSlices;
  };

  const renderPulseContainer = (pulseData: Pulse) => {
    if (!isEmpty(pulseData)) {
      return (
        <div className="w-full flex-wrap px-10 py-10 flex flex-col items-center lg:flex-row lg:justify-center gap-8 lg:gap-4 text-center text-slate-100">
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
