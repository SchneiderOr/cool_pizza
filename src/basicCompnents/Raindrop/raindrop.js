import styled from "styled-components";

const Raindrop = styled.span`
  position: absolute;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03) -webkit-radial-gradient(center 75%, ellipse
        contain, #ffffff, rgba(255, 255, 255, 0) 50%);
  box-shadow: inset 0 0px 6px rgba(0, 0, 0, 0.25),
    inset 0 -1px 6px rgba(0, 0, 0, 0.14), inset 0 8px 3px rgba(0, 0, 0, 0.25),
    inset 0 10px 3px rgba(255, 255, 255, 0.1), 0 3px 6px rgba(0, 0, 0, 0.25);
`;

export default Raindrop;
