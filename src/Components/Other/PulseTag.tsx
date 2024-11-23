import { useState } from 'react';
import { TiDelete } from "react-icons/ti";

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
        className="bg-slate-600 text-base text-white px-2 p-1 rounded-sm outline-none"
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
        <p className="bg-slate-600 px-2 py-1 rounded-sm text-white text-base hover:cursor-pointer" onClick={handleOnClick}>{props.tagValue}</p>
        <button className="text-red-600 text-lg self-start" type="button" onClick={() => props.deleteFunc(props.index)}>
          <TiDelete />
        </button>
      </div>
    );
  }
}

export default PulseTag;
