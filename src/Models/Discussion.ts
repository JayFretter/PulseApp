export interface Discussion {
  pulseId: string;
  opinionThreads: OpinionThread[];
}

export interface OpinionThread {
  threadOpinionName: string;
  discussionComments: DiscussionComment[];
}

export interface DiscussionComment {
  userId: string;
  userName: string;
  parent: DiscussionComment;
  children: DiscussionComment[];
  opinionName: string;
  opinionBody: string;
  pulseId: string;
}
