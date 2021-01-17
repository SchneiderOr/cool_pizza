import { keys, map, memoize, range, shuffle } from "lodash";
import { Parser } from "expr-eval";
import { ALGORITHEM_FORMULA } from "config/constants";
const parser = new Parser();

export const getRandomFloatBetweenRange = memoize(
  ({ min, max }) => Math.random() * (max - min) + min
);

export const getEstimatedPercentageToOrderPizza = ({
  probabiltyOfSolveInHour = 1,
  currentIssues = 0,
  workers = 1,
  minutesLeft,
}) => {
  const p = parser.parse(ALGORITHEM_FORMULA);

  return Math.max(
    0,
    Math.round(
      p.evaluate({
        probabiltyOfSolveInHour,
        currentIssues: +currentIssues,
        workers,
        minutesLeft: minutesLeft / 60,
      })
    )
  );
};

// Allocate 100 items for every key, thus since max issues we will face is less then 100, if we want it to be scaleable we need to think of proper solution
// We memozie this so it will be calculated only once
export const getRandomPositionAndScale = memoize(() => {
  return {
    top: map(shuffle(keys(range(100))), Number),
    left: map(shuffle(keys(range(100))), Number),
    scale: range(99).map(() =>
      getRandomFloatBetweenRange({ min: 0.5, max: 1.5 })
    ),
  };
});

const maxReleaseDateTimeHour = new Date();
maxReleaseDateTimeHour.setHours(17, 0, 0);
export const getDateTimeMetricies = (date) => {
  const now = date || new Date();
  const milliseconds = maxReleaseDateTimeHour - now;
  return {
    minutesUntilEOD: Math.max(0, Math.floor(milliseconds / 1000 / 60)),
    currentHour: now.getHours(),
    isDayTime: now.getHours() > 6 && now.getHours() < 20,
    isReleaseDay: now.getDay() === 0,
  };
};

export const mapPercentageToDegrees = (value) => {
  const maxDegree = 180;
  return (value * maxDegree) / 100;
};
