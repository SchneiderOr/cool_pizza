import styled, { keyframes } from "styled-components";
import "./App.css";
import { getBGColorGradientByTime } from "./utils";
import { useEffect, useState } from "react";
import SpeedoMeter from "./basicCompnents/SpeedoMeter/speedoMeter";

const SpeedoMeterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
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

function App() {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [currentChance, setCurrentChance] = useState(0);

  useEffect(() => {
    setCurrentChance(90);
  }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("called");
  //     setCurrentHour(new Date().getHours());
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <AppWrapper currentHour={currentHour} className="App">
      <SpeedoMeterContainer>
        <SpeedoMeter value={currentChance} />
      </SpeedoMeterContainer>
    </AppWrapper>
  );
}

export default App;
