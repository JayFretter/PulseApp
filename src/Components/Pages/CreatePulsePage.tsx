import { useEffect, useState } from 'react';
import { usePostNewPulse } from '../../Hooks/usePostNewPulse';
import { PostNewPulseBody } from '../../Models/PostNewPulseBody';
import { MdOutlineRemoveCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function CreatePulsePage() {
  const [selectableAnswers, setSelectableAnswers] = useState<string[]>([]);
  const [pulseTitle, setPulseTitle] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const postNewPulse = usePostNewPulse();
  const navigate = useNavigate();

  const setErrors = () => {
    const errors: string[] = [];

    if (pulseTitle == '') errors.push('Title cannot be empty');
    if (selectableAnswers.length < 2) errors.push('You must have at least two possible answers');
    if (selectableAnswers.some((a) => !a)) errors.push('All possible answers must have a name');

    setValidationErrors(errors);
  };

  useEffect(() => {
    setErrors();
  }, [pulseTitle, selectableAnswers]);

  const createNewPulse = async (e: React.FormEvent) => {
    e.preventDefault();

    var body: PostNewPulseBody = {
      title: (e.target as any).title.value,
      opinions: selectableAnswers.map((a) => {
        return {
          name: a,
        };
      }),
    };

    const success = await postNewPulse(body);
    if (success) {
      navigate('/');
    }
  };

  const addSelectableAnswer = () => {
    setSelectableAnswers([...selectableAnswers, '']);
  };

  const handlePulseTitleChange = (e: any) => {
    setPulseTitle(e.target.value);
  };

  const handleSelectableAnswerChange = (e: any, i: number) => {
    const newSelectableAnswers = [...selectableAnswers];
    newSelectableAnswers[i] = e.target.value;
    setSelectableAnswers(newSelectableAnswers);
  };

  const removeSelectableAnswer = (i: number) => {
    let newSelectable = selectableAnswers.filter((_, index) => index !== i);
    setSelectableAnswers(newSelectable);
  };

  const renderSelectableAnswers = () => {
    if (selectableAnswers.length == 0) return;

    return (
      <div>
        {selectableAnswers.map((a, i) => {
          return (
            <div className="flex gap-2 items-center justify-between mb-4" key={i}>
              <input
                className="text-xl text-slate-800 px-2 py-1 border-2 border-slate-300 rounded-xl w-[92%]"
                type="text"
                placeholder="Option"
                onChange={(e) => handleSelectableAnswerChange(e, i)}
                value={selectableAnswers[i]}
              ></input>
              <button className="text-3xl text-red-600" type="button" onClick={() => removeSelectableAnswer(i)}>
                <MdOutlineRemoveCircle />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const renderErrorText = () => {
    if (validationErrors.length > 0)
      return (
        <div className="text-base text-red-600">
          <p className="">Cannot submit Pulse</p>
          <ul className="list-disc pl-5">
            {validationErrors.map((e) => (
              <li>{e}</li>
            ))}
          </ul>
        </div>
      );
  };

  const renderSubmitButton = () => {
    if (validationErrors.length === 0) {
      return (
        <button className="bg-green-500 hover:bg-green-600 transition-colors text-white text-2xl rounded-full py-2" type="submit">
          Create
        </button>
      );
    } else {
      return (
        <button className="bg-gray-500 text-white text-2xl rounded-full py-2" type="submit" disabled>
          Create
        </button>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-4xl text-black">
      <div>
        <form className="flex flex-col gap-4 bg-slate-200 p-12 rounded-xl" onSubmit={createNewPulse}>
          <p className="text-4xl">Create Pulse</p>
          <p className="text-xl text-slate-600">Create your own point of discussion for people to debate on!</p>
          <input
            className="text-xl text-slate-800 px-2 py-1 border-2 border-slate-300 rounded-xl"
            type="text"
            placeholder="Title"
            name="title"
            onChange={handlePulseTitleChange}
          />
          <p className="text-xl text-slate-600">Possible answers:</p>
          {renderSelectableAnswers()}
          <button className="text-slate-600 text-base font-semibold px-2 self-start mb-4" type="button" onClick={addSelectableAnswer}>
            + Add Answer
          </button>
          {renderSubmitButton()}
          {renderErrorText()}
        </form>
      </div>
    </div>
  );
}

export default CreatePulsePage;
