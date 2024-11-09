export function useColourGenerator() {
  const hexDigits = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

  const generateHex = () : string => {
    let newColour = '';
    
    for (let i = 0; i < 6; i++) {
      let colourIndex = Math.floor(Math.random() * 16);
      let digit = hexDigits[colourIndex];
      newColour = newColour.concat(digit);
    }
    
    return newColour;
  }

  return generateHex;
}