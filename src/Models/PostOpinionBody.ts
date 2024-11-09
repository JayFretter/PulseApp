export interface PostOpinionBody {
  pulseId: string;
  parentCommentId: string | null
  opinionName: string;
  opinionBody: string,
}
