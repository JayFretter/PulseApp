import { DiscussionArgument } from '../../Models/Discussion';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { MdDeleteForever, MdOutlineMoreHoriz } from 'react-icons/md';
import { Pulse } from '../../Models/Pulse';
import { useState } from 'react';
import { usePulseColourGenerator } from '../../Hooks/usePulseColourGenerator';
import { useUserCredentials } from '../../Hooks/useUserCredentials';
import { useDeleteArgument } from '../../Hooks/useDeleteArgument';
import { usePostArgumentVote } from '../../Hooks/usePostArgumentVote';
import { ArgumentVoteType } from '../../Models/ArgumentVoteType';
import { useNavigate } from 'react-router-dom';

interface ArgumentBlockHeaderProps {
  pulse: Pulse;
  argument: DiscussionArgument;
}

function ArgumentBlockHeader(props: ArgumentBlockHeaderProps) {
  const [currentUserVote, setCurrentUserVote] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const mapOpinionsToColours = usePulseColourGenerator();
  const [isLoggedIn, getUserCredentials] = useUserCredentials();
  const deleteArgument = useDeleteArgument();
  const postArgumentVote = usePostArgumentVote()
  const navigate = useNavigate();

  const vote = async (isUpvote: boolean) => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    let voteType: ArgumentVoteType;

    if (isUpvote) {
      voteType = ArgumentVoteType.Upvote;
      setCurrentUserVote(1);
    } else {
      voteType = ArgumentVoteType.Downvote;
      setCurrentUserVote(-1);
    }

    await postArgumentVote(props.argument.id, voteType);
  };

  const getOpinionTagColour = () => {
    const colourMap = mapOpinionsToColours(props.pulse.opinions);
    return colourMap.get(props.argument.opinionName);
  };

  const toggleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (showContextMenu) setShowContextMenu(false);
    else {
      setShowContextMenu(true);
    }
  };

  const handleDeleteArgument = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    deleteArgument(props.argument.id);
  };

  const renderContextMenu = () => {
    const userCredentials = getUserCredentials();

    if (props.argument.username !== userCredentials?.username) return;

    if (showContextMenu) {
      return (
        <div className="absolute flex flex-col rounded-lg w-60 bg-slate-900 text-white">
          <div className="flex gap-2 items-center justify-center hover:bg-slate-700 rounded-lg py-2" onClick={handleDeleteArgument}>
            <MdDeleteForever className="text-xl" />
            <button>Delete argument</button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex items-center gap-2 text-gray-400">
      <p className="text-sm text-white font-semibold px-2 rounded-md self-end" style={{ backgroundColor: `#${getOpinionTagColour()}` }}>
        {props.argument.opinionName}
      </p>
      <p>·</p>
      <p className="text-sm">{props.argument.username}</p>
      <div className="flex items-center gap-1">
        <button className="hover:text-green-500 hover:bg-slate-700 text-lg p-1 rounded-sm" onClick={() => vote(true)}>
          <BsFillArrowUpCircleFill />
        </button>
        <p className="text-sm">{props.argument.upvotes - props.argument.downvotes + currentUserVote}</p>
        <button className="hover:text-red-600 hover:bg-slate-700 text-lg p-1 rounded-sm" onClick={() => vote(false)}>
          <BsFillArrowDownCircleFill />
        </button>
        <div className="relative hover:cursor-pointer" onClick={toggleContextMenu}>
          <MdOutlineMoreHoriz />
          {renderContextMenu()}
        </div>
      </div>
    </div>
  );
}

export default ArgumentBlockHeader;
