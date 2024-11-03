import { useEffect, useState } from "react";
import { isEmpty } from "../../Helpers/Helpers";
import { Discussion } from "../../Models/Discussion";
import { Pulse, PulseOpinion } from "../../Models/Pulse";
import DiscussionCommentBlock from "./DiscussionCommentBlock";

interface DiscussionSectionProps {
  pulse: Pulse;
}

function DiscussionSection(props: DiscussionSectionProps) {
  const [opinionButtonData, setOpinionButtonData] = useState<any[]>([]);
  const [discussionData, setDiscussionData] = useState<Discussion>(
    {} as Discussion
  );

  const getDiscussionData = (pulseId: string) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/discussions?pulseId=${pulseId}`;
    const options = {
      method: "GET",
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setDiscussionData(data))
      .catch((err) => console.error(err));
  };

  const setOpinionButtonsData = (opinions: PulseOpinion[]) => {
    const data: any[] = [];
    opinions.forEach((op) => {
      data.push({
        opinionName: op.name,
        selected: false,
        color: op.color,
      });
    });

    setOpinionButtonData(data);
  };

  const selectOpinionFilterButton = (opinionName: string) => {
    setOpinionButtonData(
      opinionButtonData.map((data) => {
        if (data.opinionName === opinionName) {
          data.selected = true;
        } else {
          data.selected = false;
        }
        return data;
      })
    );
  };

  const getSelectedOpinion = () => {
    const selectedOpinion = opinionButtonData.find((data) => data.selected);

    if (!selectedOpinion) return "";

    return selectedOpinion.opinionName;
  };

  const renderOpinionFilterButtons = () => {
    return (
      <div className="flex gap-8 items-center justify-around mb-4">
        {opinionButtonData.map((opinionButton) => {
          return (
            <button
              className={`w-full py-2 lg:text-2xl rounded-lg transition-colors`}
              key={opinionButton.opinionName}
              onClick={() =>
                selectOpinionFilterButton(opinionButton.opinionName)
              }
              style={{backgroundColor: opinionButton.selected ? opinionButton.color : "#1a202c"}}
            >
              <p>{opinionButton.opinionName}</p>
            </button>
          );
        })}
      </div>
    );
  };

  const renderDiscussion = () => {
    if (isEmpty(discussionData)) return;

    const relevantThread = discussionData.opinionThreads.filter(
      (thread) => thread.opinionName === getSelectedOpinion()
    )[0];
    if (!relevantThread) return <p>Pick an answer to see people's arguments</p>;

    const relevantComments = relevantThread.discussionComments;
    return (
      <div className="bg-gray-900 p-4 rounded-lg flex flex-col gap-4">
        {relevantComments.map((comment, i) => {
          return (
            <DiscussionCommentBlock comment={comment} key={i}/>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getDiscussionData(props.pulse.id);
    setOpinionButtonsData(props.pulse.opinions);
  }, [props.pulse]);

  return (
    <div className="bg-gray-800 p-2 lg:p-8 w-full">
      <p className="mb-4 text-2xl">Discussion</p>
      <p className="mb-4">Show argments for:</p>
      {renderOpinionFilterButtons()}
      {renderDiscussion()}
    </div>
  );
}

export default DiscussionSection;
