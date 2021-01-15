import styled from "styled-components";
import { getRandomFloatBetweenRange } from "utils";

const Raindrop = styled.span.attrs((props) => {
  const { isRandomScaleFactor, minScale = 0.5, maxScale = 1.5 } = props;
  const style = {};
  if (isRandomScaleFactor) {
    const scaleFactor = getRandomFloatBetweenRange({
      min: minScale,
      max: maxScale,
    });
    style.transform = `scale(${scaleFactor})`;
  }
  return { style };
})`
  position: absolute;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03) -webkit-radial-gradient(center 75%, ellipse
        contain, #ffffff, rgba(255, 255, 255, 0) 60%);
  box-shadow: inset 0 0px 6px rgba(0, 0, 0, 0.5),
    inset 0 -1px 6px rgba(0, 0, 0, 0.4), inset 0 8px 3px rgba(0, 0, 0, 0.5),
    inset 0 10px 3px rgba(255, 255, 255, 0.1), 0 3px 6px rgba(0, 0, 0, 0.25);
`;

export default Raindrop;
