export const EXP_START = new Date("2021-02-16");

export const getYearsExp = () => {
  const diff = (Date.now() - EXP_START) / (365.25 * 864e5);
  return diff.toFixed(1) + "+";
};
