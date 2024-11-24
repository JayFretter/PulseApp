import { DiscussionArgument } from "../Models/Discussion";

export function useGetDiscussion() {
  const getDiscussion = async (pulseId: string): Promise<DiscussionArgument[]> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/discussions?pulseId=${pulseId}`;
    const options = {
      method: 'GET',
    };
    return fetch(url, options)
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }

  return getDiscussion;
}