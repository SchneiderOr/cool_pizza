import React from "react";
import styled, { keyframes } from "styled-components";
import Raindrop from "basicCompnents/Raindrop/raindrop";
import { getRandomFloatBetweenRange, getRandomPositionAndScale } from "utils";
import Fader from "basicCompnents/Fader/fader";

const raindropFall = keyframes`
from {
  transform:translateY(0);
} 
to {
  transform:translateY(200px);
  }
`;

const RaindropWrapper = styled.div.attrs((props) => {
  const { positionDescriptor, index } = props;
  const { top, left } = positionDescriptor;
  const style = { top: `${top[index]}vh`, left: `${left[index]}vw` };
  return { style };
})`
  position: absolute;
  animation: ${raindropFall} 30s 3s linear forwards;
`;

const FallingRaindrops = ({
  count = 0,
  minScale,
  maxScale,
  isRandomScaleFactor,
}) => {
  return Array.from({ length: count }).map((_, index) => {
    const positionDescriptor = getRandomPositionAndScale();
    const randomFadeInDelay = getRandomFloatBetweenRange({
      min: 0.25,
      max: 1.25,
    });
    return (
      <Fader key={`fader-${index}`} delay={randomFadeInDelay}>
        <RaindropWrapper
          key={`raindrop-wrapper-${index}`}
          index={index}
          positionDescriptor={positionDescriptor}
        >
          <Raindrop randomScaleFactor={positionDescriptor.scale[index]} />
        </RaindropWrapper>
      </Fader>
    );
  });
};

export default FallingRaindrops;
