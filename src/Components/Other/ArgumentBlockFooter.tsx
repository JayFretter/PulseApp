import { DiscussionArgument } from '../../Models/Discussion';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { Pulse } from '../../Models/Pulse';
import { useState } from 'react';
import { useUserCredentials } from '../../Hooks/useUserCredentials';
import AddArgumentResponseForm from './AddArgumentResponseForm';

interface ArgumentBlockFooterProps {
  argument: DiscussionArgument;
  pulse: Pulse;
  fetchChildOpinions: () => Promise<void>;
  showResponses: boolean;
}

function ArgumentBlockFooter(props: ArgumentBlockFooterProps) {
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [isLoggedIn, _] = useUserCredentials();

  return (
    <div>
      <div className="flex items-center gap-8">
        <button className="text-slate-500" onClick={props.fetchChildOpinions}>
          {props.showResponses ? 'Hide responses' : 'Show responses'}
        </button>
        {isLoggedIn() && (
          <div className="flex gap-2 items-center justify-center text-slate-500">
            <BiSolidMessageRounded className="text-xl" />
            <button onClick={() => setShowResponseForm(true)}>Respond</button>
          </div>
        )}
      </div>
      {showResponseForm && (
        <div className="mt-2">
          <AddArgumentResponseForm
            pulse={props.pulse}
            parentArgumentId={props.argument.id}
            reloadDiscussionData={() => {
              console.log('TODO');
              setShowResponseForm(false);
            }}
            closeArgumentResponseForm={() => setShowResponseForm(false)}
            currentVote="TODO"
          />
        </div>
      )}
    </div>
  );
}

export default ArgumentBlockFooter;
