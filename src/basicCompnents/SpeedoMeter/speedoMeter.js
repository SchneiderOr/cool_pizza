import styled, { css } from "styled-components";

const mapPercentageToDegrees = (value) => {
  const maxDegree = 180;
  return (value * maxDegree) / 100;
};

const SpeedoMeterWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  min-width: 600px;
  min-height: 300px;
  width: 30vw;
  height: 15vw;
  border-top-left-radius: 15vw;
  border-top-right-radius: 15vw;
  background-image: url("pizza.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media only screen and (max-width: 767px) {
    min-width: auto;
    min-height: auto;
    width: 70vw;
    height: 35vw;
    border-top-left-radius: 25vw;
    border-top-right-radius: 25vw;
  }
`;

const Needle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  content: "";
  min-width: 300px;
  min-height: 15px;
  width: 15vw;
  height: 0.75vw;
  border-radius: 100% 0 0 100%;
  background-color: rgba(255, 255, 255, 0.75);
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.95));
  transition: transform 1s 2s cubic-bezier(0.47, 1.64, 0.41, 0.7);
  ${({ percentage }) =>
    css`
      transform: rotate(${mapPercentageToDegrees(percentage)}deg);
    `}
  transform-origin: right;

  @media only screen and (max-width: 767px) {
    min-width: auto;
    min-height: auto;
    width: 35vw;
    height: 1.5vw;
  }
`;

const Circle = styled.span`
  position: absolute;
  left: calc(50% - 0.75vw);
  bottom: -0.5vw;
  width: 1.5vw;
  height: 1.5vw;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 50%;
  filter: drop-shadow(0px 0 3px rgba(0, 0, 0, 0.5));
  @media only screen and (max-width: 767px) {
    left: calc(50% - 0.75vw);
    bottom: -1vw;
    width: 2.5vw;
    height: 2.5vw;
  }
`;
const SpeedoMeter = ({ percentage }) => {
  return (
    <SpeedoMeterWrapper>
      <Needle percentage={percentage} />
      <Circle />
    </SpeedoMeterWrapper>
  );
};

export default SpeedoMeter;
