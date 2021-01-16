import styled, { css } from "styled-components";
import { colors } from "config/constants";

const Wrapper = styled.div`
  width: 100%;
  line-height: 1.6;
  font-size: 16px;
  margin: 20px auto 0;
  ${({ isDayTime }) => css`
    color: rgba(${isDayTime ? colors.black : colors.white}, 0.75);
  `}

  code {
    white-space: pre-line;
  }

  @media only screen and (max-height: 600px) {
    margin: 15px auto 0;
    font-size: 12px;
    line-height: 1;
  }

  @media only screen and (max-height: 374px) {
    display: none;
  }
`;

const FormulaCode = ({ isDayTime, children }) => (
  <Wrapper isDayTime={isDayTime}>
    Using formula: <br />
    <pre>
      <code>{children}</code>
    </pre>
  </Wrapper>
);

export default FormulaCode;
