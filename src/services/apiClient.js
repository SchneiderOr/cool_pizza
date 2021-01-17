import { ALGORITHEM_DEFAULTS } from "config/constants";
import { first, get } from "lodash";
import { getDateTimeMetricies } from "utils";

const { REACT_APP_API_URL } = process.env;

export const fetchNumberOfIssues = async (params) => {
  const res = await fetch(
    `${REACT_APP_API_URL}/randomNumbers/random?limit=1&min=0&max=99`
  );
  const json = await res.json();

  const updatedalgorithmDescriptor = {
    currentIssues: first(json.data),
    minutesLeft: getDateTimeMetricies().minutesUntilEOD,
    workers: get(ALGORITHEM_DEFAULTS, "workers"),
    probabiltyOfSolveInHour: get(
      ALGORITHEM_DEFAULTS,
      "probabiltyOfSolveInHour"
    ),
  };

  return updatedalgorithmDescriptor;
};
