import { PulseOpinion } from '../Models/Pulse';

export function usePulseColourGenerator() {
  const minColourRgb: number[] = [214, 156, 217];
  const maxColourRgb: number[] = [43, 5, 232];
  const defaultColourHex: string = '77738c';

  const linearInterpolate = (a: number, b: number, frac: number) => {
    return a + (b - a) * frac;
  };

  const mapOpinionsToColours = (opinions: PulseOpinion[]): Map<string, string> => {
    let colourMap = new Map<string, string>();

    let hexColours = generateHexes(opinions.length);
    const sortedOpinions = [...opinions].sort((a, b) => a.votes - b.votes);

    sortedOpinions.forEach((op, i) => {
      colourMap.set(op.name, hexColours[i]);
    });

    return colourMap;
  };

  const generateHexes = (count: number): string[] => {
    if (count === 0) return [defaultColourHex];
    if (count === 1) return [rgbToHex(maxColourRgb)];
    if (count === 2) return [rgbToHex(minColourRgb), rgbToHex(maxColourRgb)];
    else {
      const stops = count - 2;
      const denominator = stops + 1;

      const colours = [rgbToHex(minColourRgb)];

      for (let i = 1; i <= stops; i++) {
        const interpolationFraction = i / denominator;
        const interpolatedColour = minColourRgb.map((c, i) => linearInterpolate(c, maxColourRgb[i], interpolationFraction));
        colours.push(rgbToHex(interpolatedColour));
      }

      colours.push(rgbToHex(maxColourRgb));

      return colours;
    }
  };

  const rgbToHex = (rgbVal: number[], padding?: number): string => {
    let final = '';

    let padAmount = 2;
    if (padding !== undefined) padAmount = padding;

    rgbVal.forEach((colour) => {
      let colourAsHex = Math.round(colour).toString(16);

      while (colourAsHex.length < padAmount) {
        colourAsHex = '0' + colourAsHex;
      }

      final += colourAsHex;
    });

    return final;
  };

  return mapOpinionsToColours;
}
