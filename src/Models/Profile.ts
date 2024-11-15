import { Pulse } from "./Pulse";

export interface Profile {
  username: string;
  userSinceUtc: string;
  pulses: Pulse[]
}

