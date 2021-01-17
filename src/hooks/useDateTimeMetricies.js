import { useEffect, useState } from "react";
import { RECALCULATE_DATETIME_INTERVAL } from "config/constants";
import { getDateTimeMetricies } from "utils";

/**
 * Dedicated custom hook to get all the date/time related values needed for rest of app lifecycle
 */
const useDateTimeMetricies = (props) => {
  const [dateTimeMetricies, setdateTimeMetricies] = useState(
    getDateTimeMetricies()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTimeMetricies = getDateTimeMetricies();
      const { minutesUntilEOD } = currentDateTimeMetricies;
      const isTimeChanged = dateTimeMetricies.minutesLeft !== minutesUntilEOD;
      if (isTimeChanged) {
        setdateTimeMetricies(currentDateTimeMetricies);
      }
    }, RECALCULATE_DATETIME_INTERVAL);

    // On unmount - clear this interval
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dateTimeMetricies;
};

export default useDateTimeMetricies;
