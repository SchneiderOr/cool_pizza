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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
  align-items: center;
  white-space: pre;
  font-size: 20px;
  color: white;
`;

const Percentage = styled.div`
  position: absolute;
  top: -5vh;
  display: flex;
  font-weight: bold;
  width: 100%;
  justify-content: center;
  font-size: 20px;
  color: white;
  font-style: italic;

  &:after {
    display: flex;
    content: "%";
    font-size: 14px;
    margin-top: 4px;
    font-style: italic;
    position: relative;
  }
`;

const fieldsDescriptor = {
  probabiltyOfSolveInHour: 0.75, // lets keep the probabilty 75%
  currentIssues: 5, // single issue
  workers: 2, // one worker - shouldnt affect result
  hoursLeft: 1, // many hours for resolving it
};

function App() {
  const [currentHour] = useState(new Date().getHours());

  const [currentDescriptor, setCurrentDescriptor] = useState(fieldsDescriptor);
  const [currentChance, setCurrentChance] = useState();

  useEffect(() => {
    // const es = getEstimatedPercentageToOrderPizza(currentDescriptor);
    // setCurrentChance(es);
  }, [currentDescriptor, currentHour]);
  console.log(currentDescriptor.currentIssues);
  return (
    <AppWrapper currentHour={currentHour} className="App">
      <div style={{ position: "absolute" }}>
        <FallingRaindrops
          isRandomPosition
          isRandomScaleFactor
          count={currentDescriptor.currentIssues}
        />
      </div>
      <Info>
        <EditableWeights
          fieldsDescriptor={fieldsDescriptor}
          onSubmitNewValues={setCurrentDescriptor}
        />
      </Info>

      <SpeedoMeterContainer>
        <Percentage>{currentChance}</Percentage>
        <SpeedoMeter percentage={currentChance} />
      </SpeedoMeterContainer>
    </AppWrapper>
  );
}

export default App;
