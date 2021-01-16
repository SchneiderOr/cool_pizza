import styled from "styled-components";
import { getBGColorGradientByTime } from "utils";
import SpeedoMeter from "basicCompnents/SpeedoMeter/speedoMeter";
import FallingRaindrops from "modules/raindrops/fallingRaindrops";
import InfoPanel from "modules/infoPanel/infoPanel";
import useAppValues from "hooks/useAppValues";

import "./App.css";

const SpeedoMeterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const AppWrapper = styled.div`
  position: relative;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${getBGColorGradientByTime};
`;

function App() {
  const {
    currentIssues,
    currentDateTimeData,
    currentChance,
    currentAlgorithemDescriptor,
    setAlgorithemFieldsValues,
    fetchRandomNumberAndUpdateDescriptor,
  } = useAppValues();

  const { currentHour, isDayTime } = currentDateTimeData;
  return (
    <AppWrapper currentHour={currentHour} className="App">
      <FallingRaindrops
        count={currentAlgorithemDescriptor.currentIssues || 0}
      />
      {currentIssues != null && (
        <InfoPanel
          isDayTime={isDayTime}
          fieldsDescriptor={currentAlgorithemDescriptor}
          onSubmitNewValues={setAlgorithemFieldsValues}
          onRefetchRequest={fetchRandomNumberAndUpdateDescriptor}
        />
      )}

      <SpeedoMeterContainer>
        <SpeedoMeter percentage={currentChance} />
      </SpeedoMeterContainer>
    </AppWrapper>
  );
}

export default App;
