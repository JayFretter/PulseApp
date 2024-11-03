import { DiscussionComment } from "../../Models/Discussion";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { PulseOpinion } from "../../Models/Pulse";

interface DiscussionCommentProps {
  comment: DiscussionComment;
  pulseOpinions: PulseOpinion[]
}

function DiscussionCommentBlock(props: DiscussionCommentProps) {
  const vote = (isUpvote: boolean) => {
    if (isUpvote) console.log("upvoted");
    else console.log("downvoted");
  };

  const opinionTagColour = props.pulseOpinions
    .filter(op => op.name == props.comment.opinionName)[0]
    .hexColour;

  return (
    <div className="bg-slate-800 pl-3 pt-3 pb-3 flex flex-col border-l-2 border-blue-300 gap-2">
      <div className="flex items-center gap-2 text-gray-400">
        <p className="text-sm text-white font-semibold px-2 rounded-md self-end" style={{backgroundColor: `#${opinionTagColour}`}}>
          {props.comment.opinionName}
        </p>
        <p>·</p>
        <p className="text-sm">{props.comment.username}</p>
        <div className="flex items-center gap-1">
          <button
            className="hover:text-green-500 hover:bg-slate-700 text-lg p-1 rounded-sm"
            onClick={() => vote(true)}
          >
            <BsFillArrowUpCircleFill />
          </button>
          <p className="text-sm">
            {props.comment.upvotes - props.comment.downvotes}
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
        {props.comment.commentBody}
      </p>
      {props.comment.children.map((comment, i) => {
        return <DiscussionCommentBlock comment={comment} pulseOpinions={props.pulseOpinions} key={i} />;
      })}
    </div>
  );
}

export default DiscussionCommentBlock;
