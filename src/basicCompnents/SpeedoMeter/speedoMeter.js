import styled, { css } from "styled-components";

const mapPercentageToDegrees = (value) => {
  const maxDegree = 180;
  return (value * maxDegree) / 100;
};

const SpeedoMeterWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 26vw;
  height: 12.5vw; /* half of the width */
  border-top-left-radius: 12.5vw;
  border-top-right-radius: 12.5vw;
  overflow: hidden;
  background-image: url("pizza.png");
  background-size: cover;
  background-position: center;
`;

const Needle = styled.div`
  position: relative;
  content: "";
  width: 12.5vw;
  height: 0.75vw;
  border-radius: 100% 0 0 100%;
  background-color: rgba(255, 255, 255, 0.75);
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.95));
  transition: transform 1s 2s linear;
  ${({ percentage }) =>
    css`
      transform: rotate(${mapPercentageToDegrees(percentage)}deg);
    `}
  transform-origin: right;

  &:after {
    position: absolute;
    content: "";
    width: 1vw;
    height: 1vw;
    background-color: rgba(0, 0, 0, 1);
    right: -2px;
    border-radius: 50%;
  }
`;

const SpeedoMeter = ({ percentage }) => {
  return (
    <SpeedoMeterWrapper>
      <Needle percentage={percentage} />
    </SpeedoMeterWrapper>
  );
};

export default SpeedoMeter;
