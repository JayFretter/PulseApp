import { Pulse } from "../Models/Pulse";

export function useGetAllPulses() {
  const getAllPulses = async (): Promise<Pulse[]> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/pulses/all`;
    const options = {
      method: "GET",
    };

    let pulses: Pulse[] = [];

    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => (pulses = data))
      .catch((err) => console.error(err));

    return pulses;
  };

  return getAllPulses;
}
