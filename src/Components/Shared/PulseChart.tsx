import { VictoryLabel, VictoryPie, VictoryPortal } from "victory";
import { Pulse } from "../../Models/Pulse";
import { usePulseColourGenerator } from "../../Hooks/usePulseColourGenerator";

interface PulseChartProps {
  chartHeight: number;
  pulse: Pulse
}

function PulseChart(props: PulseChartProps) {
  const generateColoursForVotes = usePulseColourGenerator();

  const getPulseChartData = (pulse: Pulse) => {
    const pieSlices: any[] = [];

    let totalVotes = 0;
    pulse.opinions.forEach((o) => {
      totalVotes += o.votes;
    });

    let colours = generateColoursForVotes(pulse.opinions.length);
    console.log('colours for pulse ' + pulse.title);
    console.log(colours);

    pulse.opinions.sort((a, b) => a.votes - b.votes);

    pulse.opinions.forEach((o, i) => {
      pieSlices.push({
        x: `${o.name} (${((o.votes / totalVotes) * 100).toFixed(0)}%)`,
        y: o.votes,
        colour: `#${colours[i]}`
      });
    });

    return pieSlices;
  };

  return (
    <div>
      <VictoryPie
        colorScale="warm"
        height={props.chartHeight}
        data={getPulseChartData(props.pulse)}
        style={{
          labels: { fill: "white" },
          data: {
            fill: (d) => d.datum.colour,
            stroke: "white",
            strokeWidth: 2,
          },
        }}
        labelComponent={
          <VictoryPortal>
            <VictoryLabel />
          </VictoryPortal>
        }
      />
    </div>
  );
}

export default PulseChart;
