export function makeID(length: number, characters = "abcdefghijklmnopqrstuvwxyz") {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
