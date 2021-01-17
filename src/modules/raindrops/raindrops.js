import React from "react";
import styled, { css, keyframes } from "styled-components";
import Raindrop from "basicCompnents/Raindrop/raindrop";
import { getRandomFloatBetweenRange, getRandomPositionAndScale } from "utils";
import Fader from "basicCompnents/Fader/fader";

const handleRaindropAnimation = ({
  fallingAnimation,
  randomDuration,
  maxYPosition,
}) => {
  if (!fallingAnimation) {
    return;
  }

  const fallingDrop = keyframes`
  to {  
    transform: translateY(${100 - maxYPosition}vh);
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

// We use .attrs here to pass the dynamic props to the inner style, thus avoiding create instance of the styling for each raindrop (styled-components -
// see https://styled-components.com/docs/basics#attaching-additional-props
const StyledRaindrop = styled(Raindrop).attrs((props) => {
  const { top, left, randomScale } = props;
  const style = {
    top: `${top}%`,
    left: `${left}%`,
    transform: `scale(${randomScale})`,
  };
  return { style };
})`
  position: absolute;
  ${handleRaindropAnimation};
`;

const positionDescriptor = getRandomPositionAndScale();

const Raindrops = ({
  count = 0,
  fallingAnimation = false,
  minScale,
  maxScale,
}) => {
  const raindropsContent = Array.from({ length: count }).map((_, index) => {
    const { top, left } = positionDescriptor;
    const topPosition = top[index];
    const leftPosition = left[index];
    const animationDescriptor = {
      delay: getRandomFloatBetweenRange({ min: 0.25, max: 2.5 }),
      duration: getRandomFloatBetweenRange({ min: 5, max: 20 }),
    };
    const { delay, duration } = animationDescriptor;

    // Never let a rain drop to reach the bottom
    const maxYPosition = topPosition + (100 - topPosition) / 2;
    return (
      <Fader delay={delay} key={`raindrop-wrapper-${index}`}>
        <StyledRaindrop
          index={index}
          top={topPosition}
          left={leftPosition}
          randomDuration={duration}
          randomScale={positionDescriptor.scale[index]}
          maxYPosition={maxYPosition}
          fallingAnimation={fallingAnimation}
        />
      </Fader>
    );
  });

  return <Container>{raindropsContent}</Container>;
};

export default Raindrops;
