import { useRef, useState } from "react";
import useAutosizeTextArea from "../../Hooks/useAutosizeTextArea";
import { CookiesProvider } from "react-cookie";
import { Pulse } from "../../Models/Pulse";
import { usePostDiscussionOpinion } from "../../Hooks/usePostDiscussionOpinion";
import { PostOpinionBody } from "../../Models/PostOpinionBody";

interface AddCommentFormProps {
  pulse: Pulse;
  parentCommentId: string | null;
  reloadDiscussionData: () => void;
}

export default function AddCommentForm(props: AddCommentFormProps) {
  const [commentValue, setCommentValue] = useState("");
  const [chosenOpinion, setChosenOpinion] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const postOpinion = usePostDiscussionOpinion();

  useAutosizeTextArea(textAreaRef.current, commentValue);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(evt.target?.value);
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chosenOpinion) {
      return;
    }

    const body: PostOpinionBody = {
      pulseId: props.pulse.id,
      parentCommentId: props.parentCommentId,
      opinionName: chosenOpinion,
      opinionBody: commentValue,
    };

    let response = postOpinion(body);
    response.then(success => {
      if (success)
        props.reloadDiscussionData();
    });
  };

  const renderOpinionButtons = () => {
    return (
      <div className="flex gap-2">
        {props.pulse.opinions.map((op, i) => {
          let chosen = chosenOpinion === op.name;

          return (
            <button
              className="rounded-xl px-2 border-2"
              type="button"
              key={i}
              style={{ 
                borderColor: `${chosen ? `#${op.hexColour}` : 'transparent'}`
              }}
              onClick={() => setChosenOpinion(op.name)}
            >
              {op.name}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <CookiesProvider>
      <form
        className="mx-auto flex flex-col gap-2 my-12 max-w-4xl rounded-xl"
        onSubmit={addComment}
      >
        <textarea
          className="bg-slate-900 text-white px-2 p-2 border-2 border-slate-500 rounded-xl overflow-hidden"
          rows={1}
          placeholder="Give your opinion..."
          name="comment"
          onChange={handleChange}
          ref={textAreaRef}
        />
        <div className="flex justify-between">
          {renderOpinionButtons()}
          <button
            className="bg-green-500 hover:bg-green-600 transition-colors text-white text-xl rounded-xl py-1 px-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </CookiesProvider>
  );
}
