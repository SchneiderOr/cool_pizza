import { useEffect, useState } from "react";
import { ALGORITHEM_DEFAULTS } from "config/constants";
import { fetchNumberOfIssues } from "services/apiClient";
import {
  getDateTimeMetricies,
  getEstimatedPercentageToOrderPizza,
} from "utils";
import { debounce, first, get } from "lodash";

const useAppValues = (props) => {
  const [currentAlgorithemDescriptor, setAlgorithemFieldsValues] = useState({});
  const [currentDateTimeData, setCurrentDateTimeData] = useState(
    getDateTimeMetricies()
  );
  const [currentChance, setCurrentChance] = useState(0);
  const { currentIssues } = currentAlgorithemDescriptor;

  useEffect(() => {
    fetchRandomNumberAndUpdateDescriptor();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTimeData = getDateTimeMetricies();
      const { minutesUntilEOD } = currentDateTimeData;
      const isTimeChanged =
        currentAlgorithemDescriptor.minutesLeft !== minutesUntilEOD;
      if (isTimeChanged) {
        setCurrentDateTimeData(currentDateTimeData);
        setAlgorithemFieldsValues({
          ...currentAlgorithemDescriptor,
          minutesLeft: minutesUntilEOD,
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentAlgorithemDescriptor]);

  useEffect(() => {
    if (
      currentAlgorithemDescriptor &&
      currentAlgorithemDescriptor.currentIssues
    ) {
      setCurrentChance(
        getEstimatedPercentageToOrderPizza(currentAlgorithemDescriptor)
      );
    }
  }, [currentAlgorithemDescriptor]);

  function fetchRandomNumberAndUpdateDescriptor() {
    fetchNumberOfIssues().then((res) => {
      setAlgorithemFieldsValues({
        currentIssues: first(res.data),
        minutesLeft: getDateTimeMetricies().minutesUntilEOD,
        workers: get(ALGORITHEM_DEFAULTS, "workers"),
        probabiltyOfSolveInHour: get(
          ALGORITHEM_DEFAULTS,
          "probabiltyOfSolveInHour"
        ),
      });
    });
  }

  return {
    currentIssues,
    currentDateTimeData,
    currentChance,
    currentAlgorithemDescriptor,
    setAlgorithemFieldsValues: debounce(setAlgorithemFieldsValues, 500),
    fetchRandomNumberAndUpdateDescriptor: debounce(
      fetchRandomNumberAndUpdateDescriptor,
      500
    ),
  };
};

export default useAppValues;
