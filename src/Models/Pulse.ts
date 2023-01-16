interface PulseOpinion {
  name: string,
  votes: number
}

interface PulseCreatedBy {
  id: string,
  username: string
}

export interface Pulse {
  id: string;
  title: string;
  opinions: PulseOpinion[],
  createdBy: PulseCreatedBy,
  createdAtUtc: string;
  updatedAtUtc: string;
}