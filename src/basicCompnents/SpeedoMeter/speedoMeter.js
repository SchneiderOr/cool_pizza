import styled, { css } from "styled-components";
const mapValueToDeg = (value) => {
  const maxDegree = 180;
  return (value * maxDegree) / 100;
};

const SpeedoMeterWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 300px;
  height: 150px; /* half of the width */
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
  /* overflow: hidden; */
  background-image: url("pizza.png");
  background-size: cover;
  background-position: center;
`;

const Needle = styled.div`
  position: relative;
  content: "";
  width: 150px;
  height: 10px;
  border-radius: 100% 0 0 100%;
  background-color: rgba(255, 255, 255, 0.75);
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.95));
  transition: transform 1s 5s ease-out;
  ${({ value }) =>
    css`
      transform: rotate(${mapValueToDeg(value)}deg);
    `}
  transform-origin: right;

  &:after {
    position: absolute;
    content: "";
    width: 15px;
    height: 15px;
    background-color: rgba(0, 0, 0, 1);
    right: -2px;
    bottom: -2px;
    border-radius: 50%50%;
  }
`;

const SpeedoMeter = (props) => {
  return (
    <SpeedoMeterWrapper>
      <Needle value={props.value} />
    </SpeedoMeterWrapper>
  );
};
export default SpeedoMeter;
