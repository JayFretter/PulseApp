import { DiscussionArgument } from '../../Models/Discussion';
import { Pulse } from '../../Models/Pulse';
import { useState } from 'react';
import { useGetArgumentChildren } from '../../Hooks/useGetArgumentChildren';
import ArgumentBlockHeader from './ArgumentBlockHeader';
import ArgumentBlockFooter from './ArgumentBlockFooter';

interface DiscussionArgumentProps {
  argument: DiscussionArgument;
  pulse: Pulse;
}

function ArgumentBlock(props: DiscussionArgumentProps) {
  const [children, setChildren] = useState<DiscussionArgument[]>([]);
  const [showResponses, setShowResponses] = useState(false);
  const getArgumentChildren = useGetArgumentChildren();

  const fetchChildOpinions = async () => {
    if (showResponses) {
      setShowResponses(false);
      return;
    }

    const children = await getArgumentChildren(props.argument.id);
    setChildren(children);
    setShowResponses(true);
  };

  return (
    <div className="bg-slate-800 px-3 py-3 flex flex-col border-l-2 border-blue-300 gap-2">
      <ArgumentBlockHeader pulse={props.pulse} argument={props.argument} />
      <p className="text-md text-left text-gray-100">{props.argument.argumentBody}</p>
      <ArgumentBlockFooter pulse={props.pulse} argument={props.argument} fetchChildOpinions={fetchChildOpinions} showResponses={showResponses} />
      {showResponses &&
        children.map((argument, i) => {
          return <ArgumentBlock argument={argument} pulse={props.pulse} key={i} />;
        })}
    </div>
  );
}

export default ArgumentBlock;
