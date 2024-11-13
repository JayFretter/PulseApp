import { useEffect, useState } from "react";
import { Pulse } from "../../Models/Pulse";
import PulseChart from "../Shared/PulseChart";

interface PulseDetailProps {
  pulse: Pulse;
}

function PulseDetails(props: PulseDetailProps) {
  const [totalPulseVotes, setTotalPulseVotes] = useState(0);

  let date = new Date(props.pulse.createdAtUtc);

  const getPulseChartData = (pulseData: Pulse) => {
    let totalVotes = 0;

    pulseData.opinions.forEach((o) => {
      totalVotes += o.votes;
    });

    setTotalPulseVotes(totalVotes);
  };

  useEffect(() => {
    getPulseChartData(props.pulse);
  }, [props.pulse]);

  return (
    <div className="bg-gray-800 p-8 w-full">
      <p className="text-md">
        Posted by {props.pulse.createdBy.username},{" "}
        <span className="text-gray-400">{date.toLocaleString()}</span>
      </p>
      <p className="mb-4 text-sm text-gray-400">{totalPulseVotes} votes</p>
      <p className="text-xl mb-4">{props.pulse.title}</p>
      <div className="mx-auto max-w-[500px]">
        <PulseChart chartHeight={340} pulse={props.pulse} />
      </div>
    </div>
  );
}

export default PulseDetails;
