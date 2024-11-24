import { VictoryPie } from 'victory';
import { Pulse } from '../../Models/Pulse';
import { usePulseColourGenerator } from '../../Hooks/usePulseColourGenerator';

interface PulseChartData {
  x: string;
  y: number;
  colour: string;
}

interface PulseChartProps {
  chartHeight: number;
  pulse: Pulse;
}

function PulseChart(props: PulseChartProps) {
  const mapOpinionsToColours = usePulseColourGenerator();

  const getPulseChartData = (pulse: Pulse) => {
    const pieSlices: PulseChartData[] = [];

    let totalVotes = 0;
    pulse.opinions.forEach((o) => {
      totalVotes += o.votes;
    });

    const colourMap = mapOpinionsToColours(pulse.opinions);

    if (totalVotes === 0) {
      pulse.opinions.forEach((o, _) => {
        pieSlices.push({
          x: o.name,
          y: 1,
          colour: '#555555',
        });
      });
    } else {
      pulse.opinions.forEach((o, _) => {
        let percentageSuffix = totalVotes === 0 ? '' : ` (${((o.votes / totalVotes) * 100).toFixed(0)}%)`;

        pieSlices.push({
          x: o.name,
          y: o.votes,
          colour: `#${colourMap.get(o.name)}`,
        });
      });
    }

    return pieSlices.sort((a, b) => b.y - a.y);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-y-2 mx-auto items-start justify-center text-base">
        {getPulseChartData(props.pulse).map((d, i) => {
          return (
            <div className="flex gap-2 items-center justify-center" key={i}>
              <div className="bg-blue-800 px-2 text-center rounded-sm">
                <p>{d.y}</p>
              </div>
              <p>{d.x}</p>
            </div>
          );
        })}
      </div>
      <VictoryPie
        colorScale="warm"
        height={props.chartHeight}
        data={getPulseChartData(props.pulse)}
        style={{
          data: {
            fill: (d) => d.datum.colour,
            stroke: 'white',
            strokeWidth: 2,
          },
        }}
        labels={() => null}
      />
    </div>
  );
}

export default PulseChart;
