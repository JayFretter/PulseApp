import { DiscussionArgument } from '../../Models/Discussion';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Pulse } from '../../Models/Pulse';
import { useState } from 'react';
import { useUserCredentials } from '../../Hooks/useUserCredentials';
import AddArgumentResponseForm from './AddArgumentResponseForm';

interface ArgumentBlockFooterProps {
  argument: DiscussionArgument;
  pulse: Pulse;
  fetchChildOpinions: () => Promise<void>;
  showResponses: boolean;
  currentPulseVote: string | null;
}

function ArgumentBlockFooter(props: ArgumentBlockFooterProps) {
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [isLoggedIn, _] = useUserCredentials();

  return (
    <div>
      <div className="flex items-center gap-4">
        <button className="text-slate-500" onClick={props.fetchChildOpinions}>
          <div className="flex gap-1 items-center justify-center text-slate-500">
            {props.showResponses ? <FaAngleUp className="text-xl" /> : <FaAngleDown className="text-xl" />}
            <p>{props.showResponses ? 'Hide responses' : 'Show responses'}</p>
          </div>
        </button>
        {isLoggedIn() && props.currentPulseVote && (
          <button className="flex gap-1 items-center justify-center text-slate-500" onClick={() => setShowResponseForm(true)}>
            <BiSolidMessageRounded className="text-lg" />
            <p>Respond</p>
          </button>
        )}
        {isLoggedIn() && !props.currentPulseVote && (
          <button className="flex gap-1 items-center justify-center text-slate-500" onClick={() => setShowResponseForm(true)}>
            <BiSolidMessageRounded className="text-lg" />
            <p>Add a top-level argument to respond</p>
          </button>
        )}
      </div>
      {showResponseForm && props.currentPulseVote && (
        <div className="mt-2">
          <AddArgumentResponseForm
            pulse={props.pulse}
            parentArgumentId={props.argument.id}
            reloadDiscussionData={() => {
              setShowResponseForm(false);
            }}
            closeArgumentResponseForm={() => setShowResponseForm(false)}
            currentPulseVote={props.currentPulseVote}
          />
        </div>
      )}
    </div>
  );
}

export default ArgumentBlockFooter;
