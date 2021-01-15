import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import {
  getBGColorGradientByTime,
  getEstimatedPercentageToOrderPizza,
} from "utils";
import SpeedoMeter from "basicCompnents/SpeedoMeter/speedoMeter";
import FallingRaindrops from "modules/raindrops/fallingRaindrops";
import EditableWeights from "modules/editableForm/editableWeights";

import "./App.css";
import { ALGORITHEM_DEFAULTS } from "config/constants";

const SpeedoMeterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const fadeHour = keyframes`
from {
  opacity:0;
} 
to {
  opacity:1
}`;
const AppWrapper = styled.div`
  position: relative;
  overflow: hidden;
  /* &:after {
    display: flex;
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    ${({ currentHour }) =>
    getBGColorGradientByTime({ currentHour: currentHour + 1 })};
    animation: ${fadeHour} 3s linear;
  } */
  ${getBGColorGradientByTime};
`;

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  white-space: pre;
  font-size: 20px;
  color: white;
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
  line-height: 24px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.5);
  @media only screen and (max-width: 767px) {
    top: 250px;
  }
`;

function App() {
  const [currentHour] = useState(new Date().getHours());
  const [currentDescriptor, setCurrentDescriptor] = useState(
    ALGORITHEM_DEFAULTS
  );
  const [currentChance, setCurrentChance] = useState(0);

  useEffect(() => {
    setCurrentChance(getEstimatedPercentageToOrderPizza(currentDescriptor));
  }, [currentDescriptor]);

  return (
    <AppWrapper currentHour={currentHour} className="App">
      <Formula>
        Using formula: <br /> `(1 - probabiltyOfSolveInHour ^ (currentIssues /
        (workers * hoursLeft))) * 100`
      </Formula>
      <InfoPanel>
        <EditableWeights
          fieldsDescriptor={currentDescriptor}
          onSubmitNewValues={setCurrentDescriptor}
        />
      </InfoPanel>
      <FallingRaindrops
        isRandomScaleFactor
        count={currentDescriptor.currentIssues}
      />

      <SpeedoMeterContainer>
        <Percentage>{currentChance}</Percentage>
        <SpeedoMeter percentage={currentChance} />
      </SpeedoMeterContainer>
    </AppWrapper>
  );
}

export default App;
