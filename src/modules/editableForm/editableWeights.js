import styled, { css } from "styled-components";
import { useRef, useState } from "react";

const hours = new Date().getHours();
const isDayTime = hours > 6 && hours < 20;

const colors = {
  white: "255, 255, 255",
  black: "0, 0, 0",
};
const Wrapper = styled.div`
  position: absolute;
  ${({ isVisible }) =>
    css`
      transform: translateY(${isVisible ? 0 : "-135px"});
    `};
  padding: 30px;
  display: flex;
  height: 200px;
  flex-direction: column;
  user-select: none;
  transition: transform 1s cubic-bezier(0.9, 1.8, 0.21, 0.8);
  @media only screen and (max-width: 767px) {
    padding: 20px;
    ${({ isVisible }) =>
      css`
        transform: translateY(${isVisible ? 0 : "-185px"});
      `};
  }
`;

const EditableFormContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const fieldAndButtonStyle = css`
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

const View = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 25%;
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

const Button = styled.button`
  ${fieldAndButtonStyle};
  margin-bottom: 10px;
  cursor: pointer;
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
  font-weight: bold;
  &:hover {
    color: rgba(${isDayTime ? colors.white : colors.black}, 1);
    background: rgba(
      ${isDayTime ? colors.black : colors.white},
      ${isDayTime ? 0.25 : 0.75}
    );
    border-color: rgba(${isDayTime ? colors.black : colors.white}, 0.75);
  }
`;

const MenuButton = styled.button`
  ${fieldAndButtonStyle};
  align-items: center;
  justify-content: center;
  display: flex;
  align-self: center;
  height: 25px;
  border-radius: 50px;
  background: rgba(
    ${isDayTime ? colors.black : colors.white},
    ${isDayTime ? 0.5 : 0.75}
  );
  border: 1px solid
    rgba(
      ${isDayTime ? colors.black : colors.white},
      ${isDayTime ? 0.125 : 0.25}
    );
  cursor: pointer;
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

  &:before {
    position: absolute;
    content: "";
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: 20px;
    /* background: rgba(${isDayTime ? colors.black : colors.white}, 0.75); */
    width: 25px;
    height: 15px;
    color: white;
  }

  img {
    width: 25px;
    height: 15px;
    filter: brightness(${isDayTime ? colors.black : colors.white});
    transition: transform 0.5s 0.5s linear;
    ${({ isVisible }) =>
      css`
        transform: rotate(${isVisible ? "0" : "180deg"});
      `}
  }
`;

const EditableWeights = ({
  fieldsDescriptor,
  onSubmitNewValues,
  isInitiallyVisible = true,
}) => {
  const formRefs = useRef({}).current;
  const [isVisible, setVisible] = useState(isInitiallyVisible);
  const handleSubmitClick = () => {
    const mappedValues = Object.keys(formRefs).reduce((acc, current) => {
      acc[current] = formRefs[current].value;
      return acc;
    }, {});
    onSubmitNewValues(mappedValues);
  };

  return (
    <Wrapper isVisible={isVisible}>
      <EditableFormContainer>
        {Object.keys(fieldsDescriptor).map((key) => {
          return (
            <View key={`${key}-view`}>
              <Label key={`${key}-label`}>{key}</Label>
              <Input
                key={key}
                ref={(ref) => (formRefs[key] = ref)}
                type="text"
                name={key}
                defaultValue={fieldsDescriptor[key]}
                autoComplete="off"
              />
            </View>
          );
        })}
      </EditableFormContainer>

      <Button onClick={handleSubmitClick}>Calculate Chances</Button>
      <MenuButton isVisible={isVisible} onClick={() => setVisible(!isVisible)}>
        <img alt="menu-arrow" src="arrow-up.png" />
      </MenuButton>
    </Wrapper>
  );
};

export default EditableWeights;
