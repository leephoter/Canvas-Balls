/** @format */

export default function randomRangeInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
