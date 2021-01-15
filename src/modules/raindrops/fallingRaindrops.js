import styled, { keyframes } from "styled-components";
import Raindrop from "basicCompnents/Raindrop/raindrop";
import { generateUniqePositionsArray, getRandomFloatBetweenRange } from "utils";
import Fader from "basicCompnents/Fader/fader";
import { useEffect, useRef, useState } from "react";

const raindropFall = keyframes`
from {
  transform:translateY(0);
} 
to {
  transform:translateY(200px);
  }
`;

const RaindropWrapper = styled.div.attrs((props) => {
  const { positionDescriptor } = props;
  const style = {};
  if (positionDescriptor) {
    style.top = `${positionDescriptor.top}vh`;
    style.left = `${positionDescriptor.left}vw`;
  }
  return { style };
})`
  position: relative;
  animation: ${raindropFall} 30s 3s linear forwards;
`;

const FallingRaindrops = ({
  count = 0,
  minScale,
  maxScale,
  isRandomPosition,
  isRandomScaleFactor,
}) => {
  // In case user decided to not specify the position and instead let the component render position randomaly, we apply it to the position
  const randomPositionDescriptor = {
    top: generateUniqePositionsArray({ count, maxRange: 90 }),
    left: generateUniqePositionsArray({ count }),
  };

  return Array.from({ length: count }).map((_, i) => {
    const passedProps = {};
    if (
      isRandomPosition &&
      randomPositionDescriptor &&
      randomPositionDescriptor.top
    ) {
      const { top, left } = randomPositionDescriptor;
      passedProps.positionDescriptor = { top: top[i], left: left[i] };
    }
    const randomFadeInDelay = getRandomFloatBetweenRange({
      min: 0.25,
      max: 1.25,
    });
    return (
      <Fader key={i} delay={randomFadeInDelay}>
        <RaindropWrapper {...passedProps}>
          <Raindrop
            isRandomScaleFactor={isRandomScaleFactor}
            minScale={minScale}
            maxScale={maxScale}
          />
        </RaindropWrapper>
      </Fader>
    );
  });
};

export default FallingRaindrops;
