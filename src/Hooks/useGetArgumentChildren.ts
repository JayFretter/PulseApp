import { DiscussionArgument } from "../Models/Discussion";

export function useGetArgumentChildren() {
  const getArgumentChildren = async (argumentId: string): Promise<DiscussionArgument[]> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/discussions/arguments/${argumentId}/children`;
    const options = {
      method: "GET",
    };

    let children: DiscussionArgument[] = [];

    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => (children = data.childArguments))
      .catch((err) => console.error(err));

    return children;
  };

  return getArgumentChildren;
}
