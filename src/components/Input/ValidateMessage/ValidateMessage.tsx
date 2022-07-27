import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';

interface Props {
  errors: any;
  name: string;
}

export const SValidateMessage = styled.div`
  margin-top: 4px;
  color: #ef5350;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
`;

const ValidateMessage = ({ errors, name }: Props) => {
  return (
    <ErrorMessage
      {...{ errors, name }}
      render={({ message }) => <SValidateMessage>{message}</SValidateMessage>}
    />
  );
};

export default ValidateMessage;
ValidateMessage.displayName = ValidateMessage;
