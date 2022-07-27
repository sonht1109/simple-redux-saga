import styled from "styled-components";

interface Props {
  checked?: boolean;
  onChange?: () => void;
  label?: string;
}

const Radio = ({checked, label, onChange}: Props) => {
  return (
    <SRadio
      className={`${checked ? 'checked' : ''}`}
      {...{ onClick: onChange }}
    >
      <div className="radio"></div>
      <span className="label">{label}</span>
    </SRadio>
  );
};

export default Radio;
Radio.displayName = Radio;

export const SRadio = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  .radio {
    width: 14px;
    height: 14px;
    min-width: 14px;
    border-radius: 8px;
    background-color: white;
    border: 2px solid;
    position: relative;
    margin-right: 8px;
    &:after {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 10px;
      height: 10px;
      min-width: 5px;
      border-radius: 5px;
      transform: scale(0);
      transition: 0.1s;
      background-color: transparent;
    }
  }
  &:not(.checked) {
    .radio {
      border-color: #455A64;
    }
  }
  &:not(.checked) {
    &:hover {
      .radio {
        border-color: #455A64;
      }
    }
  }
  &.checked {
    .radio {
      border-color: #455A64;
      &:after {
        transform: scale(1);
        background-color: #455A64;
      }
    }
  }
  .label {
    font-size: 16px;
    line-height: 24px;
    user-select: none;
  }
`;
