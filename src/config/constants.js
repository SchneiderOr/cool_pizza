export const ALGORITHEM_DEFAULTS = {
  probabiltyOfSolveInHour: 0.75,
  workers: 1,
};

export const ALGORITHEM_FORMULA = `(1 - probabiltyOfSolveInHour ^ (currentIssues / (workers * minutesLeft))) * 100`;

export const RECALCULATE_DATETIME_INTERVAL = 10000;

export const disabledFields = {
  minutesLeft: true,
};
export const colors = {
  white: "255, 255, 255",
  black: "0, 0, 0",
};
