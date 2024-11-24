import { useEffect, useState } from 'react';
import { isEmpty } from '../../Helpers/Helpers';
import { DiscussionArgument } from '../../Models/Discussion';
import { Pulse } from '../../Models/Pulse';
import ArgumentBlock from './ArgumentBlock';
import AddArgumentForm from './AddArgumentForm';
import { useGetUsersPulseVote } from '../../Hooks/useGetUsersPulseVote';
import { useUserCredentials } from '../../Hooks/useUserCredentials';
import { useGetDiscussion } from '../../Hooks/useGetDiscussion';

interface DiscussionSectionProps {
  pulse: Pulse;
}

function DiscussionSection(props: DiscussionSectionProps) {
  const [discussionArguments, setDiscussionArguments] = useState<DiscussionArgument[]>([]);
  const [currentPulseVote, setCurrentPulseVote] = useState<string | null>(null);
  const [isChangingVote, setIsChangingVote] = useState(false);
  const [isLoggedIn, getUserCredentials] = useUserCredentials();
  const getUsersPulseVote = useGetUsersPulseVote();
  const getDiscussion = useGetDiscussion();

  const getDiscussionData = async () => {
    const pulseArguments = await getDiscussion(props.pulse.id);
    setDiscussionArguments(pulseArguments);

    const currentUserCredentials = getUserCredentials();
    if (currentUserCredentials) {
      const currentVote = await getUsersPulseVote(props.pulse.id, currentUserCredentials.username);
      setCurrentPulseVote(currentVote);
    }
  };

  const renderAddArgumentForm = () => {
    if (!isLoggedIn()) return;

    if (currentPulseVote && !isChangingVote) {
      return (
        <div className="p-4 rounded-lg flex flex-col items-center justify-center gap-4 mx-auto max-w-4xl">
          <p className="text-xl">You voted for "{currentPulseVote}"</p>
          <button className="bg-green-500 hover:bg-green-700 px-4 py-1 text-xl rounded-xl" onClick={() => setIsChangingVote(true)}>
            Change vote
          </button>
        </div>
      );
    }

    return (
      <div className="flex justify-center py-12 max-w-4xl mx-auto">
        {currentPulseVote ? (
          <AddArgumentForm pulse={props.pulse} reloadDiscussionData={getDiscussionData} goBack={() => setIsChangingVote(false)} />
        ) : (
          <AddArgumentForm pulse={props.pulse} reloadDiscussionData={getDiscussionData} />
        )}
      </div>
    );
  };

  const renderArguments = () => {
    if (isEmpty(discussionArguments)) return;

    return (
      <div className="bg-gray-900 p-4 rounded-lg flex flex-col gap-4">
        {discussionArguments.map((argument, i) => {
          return <ArgumentBlock argument={argument} pulse={props.pulse} currentPulseVote={currentPulseVote} key={i} />;
        })}
      </div>
    );
  };

  useEffect(() => {
    getDiscussionData();
  }, []);

  return (
    <div className="p-2 lg:p-8 w-full">
      {renderAddArgumentForm()}
      <p className="mb-4 mt-12 text-2xl text-center">Discussion</p>
      {renderArguments()}
    </div>
  );
}

export default DiscussionSection;
