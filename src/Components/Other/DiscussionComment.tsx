import { DiscussionComment } from "../../Models/Discussion";

interface DiscussionCommentProps {
  comment: DiscussionComment;
}

function DiscussionCommentBlock(props: DiscussionCommentProps) {
  return (
    <div className="bg-slate-800 pl-4 pt-4 pb-4 mb-4 flex flex-col border-l-2 border-blue-300 gap-2 hover:bg-slate-600 transition-colors">
      <div className="flex items-center gap-2 text-gray-400">
        <p className="text-sm bg-green-600 text-white font-semibold px-2 py-1 rounded-md self-end">
          {props.comment.opinionName}
        </p>
        <p>·</p>
        <p className="text-sm">{props.comment.userName}</p>
      </div>
      <p className="text-md text-left text-gray-100">{props.comment.opinionBody}</p>
      {props.comment.children.map((comment) => {
        return <DiscussionCommentBlock comment={comment} />;
      })}
    </div>
  );
}

export default DiscussionCommentBlock;
