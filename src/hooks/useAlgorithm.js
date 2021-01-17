/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { getEstimatedPercentageToOrderPizza } from "utils";
import { fetchNumberOfIssues } from "services/apiClient";

/**
 * I have decided to encapsulate all the business logic about how we retrive num of issues, calculating the forecast and handling timming in here
 * In general, in larger scale project we should seperate this and keep some of the state on global level - use React.Context/Redux/MobX.
 */
const useAlgorithm = () => {
  const [algorithmDescriptor, setAlgorithemFieldsValues] = useState({});

  const [currentChance, setCurrentChance] = useState(0);
  // Everytime the algorithm changed -> meaning one of the values changed and we re-trigger chance calculation
  useEffect(() => {
    const nextChance =
      getEstimatedPercentageToOrderPizza(algorithmDescriptor) || 0;
    if (currentChance !== nextChance) {
      setCurrentChance(nextChance);
    }
  }, [algorithmDescriptor]);

  const debouncedSetFieldValues = debounce(setAlgorithemFieldsValues, 500);
  const debouncedFetchDataAndUpdateView = debounce(
    () => fetchNumberOfIssues().then(setAlgorithemFieldsValues),
    500
  );

  useEffect(() => {
    debouncedFetchDataAndUpdateView();
  }, []);

  return {
    currentChance,
    algorithmDescriptor,
    setAlgorithemFieldsValues: debouncedSetFieldValues,
    fetchDataAndUpdateView: debouncedFetchDataAndUpdateView,
  };
};

export default useAlgorithm;
