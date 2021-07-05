export const getNewGmIndex = (gmPlayerIndex: number, playerCount: number) => {
  if (!gmPlayerIndex) {
    // Game master is not active player
    return Math.round(Math.random() * playerCount);
  }

  return gmPlayerIndex === playerCount - 1 ? 0 : gmPlayerIndex + 1;
};
