import styled from "styled-components";
import { getBGColorGradientByTime } from "utils";
import SpeedoMeter from "basicCompnents/SpeedoMeter/speedoMeter";
import FallingRaindrops from "modules/raindrops/fallingRaindrops";
import InfoPanel from "modules/infoPanel/infoPanel";
import useAppValues from "hooks/useAppValues";

import "./App.css";
import Fader from "basicCompnents/Fader/fader";

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

const FaderPercentage = styled(Fader)`
  position: absolute;
  top: -2vh;
  display: flex;
  font-weight: bold;
  width: 100%;
  justify-content: center;
  font-size: 30px;
  color: white;
  font-style: italic;

  &:after {
    display: flex;
    content: "%";
    font-size: 16px;
    margin-top: 14px;
    font-style: italic;
    position: relative;
  }

  @media only screen and (max-width: 767px) {
    &:after {
      font-size: 14px;
      margin-top: 5px;
    }
    font-size: 20px;
  }
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
        isRandomScaleFactor
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
        <FaderPercentage delay={3}>{currentChance}</FaderPercentage>

        <SpeedoMeter percentage={currentChance} />
      </SpeedoMeterContainer>
    </AppWrapper>
  );
}

export default App;
