import React from "react";
import { Pulse } from "../../Models/Pulse";

interface PulseDetailProps {
  pulse: Pulse
}

function PulseDetails(props: PulseDetailProps) {
  console.log(props.pulse.createdBy);

  return (
    <div className="bg-gray-800 p-8">
      <p>{props.pulse.createdBy.username}</p>
      <p>{props.pulse.title}</p>
    </div>
  );
}

export default PulseDetails;
