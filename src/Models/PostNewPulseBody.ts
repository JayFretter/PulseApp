interface PostNewPulseBodyOpinion {
  name: string;
}

export interface PostNewPulseBody {
  title: string;
  tags?: string;
  opinions: PostNewPulseBodyOpinion[]
}
