function getRandom(array: string[]) {
  return array[Math.round(array.length * Math.random())];
}

export const getRandomPartyName = () => {
  const colors = ['white', 'yellow', 'green', 'blue', 'orange', 'lemon', 'red', 'black'];
  const group = ['fleet', 'party', 'band', 'army', 'bunch', 'squad', 'circle'];
  const char = ['madness', 'glory', 'death', 'strength', 'fury', 'imagination'];

  return `The ${getRandom(colors)} ${getRandom(group)} of ${getRandom(char)}`;
};
