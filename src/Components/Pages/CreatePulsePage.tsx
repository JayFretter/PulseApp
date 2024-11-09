import { useState } from "react";
import { CookiesProvider } from "react-cookie";
import { useColourGenerator } from "../../Hooks/useColourGenerator";
import { usePostNewPulse } from "../../Hooks/usePostNewPulse";
import { PostNewPulseBody } from "../../Models/PostNewPulseBody";

interface PulseSelectableAnswer {
  name: string;
  colour: string;
}

function CreatePulsePage() {
  const [selectableAnswers, setSelectableAnswers] = useState<PulseSelectableAnswer[]>([]);
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(false);
  const generateColour = useColourGenerator();
  const postNewPulse = usePostNewPulse();

  const createNewPulse = (e: React.FormEvent) => {
    e.preventDefault();

    var body : PostNewPulseBody = {
      title: (e.target as any).title.value,
      opinions: selectableAnswers.map(o => {
        return {
          name: o.name,
          hexColour: o.colour
        }
      })
    };

    postNewPulse(body);
  };

  const addSelectableAnswer = () => {
    let newAnswer: PulseSelectableAnswer = {
      name: "",
      colour:  generateColour()
    };

    setSelectableAnswers([...selectableAnswers, newAnswer]);
  }

  const handleSelectableAnswerChange = (e: any, i: number) => { 
    const newSelectableAnswers = [...selectableAnswers]; 
    newSelectableAnswers[i].name = e.target.value; 
    setSelectableAnswers(newSelectableAnswers); 
  };

  const removeSelectableAnswer = (i: number) => {
    let newSelectable = selectableAnswers.filter((_, index) => index !== i);
    setSelectableAnswers(newSelectable);
  }

  const renderSelectableAnswers = () => {
    if (selectableAnswers.length == 0)
      return

    return (
      <div>
        {selectableAnswers.map((a, i) => {
          return <div className="flex flex-col gap-2" key={i}>
            <input className="text-xl text-slate-800 px-2 py-1 border-2 border-slate-300 rounded-xl" type="text" placeholder="Option" onChange={(e) => handleSelectableAnswerChange(e, i)}></input>
            <div className="flex gap-4 items-center mb-4">
              <div className="w-[30px] h-[30px] rounded-full" style={{backgroundColor: `#${a.colour}`}}></div>
              <button className="text-red-600 text-sm font-semibold" type="button" onClick={() => removeSelectableAnswer(i)}>x Remove</button>
            </div>
          </div>
        })}
      </div>
    );
  };

  const renderErrorText = () => {
    if (formIsInvalid)
      return (
        <p className="text-xl text-red-600">Pulse definition is invalid.</p>
      );
  };

  return (
    <CookiesProvider>
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-4xl text-black">
        <div>
          <form
            className="flex flex-col gap-4 bg-slate-200 p-12 rounded-xl"
            onSubmit={createNewPulse}
          >
            <p className="text-4xl">Create Pulse</p>
            <p className="text-xl text-slate-600">
              Create your own point of discussion for people to debate on!
            </p>
            <input
              className="text-xl text-slate-800 px-2 py-1 border-2 border-slate-300 rounded-xl"
              type="text"
              placeholder="Title"
              name="title"
            />
            <p className="text-xl text-slate-600">Possible answers:</p>
            {renderSelectableAnswers()}
            <button
              className="bg-green-500 hover:bg-green-600 transition-colors text-white text-lg rounded-full px-4 py-2 self-start"
              type="button"
              onClick={addSelectableAnswer}
            >
              + Add
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 transition-colors text-white text-2xl rounded-full py-2"
              type="submit"
            >
              Create
            </button>
            {renderErrorText()}
          </form>
        </div>
      </div>
    </CookiesProvider>
  );
}

export default CreatePulsePage;
