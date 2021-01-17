import styled from "styled-components";
import { getBGColorGradientByTime } from "./utils";

const ChangingBackgroundWrapper = styled.div`
  position: relative;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${getBGColorGradientByTime};
`;

export default ChangingBackgroundWrapper;
