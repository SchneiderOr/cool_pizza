import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import FormulaCode from "basicCompnents/FormulaCode/formulaCode";
import Fader from "basicCompnents/Fader/fader";
import { ALGORITHEM_FORMULA, disabledFields, colors } from "config/constants";

const fieldAndButtonStyle = ({ disabled, isDayTime }) => {
  return css`
    pointer-events: ${disabled ? "none" : "all"};
    opacity: ${disabled ? 0.5 : 1};

    background: rgba(
      ${isDayTime ? colors.black : colors.white},
      ${isDayTime ? 0.25 : 0.125}
    );
    border: 1px solid
      rgba(
        ${isDayTime ? colors.black : colors.white},
        ${isDayTime ? 0.25 : 0.125}
      );
    color: white;
    padding: 10px;
    outline: none;
    transition: all 0.25s cubic-bezier(0.8, 0.2, 1, 1.2);

    &:hover,
    &:focus {
      background: rgba(
        ${isDayTime ? colors.black : colors.white},
        ${isDayTime ? 0.5 : 0.25}
      );
      border: 1px solid
        rgba(
          ${isDayTime ? colors.black : colors.white},
          ${isDayTime ? 0.25 : 0.25}
        );
    }
  `;
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 200px;
  margin-top: 30px;
  align-items: center;
  white-space: pre;
  color: white;
  flex-direction: column;
  user-select: none;
  transition: transform 1s 1s cubic-bezier(0.9, 1.5, 0.24, 1);
  ${({ isVisible }) =>
    css`
      transform: translateY(${isVisible ? 0 : "-140px"});
    `};
  @media only screen and (max-width: 767px) {
    width: 90%;
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
    ${({ isVisible }) =>
      css`
        transform: translateY(${isVisible ? 0 : "-195px"});
      `};
  }
`;

const FormContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 700px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media only screen and (max-width: 767px) {
    flex: 1 1 50%;
  }
`;

const Label = styled.label`
  background: transparent;
  font-size: 13px;
  font-style: italic;
  margin-bottom: 5px;
  text-align: left;
  padding-left: 5px;
  user-select: none;
`;

const Input = styled.input`
  ${fieldAndButtonStyle};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
`;

const Button = styled.button`
  ${fieldAndButtonStyle};
  flex: 1;
  margin-bottom: 10px;
  cursor: pointer;
`;

const MenuButton = styled.button`
  ${fieldAndButtonStyle};
  align-items: center;
  justify-content: center;
  display: flex;
  align-self: center;
  border-radius: 10px;
  cursor: pointer;
  padding: 5px 10px;
  ${({ isDayTime }) => {
    return css`
      background: rgba(
        ${isDayTime ? colors.black : colors.white},
        ${isDayTime ? 0.5 : 0.75}
      );
      border: 1px solid
        rgba(
          ${isDayTime ? colors.black : colors.white},
          ${isDayTime ? 0.125 : 0.25}
        );
      &:focus {
        background: rgba(
          ${isDayTime ? colors.black : colors.white},
          ${isDayTime ? 0.5 : 0.75}
        );
        border: 1px solid
          rgba(
            ${isDayTime ? colors.black : colors.white},
            ${isDayTime ? 0.125 : 0.25}
          );
      }
      &:hover {
        background: rgba(
          ${isDayTime ? colors.black : colors.white},
          ${isDayTime ? 0.25 : 0.5}
        );
        border-color: rgba(${isDayTime ? colors.black : colors.white}, 0.5);
      }

      img {
        width: 25px;
        height: 15px;
        filter: brightness(${isDayTime ? 3 : 0.75});
        transform: translateZ(0px);
        outline: none;
        border: none;
        transition: transform 0.5s 0.5s linear;
        ${({ isVisible }) =>
          css`
            transform: rotate(${isVisible ? "0" : "180deg"});
          `}
      }
    `;
  }}
`;

const InfoPanel = ({
  isDayTime,
  fieldsDescriptor,
  onSubmitNewValues,
  onRefetchRequest,
}) => {
  const formRefs = useRef({}).current;
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  // Use uncontrolled so we collect all the values genericly instead of implemeting functionality
  const handleSubmitClick = () => {
    const mappedValues = Object.keys(formRefs).reduce((acc, current) => {
      acc[current] = formRefs[current].value;
      return acc;
    }, {});
    onSubmitNewValues(mappedValues);
  };

  const formFields = Object.keys(fieldsDescriptor).map((key) => {
    return (
      <FormField
        key={`${fieldsDescriptor.currentIssues}-${fieldsDescriptor.minutesLeft}-${key}-FormField`}
      >
        <Label>{key}</Label>
        <Input
          ref={(ref) => (formRefs[key] = ref)}
          type="text"
          step="0.1"
          min="0"
          max="100"
          name={key}
          defaultValue={fieldsDescriptor[key]}
          disabled={disabledFields[key]}
          autoComplete="off"
          isDayTime={isDayTime}
        />
      </FormField>
    );
  });

  return (
    <Wrapper isVisible={isVisible}>
      <FormContainer>{formFields}</FormContainer>
      <ButtonsWrapper>
        <Button isDayTime={isDayTime} onClick={handleSubmitClick}>
          Calculate Chances
        </Button>
        <Button isDayTime={isDayTime} onClick={onRefetchRequest}>
          Fetch New Random Issues
        </Button>
      </ButtonsWrapper>
      <MenuButton
        isDayTime={isDayTime}
        isVisible={isVisible}
        onClick={() => setVisible(!isVisible)}
      >
        <img alt="menu-arrow" src="arrow-up.png" />
      </MenuButton>
      {isVisible && (
        <Fader delay={3}>
          <FormulaCode isDayTime={isDayTime}>{ALGORITHEM_FORMULA}</FormulaCode>
        </Fader>
      )}
    </Wrapper>
  );
};

export default InfoPanel;
