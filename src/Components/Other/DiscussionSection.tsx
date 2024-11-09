import { useEffect, useState } from "react";
import { isEmpty } from "../../Helpers/Helpers";
import { DiscussionComment } from "../../Models/Discussion";
import { Pulse } from "../../Models/Pulse";
import DiscussionCommentBlock from "./DiscussionCommentBlock";
import AddCommentForm from "./AddCommentForm";
import { useCookies } from "react-cookie";

interface DiscussionSectionProps {
  pulse: Pulse;
}

interface OpinionButtonData {
  opinionName: string,
  selected: boolean,
  colour: string,
}

function DiscussionSection(props: DiscussionSectionProps) {
  const [opinionButtonData, setOpinionButtonData] = useState<OpinionButtonData[]>([]);
  const [opinions, setOpinions] = useState<DiscussionComment[]>([]);
  const [cookies] = useCookies(["token"]);

  const isLoggedIn = () : boolean => {
    return cookies.token ? true : false;
  }

  const getDiscussionData = () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/discussions?pulseId=${props.pulse.id}`;
    const options = {
      method: "GET",
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setOpinions(data))
      .catch((err) => console.error(err));
  };

  const setOpinionButtonsData = () => {
    const data: OpinionButtonData[] = [];
    props.pulse.opinions.forEach((op) => {
      data.push({
        opinionName: op.name,
        selected: false,
        colour: op.hexColour,
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
              style={{backgroundColor: opinionButton.selected ? `#${opinionButton.colour}` : "#1a202c"}}
            >
              <p>{opinionButton.opinionName}</p>
            </button>
          );
        })}
      </div>
    );
  };

  const renderDiscussion = () => {
    if (isEmpty(opinions)) return;

    return (
      <div className="bg-gray-900 p-4 rounded-lg flex flex-col gap-4">
        {opinions.map((comment, i) => {
          return (
            <DiscussionCommentBlock comment={comment} pulseOpinions={props.pulse.opinions} key={i}/>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getDiscussionData();
    setOpinionButtonsData();
  }, []);

  return (
    <div className="bg-gray-800 p-2 lg:p-8 w-full">
      <p className="mb-4 text-2xl">Discussion</p>
      {
        isLoggedIn() ? <AddCommentForm pulse={props.pulse} parentCommentId={null} reloadDiscussionData={getDiscussionData} /> : <></>
      }
      {renderDiscussion()}
    </div>
  );
}

export default DiscussionSection;
