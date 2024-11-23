import { useRef, useState } from "react";
import useAutosizeTextArea from "../../Hooks/useAutosizeTextArea";
import { Pulse } from "../../Models/Pulse";
import { usePostDiscussionArgument } from "../../Hooks/usePostDiscussionOpinion";
import { PostOpinionBody } from "../../Models/PostOpinionBody";
import { usePulseColourGenerator } from "../../Hooks/usePulseColourGenerator";

interface AddArgumentFormProps {
  pulse: Pulse;
  reloadDiscussionData: () => void;
}

export default function AddArgumentForm(props: AddArgumentFormProps) {
  const [argumentValue, setArgumentValue] = useState("");
  const [chosenOpinion, setChosenOpinion] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const postArgument = usePostDiscussionArgument();
  const mapOpinionsToColours = usePulseColourGenerator();

  useAutosizeTextArea(textAreaRef.current, argumentValue);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArgumentValue(evt.target?.value);
  };

  const addArgument = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chosenOpinion) {
      return;
    }

    const body: PostOpinionBody = {
      pulseId: props.pulse.id,
      parentArgumentId: null,
      opinionName: chosenOpinion,
      opinionBody: argumentValue,
    };

    let response = postArgument(body);
    response.then((success) => {
      if (success) props.reloadDiscussionData();
    });
  };

  const renderOpinionButtons = () => {
    const colourMap = mapOpinionsToColours(props.pulse.opinions);
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
                borderColor: `${chosen ? `#${colourMap.get(op.name)}` : "transparent"}`,
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
    <form
      className="flex flex-col gap-2 max-w-4xl rounded-xl"
      onSubmit={addArgument}
    >
      {renderOpinionButtons()}
      <textarea
        className="bg-slate-700 text-white px-2 p-2 rounded-md overflow-hidden outline-none resize-none"
        rows={1}
        placeholder="Give your opinion..."
        name="argument"
        onChange={handleChange}
        ref={textAreaRef}
      />
      <div className="flex justify-end">
        <button
          className="bg-green-500 hover:bg-green-600 transition-colors text-white text-base rounded-xl py-1 px-2"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
