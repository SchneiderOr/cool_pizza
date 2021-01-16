import styled, { css } from "styled-components";
import { colors } from "config/constants";

const Wrapper = styled.div`
  width: 100%;
  line-height: 20px;
  font-size: 16px;
  margin: 20px auto 0;
  ${({ isDayTime }) => css`
    color: rgba(${isDayTime ? colors.black : colors.white}, 0.75);
  `}

  code {
    white-space: nowrap;
  }

  @media only screen and (max-width: 767px) {
    code {
      white-space: pre-line;
    }
    top: 250px;
  }

  @media only screen and (max-width: 500px) {
    line-height: 16px;
    font-size: 12px;
    top: 60%;

    letter-spacing: 1px;
    code {
      white-space: pre-line;
    }
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
