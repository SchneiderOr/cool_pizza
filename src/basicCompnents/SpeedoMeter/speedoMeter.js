import styled, { css } from "styled-components";
import { mapPercentageToDegrees } from "utils";

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
  width: 300px;
  height: 15px;
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
    min-height: 12px;
    width: 35vw;
    height: 1.5vw;
  }
`;

const Circle = styled.span`
  position: absolute;
  left: calc(50% - 12px);
  bottom: -8px;
  width: 25px;
  height: 25px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 50%;
  filter: drop-shadow(0px 0 3px rgba(0, 0, 0, 0.5));
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
