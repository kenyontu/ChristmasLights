import {PatternFunction} from './types';

const patternStepByRow = [
  [0],
  [0, 0],
  [0, 1, 0],
  [0, 1, 1, 0],
  [0, 1, 2, 1, 0],
  [0, 1, 2, 2, 1, 0],
  [0, 1, 2, 3, 2, 1, 0]
];

/**
 * Lights one column at a time from left to right
 */
const pattern1: PatternFunction = (total, rowSize) => (i, step) => {
  return i % rowSize === step % rowSize;
};

/**
 * Cycles between the 1-3-5-7 and 2-4-6 lights
 */
const pattern2: PatternFunction = (total, rowSize) => (i, step) => {
  return (i % rowSize) % 2 === step % 2;
};

/**
 * All lights blink at the same time
 */
const pattern3: PatternFunction = () => (i, step) => {
  return step % 2 === 0;
};

/**
 * Lightens all then starts over
 */
const pattern4: PatternFunction = total => (i, step) => {
  return i - 1 <= (step % total) - 1;
};

// Expanding animation
const pattern5Steps = [
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1]
];
const pattern5: PatternFunction = (total, rowSize) => (i, step) => {
  const totalRows = total / rowSize;
  const currentRow = Math.floor(i / rowSize);
  const patternStep = patternStepByRow[totalRows - 1][currentRow];
  return pattern5Steps[(step + patternStep) % 5][i % rowSize] === 1;
};

const patterns = [pattern1, pattern2, pattern3, pattern4, pattern5];

export default patterns;
