import { Pulse } from "../Models/Pulse";

export function useGetPulse() {
  const getPulse = async (pulseId: string): Promise<Pulse | null> => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/pulses?id=${pulseId}`;
    const options = {
      method: "GET",
    };

    let pulse: Pulse | null = null;

    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => (pulse = data))
      .catch((err) => console.error(err));

    return pulse;
  };

  return getPulse;
}
