import { ReactNode } from 'react';
import { SInputWrapper } from './styles';

interface Props {
  children: ReactNode;
  label: ReactNode;
  className?: string;
}

const InputWrapper = (props: Props) => {
  const { children, label, className } = props;

  return (
    <SInputWrapper {...{ className }}>
      <div className="input-wrapper__label">{label}</div>
      <div className="input-wrapper__children">{children}</div>
    </SInputWrapper>
  );
};

export default InputWrapper;
InputWrapper.displayName = InputWrapper;
