import { VictoryPie } from "victory";

const CHART_HEIGHT = 340;

function HomePage() {
  const getPulses = () => {
    return [
      {
        id: "63ae112d296309acf79232e1",
        title: "Are dinosaurs really extinct?",
        opinions: [
          {
            name: "Of course",
            votes: 81,
          },
          {
            name: "Nope",
            votes: 8,
          },
        ],
        createdBy: {
          id: "63ae10c3296309acf79232e0",
          username: "admin",
        },
        createdAtUtc: "2022-12-29T22:14:05.451Z",
        updatedAtUtc: null,
      },
      {
        id: "63b33681cb4676c7d31e79ab",
        title: "Which of these podcasters is the best?",
        opinions: [
          {
            name: "Andrew Huberman",
            votes: 4592,
          },
          {
            name: "Joe Rogan",
            votes: 10101,
          },
          {
            name: "Mike Thurston",
            votes: 1377,
          },
        ],
        createdBy: {
          id: "63b3360ecb4676c7d31e79aa",
          username: "jay",
        },
        createdAtUtc: "2023-01-02T19:54:41.222Z",
        updatedAtUtc: null,
      },
    ];
  };

  const getPulseChartData = (pulse) => {
    const pieSlices = [];

    pulse.opinions.forEach((o) => {
      pieSlices.push({
        x: o.name,
        y: o.votes,
      });
    });

    return pieSlices;
  };

  const renderPulseContainer = () => {
    return (
      <div className="w-full px-10 flex flex-col lg:flex-row lg:justify-center gap-8 lg:gap-40 text-center text-slate-100">
        {getPulses().map((pulse, i) => {
          return (
            <div className="pulse-card lg:text-2xl">
              <p className="mt-2">{pulse.title}</p>
              <VictoryPie
                height={CHART_HEIGHT}
                data={getPulseChartData(pulse)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-900 text-white">
      <p className="mt-8 mb-2 text-4xl">Welcome to Pulse.</p>
      <p className="text-lg font-light mb-12">
        Check out todays trending topics:
      </p>
      {renderPulseContainer()}
    </div>
  );
}

export default HomePage;
