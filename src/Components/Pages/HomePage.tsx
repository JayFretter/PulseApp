import { useState, useEffect } from "react";
import { VictoryPie, VictoryPortal, VictoryLabel } from "victory";
import { AiFillFire } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Pulse } from "../../Models/Pulse";
import { useUserCredentials } from "../../Hooks/useUserCredentials";
import { useVoteColourGenerator } from "../../Hooks/useVoteColourGenerator";

const CHART_HEIGHT = 340;

function HomePage() {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [isLoggedIn, getUserCredentials] = useUserCredentials();
  const navigate = useNavigate();
  const generateColoursForVotes = useVoteColourGenerator();

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

  const onCreateButtonClicked = () =>
  {
    navigate('pulses/new');
  }

  const renderCreateButton = () => {
    if (isLoggedIn()) {
      return <button className="bg-blue-700 hover:bg-blue-900 px-4 py-2 rounded-lg text-xl" onClick={onCreateButtonClicked}>Create a Pulse</button>
    }
  }

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
                style={{ labels: { fill: "white" }, data: {fill: d => d.datum.colour, stroke: 'white', strokeWidth: 2} }}
                labelComponent={
                  <VictoryPortal>
                    <VictoryLabel />
                  </VictoryPortal>
                }
              />
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
