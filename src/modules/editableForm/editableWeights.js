import styled, { css } from "styled-components";
import { useRef } from "react";

const fieldAndButtonStyle = css`
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  outline: none;
  transition: all 0.25s linear;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.75);
  }
`;

const View = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  background: transparent;
  font-size: 13px;
  font-style: italic;
  margin-bottom: 5px;
  text-align: left;
  padding-left: 5px;
`;

const Input = styled.input`
  ${fieldAndButtonStyle}
`;

const Button = styled.button`
  ${fieldAndButtonStyle}
  cursor: pointer;
`;

const EditableWeights = ({ fieldsDescriptor, onSubmitNewValues }) => {
  const formRefs = useRef({}).current;
  const handleSubmitClick = () => {
    const mappedValues = Object.keys(formRefs).reduce((acc, current) => {
      acc[current] = formRefs[current].value;
      return acc;
    }, {});
    onSubmitNewValues(mappedValues);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", marginBottom: 10 }}>
        {Object.keys(fieldsDescriptor).map((key) => {
          return (
            <View>
              <Label key={`${key}-label`}>{key}</Label>
              <Input
                key={key}
                ref={(ref) => (formRefs[key] = ref)}
                type="text"
                name={key}
                defaultValue={fieldsDescriptor[key]}
              />
            </View>
          );
        })}
      </div>

      <Button onClick={handleSubmitClick}>Calculate Chances</Button>
    </div>
  );
};

export default EditableWeights;
