import { useEffect, useState } from "react";
import { VictoryLabel, VictoryPie, VictoryPortal } from "victory";
import { Pulse } from "../../Models/Pulse";

const CHART_HEIGHT = 340;

interface PulseDetailProps {
  pulse: Pulse;
}

function PulseDetails(props: PulseDetailProps) {
  const [totalPulseVotes, setTotalPulseVotes] = useState(0);
  const [pulseChartData, setPulseChartData] = useState<any[]>([]);

  let date = new Date(props.pulse.createdAtUtc);

  const getPulseChartData = (pulseData: Pulse) => {
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

    setTotalPulseVotes(totalVotes);
    setPulseChartData(pieSlices);
  };

  useEffect(() => {
    getPulseChartData(props.pulse);
  }, [props.pulse]);

  // const getLabelFontSize = () => {
  //   console.log(window.innerWidth);

  //   if (window.innerWidth > 1000) return 6;
  //   if (window.innerWidth < 800) return 12;
  //   return 8;
  // };

  return (
    <div className="bg-gray-800 p-8 w-full">
      <p className="text-md">
        Posted by {props.pulse.createdBy.username},{" "}
        <span className="text-gray-400">{date.toLocaleString()}</span>
      </p>
      <p className="mb-4 text-sm text-gray-400">{totalPulseVotes} votes</p>
      <p className="text-xl mb-4">{props.pulse.title}</p>
      <div className="mx-auto max-w-[500px]">
        <VictoryPie
          colorScale="cool"
          height={CHART_HEIGHT}
          data={pulseChartData}
          style={{ labels: { fill: "white", fontSize: 12 } }}
          labelComponent={
            <VictoryPortal>
              <VictoryLabel />
            </VictoryPortal>
          }
        />
      </div>
    </div>
  );
}

export default PulseDetails;
