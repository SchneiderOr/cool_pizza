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
  overflow: hidden;
  ${getBGColorGradientByTime};
`;

const Percentage = styled.div`
  position: absolute;
  top: -4vh;
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
    top: -3vh;
    &:after {
      font-size: 14px;
      margin-top: 5px;
    }
    font-size: 20px;
  }
`;

const Formula = styled.span`
  position: absolute;
  top: 200px;
  width: 100%;

  line-height: 20px;
  font-size: 16px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.5);

  code {
    white-space: nowrap;
  }

  @media only screen and (max-width: 767px) {
    code {
      white-space: pre-line;
    }
    top: 250px;
  }

  @media only screen and (max-width: 500px) {
    line-height: 16px;
    font-size: 12px;
    top: 60%;

    letter-spacing: 1px;
    code {
      white-space: pre-line;
    }
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

  return (
    <AppWrapper currentHour={currentDateTimeData.currentHour} className="App">
      <Formula>
        Using formula: <br />
        <pre>
          <code>
            {`(1 - probabiltyOfSolveInHour ^ (currentIssues / (workers * minutesLeft))) * 100`}
          </code>
        </pre>
      </Formula>

      <FallingRaindrops
        isRandomScaleFactor
        count={currentAlgorithemDescriptor.currentIssues || 0}
      />

      {currentIssues != null && (
        <InfoPanel
          isDayTime={currentDateTimeData.isDayTime}
          fieldsDescriptor={currentAlgorithemDescriptor}
          onSubmitNewValues={setAlgorithemFieldsValues}
          onRefetchRequest={fetchRandomNumberAndUpdateDescriptor}
        />
      )}

      <SpeedoMeterContainer>
        <Percentage>{currentChance}</Percentage>
        <SpeedoMeter percentage={currentChance} />
      </SpeedoMeterContainer>
    </AppWrapper>
  );
}

export default App;
