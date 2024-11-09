import { useState, useEffect } from "react";
import { VictoryPie, VictoryPortal, VictoryLabel } from "victory";
import { AiFillFire } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Pulse } from "../../Models/Pulse";

const CHART_HEIGHT = 340;

function HomePage() {
  const [pulses, setPulses] = useState<Pulse[]>([]);

  const getPulses = () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/pulses/all/`;
    const options = {
      method: "GET",
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPulses(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPulses();
  }, []);

  const getPulseChartData = (pulse: Pulse) => {
    const pieSlices: any[] = [];

    let totalVotes = 0;
    pulse.opinions.forEach((o) => {
      totalVotes += o.votes;
    });

    pulse.opinions.forEach((o) => {
      pieSlices.push({
        x: `${o.name} (${((o.votes / totalVotes) * 100).toFixed(0)}%)`,
        y: o.votes,
        colour: `#${o.hexColour}`
      });
    });

    return pieSlices;
  };

  const renderPulseContainer = () => {
    return (
      <div className="w-full flex-wrap px-10 flex flex-col items-center lg:flex-row lg:justify-center gap-8 lg:gap-40 text-center text-slate-100">
        {pulses.map((pulse) => {
          return (
            <div className="pulse-card lg:text-2xl" key={pulse.id}>
              <p className="mt-2 mb-4">{pulse.title}</p>
              <VictoryPie
                colorScale="warm"
                height={CHART_HEIGHT}
                data={getPulseChartData(pulse)}
                style={{ labels: { fill: "white" }, data: {fill: d => d.datum.colour} }}
                labelComponent={
                  <VictoryPortal>
                    <VictoryLabel />
                  </VictoryPortal>
                }
              />
              <Link to={`discussion/${pulse.id}`}>
                <button className="border-2 border-red-600 rounded-xl text-lg px-4 py-2 hover:bg-red-900 transition-colors">
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
      <p className="mt-8 mb-12 text-3xl">
        Hot Pulses <AiFillFire className="inline text-red-500" />
      </p>
      {/* <p className="text-lg font-light mb-12">
        Check out todays trending topics:
      </p> */}
      {renderPulseContainer()}
    </div>
  );
}

export default HomePage;
