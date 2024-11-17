import { DiscussionArgument } from "../../Models/Discussion";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { PulseOpinion } from "../../Models/Pulse";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { usePulseColourGenerator } from "../../Hooks/usePulseColourGenerator";

interface DiscussionArgumentProps {
  argument: DiscussionArgument;
  pulseOpinions: PulseOpinion[];
}

function DiscussionArgumentBlock(props: DiscussionArgumentProps) {
  const [cookies] = useCookies(["token"]);
  const [currentUserVote, setCurrentUserVote] = useState(0);
  const mapOpinionsToColours = usePulseColourGenerator();

  const isLoggedIn = () : boolean => {
    return cookies.token ? true : false;
  }

  const vote = (isUpvote: boolean) => {
    let voteType = 0;

    if (isUpvote) {
      voteType = 1;
      if (isLoggedIn()) setCurrentUserVote(1);
    } else {
      voteType = 2;
      if (isLoggedIn()) setCurrentUserVote(-1);
    }

    const url = `${process.env.REACT_APP_API_BASE_URL}/discussions/arguments/${props.argument.id}/vote?voteType=${voteType}`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .catch((err) => console.error(err));
  };

  const getOpinionTagColour = () => {
    const colourMap = mapOpinionsToColours(props.pulseOpinions);
    return colourMap.get(props.argument.opinionName);
  } 

  return (
    <div className="bg-slate-800 pl-3 pt-3 pb-3 flex flex-col border-l-2 border-blue-300 gap-2">
      <div className="flex items-center gap-2 text-gray-400">
        <p
          className="text-sm text-white font-semibold px-2 rounded-md self-end"
          style={{ backgroundColor: `#${getOpinionTagColour()}` }}
        >
          {props.argument.opinionName}
        </p>
        <p>·</p>
        <p className="text-sm">{props.argument.username}</p>
        <div className="flex items-center gap-1">
          <button
            className="hover:text-green-500 hover:bg-slate-700 text-lg p-1 rounded-sm"
            onClick={() => vote(true)}
          >
            <BsFillArrowUpCircleFill />
          </button>
          <p className="text-sm">
            {props.argument.upvotes - props.argument.downvotes + currentUserVote}
          </p>
          <button
            className="hover:text-red-600 hover:bg-slate-700 text-lg p-1 rounded-sm"
            onClick={() => vote(false)}
          >
            <BsFillArrowDownCircleFill />
          </button>
        </div>
      </div>
      <p className="text-md text-left text-gray-100">
        {props.argument.argumentBody}
      </p>
      {props.argument.children.map((argument, i) => {
        return (
          <DiscussionArgumentBlock
            argument={argument}
            pulseOpinions={props.pulseOpinions}
            key={i}
          />
        );
      })}
    </div>
  );
}

export default DiscussionArgumentBlock;
