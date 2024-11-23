import { useRef, useState } from 'react';
import useAutosizeTextArea from '../../Hooks/useAutosizeTextArea';
import { Pulse } from '../../Models/Pulse';
import { usePostDiscussionArgument } from '../../Hooks/usePostDiscussionOpinion';
import { PostOpinionBody } from '../../Models/PostOpinionBody';

interface AddArgumentResponseFormProps {
  pulse: Pulse;
  parentArgumentId: string;
  currentVote: string;
  reloadDiscussionData: () => void;
  closeArgumentResponseForm: () => void;
}

export default function AddArgumentResponseForm(props: AddArgumentResponseFormProps) {
  const [argumentValue, setArgumentValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const postArgument = usePostDiscussionArgument();

  useAutosizeTextArea(textAreaRef.current, argumentValue);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArgumentValue(evt.target?.value);
  };

  const addArgument = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('hi');

    const body: PostOpinionBody = {
      pulseId: props.pulse.id,
      parentArgumentId: props.parentArgumentId,
      opinionName: 'TODO',
      opinionBody: argumentValue,
    };

    let response = postArgument(body);
    response.then((success) => {
      if (success) props.reloadDiscussionData();
    });
  };

  return (
    <form className="bg-slate-900 flex flex-col gap-2 max-w-4xl rounded-xl p-2" onSubmit={addArgument}>
      <textarea
        className="bg-transparent text-white rounded-md overflow-hidden outline-none resize-none"
        rows={1}
        placeholder="Give your response..."
        name="argument"
        onChange={handleChange}
        ref={textAreaRef}
      />
      <div className="flex items-center justify-between">
        <p className='text-slate-500 text-sm self-end'>Current vote: {props.currentVote}</p>
        <div className="flex gap-2">
          <button
            className="bg-slate-500 hover:bg-slate-400 transition-colors text-white text-base rounded-xl py-1 px-2"
            type="button"
            onClick={() => props.closeArgumentResponseForm()}
          >
            Cancel
          </button>
          <button className="bg-green-500 hover:bg-green-600 transition-colors text-white text-base rounded-xl py-1 px-2" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
