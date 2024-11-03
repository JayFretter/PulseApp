export interface Discussion {
  opinionThreads: OpinionThread[];
}

export interface OpinionThread {
  opinionName: string;
  discussionComments: DiscussionComment[];
}

export interface DiscussionComment {
  userId: string;
  username: string;
  parent: DiscussionComment;
  opinionName: string;
  commentBody: string;
  pulseId: string;
  upvotes: number;
  downvotes: number;
  children: DiscussionComment[];
}
