import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
from {
  opacity: 0;
} 
to {
  opacity: 1;
}
`;

const Fader = styled.div`
  display: flex;
  width: 100%;
  opacity: 0;
  ${({ duration, delay, timmingFunction, mode }) => css`
    animation: ${fadeIn} ${duration}s ${delay}s ${timmingFunction} ${mode};
  `}
`;

Fader.defaultProps = {
  duration: "0.5",
  delay: "0",
  timmingFunction: "linear",
  mode: "forwards",
};

export default Fader;
