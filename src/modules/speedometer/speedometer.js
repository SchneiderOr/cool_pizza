import styled from "styled-components";
import SpeedoMeter from "basicCompnents/SpeedoMeter/speedoMeter";

const SpeedoMeterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Speedometer = ({ percentage }) => {
  return (
    <SpeedoMeterContainer>
      <SpeedoMeter percentage={percentage} />
    </SpeedoMeterContainer>
  );
};

export default Speedometer;
