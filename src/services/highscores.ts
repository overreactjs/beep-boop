export const getHighScore = (): number => {
  return JSON.parse(localStorage.getItem('highscore') || '100000');
};

export const setHighScore = (score: number): void => {
  localStorage.setItem('highscore', JSON.stringify(score));
};
