export interface Discussion {
  opinionThreads: OpinionThread[];
}

export interface OpinionThread {
  opinionName: string;
  discussionArguments: DiscussionArgument[];
}

export interface DiscussionArgument {
  id: string;
  userId: string;
  username: string;
  parent: DiscussionArgument;
  opinionName: string;
  argumentBody: string;
  pulseId: string;
  upvotes: number;
  downvotes: number;
  children: DiscussionArgument[];
}
