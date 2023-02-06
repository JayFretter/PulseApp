import { Pulse } from "../../Models/Pulse";

interface DiscussionSectionProps {
  pulse: Pulse;
}

function DiscussionSection(props: DiscussionSectionProps) {
  return (
    <div className="bg-gray-800 p-8 w-full">
      <p className="mb-4 text-2xl">Discussion</p>
      <p>Show argments for:</p>
      <div className="flex gap-8 items-center justify-around">
        {props.pulse.opinions.map((opinion) => {
          return (
            <div
              className="bg-indigo-800 w-full lg:text-2xl"
              key={opinion.name}
            >
              <p>{opinion.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DiscussionSection;