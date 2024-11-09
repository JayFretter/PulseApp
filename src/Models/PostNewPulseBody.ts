interface PostNewPulseBodyOpinion {
  name: string;
  hexColour: string;
}

export interface PostNewPulseBody {
  title: string;
  opinions: PostNewPulseBodyOpinion[]
}
