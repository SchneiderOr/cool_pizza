import Fader from "basicCompnents/Fader/fader";
import styled, { css } from "styled-components";
import { mapPercentageToDegrees } from "utils";

const breakpoints = {
  desktop: {
    speedoMeter: css`
      width: 50vw;
      height: 25vw;
      min-width: 300px;
      min-height: 150px;
      max-width: 600px;
      max-height: 300px;
    `,
    needle: css`
      width: 25vw;
      height: 1vw;
      min-width: 150px;
      min-height: 12px;
      max-width: 300px;
      max-height: 15px;
    `,
  },
  landscape: {
    speedoMeter: css`
      width: 25vw;
      height: 12.5vw;
      min-width: 150px;
      min-height: 76px;
      max-width: 300px;
      max-height: 150px;
    `,
    needle: css`
      width: 12.5vw;
      height: 0.5vw;
      min-width: 75px;
      min-height: 12px;
      max-width: 150px;
      max-height: 15px;
    `,
  },
};
const SpeedoMeterWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  background-image: url("pizza.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  ${breakpoints.desktop.speedoMeter};
  @media only screen and (max-height: 600px) {
    ${breakpoints.landscape.speedoMeter};
  }
`;

const Needle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 100% 0 0 100%;
  background-color: rgba(255, 255, 255, 0.75);
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.95));
  transition: transform 1s 2s cubic-bezier(0.47, 1.64, 0.41, 0.7);
  ${({ percentage }) =>
    css`
      transform: rotate(${mapPercentageToDegrees(percentage)}deg);
    `}
  transform-origin: right;

  ${breakpoints.desktop.needle};
  @media only screen and (max-height: 600px) {
    ${breakpoints.landscape.needle};
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

const FaderPercentage = styled(Fader)`
  position: absolute;
  top: -25px;
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
      font-size: 13px;
      margin-top: 5px;
    }
    font-size: 20px;
  }
`;

const SpeedoMeter = ({ percentage }) => {
  return (
    <SpeedoMeterWrapper>
      <FaderPercentage delay={3}>{percentage}</FaderPercentage>
      <Needle percentage={percentage} />
      <Circle />
    </SpeedoMeterWrapper>
  );
};

export default SpeedoMeter;
