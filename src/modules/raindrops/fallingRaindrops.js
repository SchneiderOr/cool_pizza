import React from "react";
import styled, { css, keyframes } from "styled-components";
import Raindrop from "basicCompnents/Raindrop/raindrop";
import { getRandomFloatBetweenRange, getRandomPositionAndScale } from "utils";

const handleRaindropAnimation = ({ randomDuration, maxYPosition }) => {
  const fallingDrop = keyframes`
  to {  
    top: ${maxYPosition}%;
  }
  `;
  return css`
    animation: ${fallingDrop} ${randomDuration}s linear forwards;
  `;
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const FadedRaindrop = styled.div.attrs((props) => {
  const { top, left } = props;
  const style = { top: `${top}%`, left: `${left}%` };
  return { style };
})`
  position: absolute;
  ${({ randomScale }) =>
    css`
      transform: scale(${randomScale});
    `};
  ${handleRaindropAnimation};
`;

const FallingRaindrops = ({ count = 0, minScale, maxScale }) => {
  const raindropsContent = Array.from({ length: count }).map((_, index) => {
    const positionDescriptor = getRandomPositionAndScale();
    const randomFadeInDelay = getRandomFloatBetweenRange({
      min: 0.25,
      max: 1.25,
    });
    const randomDuration = getRandomFloatBetweenRange({
      min: 5,
      max: 20,
    });

    const { top, left } = positionDescriptor;
    const fixedTopPosition = +top[index];
    const maxYPosition = fixedTopPosition + (100 - fixedTopPosition) / 2;
    return (
      <FadedRaindrop
        top={fixedTopPosition}
        left={left[index]}
        delay={randomFadeInDelay}
        randomDuration={randomDuration}
        randomScale={positionDescriptor.scale[index]}
        maxYPosition={maxYPosition}
        key={`raindrop-wrapper-${index}`}
        index={index}
        positionDescriptor={positionDescriptor}
      >
        <Raindrop />
      </FadedRaindrop>
    );
  });
  return <Container>{raindropsContent}</Container>;
};

export default FallingRaindrops;
