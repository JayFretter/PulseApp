import { useEffect, useRef, useState } from 'react';
import useAutosizeTextArea from '../../Hooks/useAutosizeTextArea';
import { Pulse } from '../../Models/Pulse';
import { usePostDiscussionArgument } from '../../Hooks/usePostDiscussionOpinion';
import { PostOpinionBody } from '../../Models/PostOpinionBody';
import { usePulseColourGenerator } from '../../Hooks/usePulseColourGenerator';
import { FaCheck } from 'react-icons/fa6';

interface AddArgumentFormProps {
  pulse: Pulse;
  reloadDiscussionData: () => void;
  goBack?: () => void;
}

export default function AddArgumentForm(props: AddArgumentFormProps) {
  const [argumentValue, setArgumentValue] = useState('');
  const [chosenOpinion, setChosenOpinion] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const postArgument = usePostDiscussionArgument();
  const mapOpinionsToColours = usePulseColourGenerator();

  const minArgumentLength = 100;

  useAutosizeTextArea(textAreaRef.current, argumentValue);

  useEffect(() => {
    validateForm();
  }, [argumentValue, chosenOpinion]);

  const validateForm = () => {
    const errors: string[] = [];

    if (!chosenOpinion) errors.push('You must choose an opinion');
    if (argumentValue.length < minArgumentLength) errors.push(`You must give an argument at least ${minArgumentLength} characters long`);

    setValidationErrors(errors);
  };

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
      <div className="flex gap-2 items-center justify-center">
        {props.pulse.opinions.map((op, i) => {
          let chosen = chosenOpinion === op.name;

          return (
            <button
              className="rounded-xl px-2 border-2"
              type="button"
              key={i}
              style={{
                borderColor: `${chosen ? `#${colourMap.get(op.name)}` : 'transparent'}`,
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
    <form className="flex flex-col gap-2 w-full rounded-xl" onSubmit={addArgument}>
      {renderOpinionButtons()}
      <textarea
        className="bg-slate-700 text-white px-2 p-2 rounded-md overflow-hidden outline-none resize-none"
        rows={1}
        placeholder="Give your reasoning..."
        name="argument"
        onChange={handleChange}
        ref={textAreaRef}
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 self-start" style={{color: argumentValue.length < minArgumentLength ? '#64748b' : '#22c55e'}}>
          <p>
            {argumentValue.length}/{minArgumentLength}
          </p>
          {argumentValue.length >= minArgumentLength && <FaCheck />}
        </div>
        <div className="flex gap-2">
          {props.goBack && (
            <button
              className="bg-slate-500 hover:bg-slate-600 transition-colors text-white text-base rounded-xl py-1 px-2"
              type="button"
              onClick={() => props.goBack!()}
            >
              Cancel
            </button>
          )}
          {validationErrors.length === 0 ? (
            <button className="bg-green-500 hover:bg-green-600 transition-colors text-white text-base rounded-xl py-1 px-2" type="submit">
              Submit
            </button>
          ) : (
            <button className="bg-slate-500 transition-colors text-white text-base rounded-xl py-1 px-2" type="button" disabled>
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
