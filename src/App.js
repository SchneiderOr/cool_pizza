import { useEffect } from "react";

import ChangingBackgroundWrapper from "modules/changingBackground/changingBackground";
import SpeedoMeter from "modules/speedometer/speedometer";
import Raindrops from "modules/raindrops/raindrops";
import InfoPanel from "modules/infoPanel/infoPanel";
import useForecastAlgorithm from "hooks/useAlgorithm";
import useDateTimeMetricies from "hooks/useDateTimeMetricies";

import "./App.css";

function App() {
  const { currentHour, minutesUntilEOD, isDayTime } = useDateTimeMetricies();
  const {
    currentChance,
    algorithmDescriptor,
    setAlgorithemFieldsValues,
    fetchDataAndUpdateView,
  } = useForecastAlgorithm();
  const { currentIssues } = algorithmDescriptor;

  useEffect(() => {
    // In case minutes passed by or minutes changed -> recalc the algorithm
    if (algorithmDescriptor.minutesLeft !== minutesUntilEOD) {
      setAlgorithemFieldsValues({
        ...algorithmDescriptor,
        minutesLeft: minutesUntilEOD,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutesUntilEOD, algorithmDescriptor]);

  return (
    <ChangingBackgroundWrapper currentHour={currentHour} className="App">
      <Raindrops fallingAnimation={false} count={currentIssues} />
      {currentIssues != null && (
        <InfoPanel
          isDayTime={isDayTime}
          fieldsDescriptor={algorithmDescriptor}
          onSubmitNewValues={setAlgorithemFieldsValues}
          onRefetchRequest={fetchDataAndUpdateView}
        />
      )}
      <SpeedoMeter percentage={currentChance} />
    </ChangingBackgroundWrapper>
  );
}

export default App;
