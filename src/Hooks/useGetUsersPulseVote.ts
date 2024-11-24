export function useGetUsersPulseVote() {
  const getUsersPulseVote = async (pulseId: string, username: string): Promise<string | null> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/pulses/${pulseId}/currentVote?username=${username}`;
    const options = {
      method: 'GET',
    };

    let currentVote: string | null = null;

    await fetch(url, options)
      .then(res => res.json())
      .then(json => currentVote = json.currentVotedOpinion)
      .catch(e => console.error(e));

    return currentVote;
  };

  return getUsersPulseVote;
}
