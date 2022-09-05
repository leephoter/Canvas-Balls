/** @format */

function randomRangeInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRangeRealNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export { randomRangeInteger, randomRangeRealNumber };
