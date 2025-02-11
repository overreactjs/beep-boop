import { Highscore } from "../types";

const STORAGE_KEY = 'leaderboard';

const DEFAULT_LEADERBOARD: Highscore[] = [
  { name: "AAA", timestamp: 0, score: 500000, stage: 40 },
  { name: "BBB", timestamp: 0, score: 250000, stage: 35 },
  { name: "CCC", timestamp: 0, score: 200000, stage: 30 },
  { name: "DDD", timestamp: 0, score: 150000, stage: 25 },
  { name: "EEE", timestamp: 0, score: 100000, stage: 20 },
  { name: "AAA", timestamp: 0, score: 90000, stage: 18 },
  { name: "BBB", timestamp: 0, score: 80000, stage: 16 },
  { name: "CCC", timestamp: 0, score: 70000, stage: 14 },
  { name: "DDD", timestamp: 0, score: 60000, stage: 12 },
  { name: "EEE", timestamp: 0, score: 50000, stage: 10 },
];

/**
 * 
 */
export const isLeaderboardScore = (score: number, stage: number): boolean => {
  const leaderboard = getUserLeaderboard().slice(0, 10);

  const isLeaderboardFull = leaderboard.length >= 10;
  const isScoreBetter = score > leaderboard[9]?.score;
  const isStageBetter = stage > leaderboard[9]?.stage;

  return !isLeaderboardFull || isScoreBetter || isStageBetter;
}

/**
 * Get a leaderboard of the ten highest scores. This is an amalgamation of the best user
 * achieved scores and the default leaderboard.
 */
export const getLeaderboard = (): Highscore[] => {
  const leaderboard: Highscore[] = [...getUserLeaderboard(), ...DEFAULT_LEADERBOARD];
  return sort(leaderboard).slice(0, 10);
};

/**
 * Get the highest entry in the leaderboard.
 */
export const getHighscore = (): Highscore => {
  return getLeaderboard()[0];
};

/**
 * Add an entry to the leaderboard, if it qualifies.
 */
export const addLeaderboardScore = (score: number, stage: number, name: string) => {
  const prev = getUserLeaderboard();
  const next = sort([...prev, { score, stage, name, timestamp: Date.now() }]).slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

/**
 * Get just the user achieved leaderboard.
 */
const getUserLeaderboard = (): Highscore[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

/**
 * Sort a leaderboard of score, where the highest score is top. Where two entries share the same
 * score, the one that reached the highest stage comes first. If those are both the same, the one
 * achieved first comes out top.
 */
const sort = (leaderboard: Highscore[]) => {
  return leaderboard.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    } else if (a.stage !== b.stage) {
      return b.stage - a.stage;
    } else {
      return a.timestamp - b.timestamp;
    }
  });
};
