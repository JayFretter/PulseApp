import { useEffect, useState } from "react";
import { isEmpty } from "../../Helpers/Helpers";
import { DiscussionArgument } from "../../Models/Discussion";
import { Pulse } from "../../Models/Pulse";
import DiscussionArgumentBlock from "./DiscussionArgumentBlock";
import AddArgumentForm from "./AddArgumentForm";
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
  const [opinions, setOpinions] = useState<DiscussionArgument[]>([]);
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


  const renderDiscussion = () => {
    if (isEmpty(opinions)) return;

    return (
      <div className="bg-gray-900 p-4 rounded-lg flex flex-col gap-4">
        {opinions.map((argument, i) => {
          return (
            <DiscussionArgumentBlock argument={argument} pulseOpinions={props.pulse.opinions} key={i}/>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getDiscussionData();
  }, []);

  return (
    <div className="p-2 lg:p-8 w-full">
      <p className="mb-4 text-2xl">Discussion</p>
      {
        isLoggedIn() ? <AddArgumentForm pulse={props.pulse} parentArgumentId={null} reloadDiscussionData={getDiscussionData} /> : <></>
      }
      {renderDiscussion()}
    </div>
  );
}

export default DiscussionSection;
