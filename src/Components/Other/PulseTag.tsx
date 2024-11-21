import { useState } from 'react';
import { MdOutlineRemoveCircle } from 'react-icons/md';

interface PulseTagProps {
  index: number;
  tagValue: string;
  setTagValueFunc: (index: number, tag: string) => void;
  deleteFunc: (index: number) => void;
}

function PulseTag(props: PulseTagProps) {
  // const [tagName, setTagName] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(true);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsEditMode(false);
  };

  const handleOnClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    setIsEditMode(true);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.setTagValueFunc(props.index, e.target.value);
  };

  if (isEditMode) {
    return (
      <input
        className="text-base text-slate-800 p-1 border-2 border-slate-300 rounded-xl"
        type="text"
        value={props.tagValue}
        placeholder="Tag..."
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      ></input>
    );
  } else {
    if (!props.tagValue) props.deleteFunc(props.index);

    return (
      <div
        className="flex px-2 items-center"
      >
        <p className="py-1 px-2 rounded-xl bg-blue-600 text-white text-base hover:cursor-pointer" onClick={handleOnClick}>{props.tagValue}</p>
        <button className="text-red-600 text-base self-start" type="button" onClick={() => props.deleteFunc(props.index)}>
          <MdOutlineRemoveCircle />
        </button>
      </div>
    );
  }
}

export default PulseTag;
