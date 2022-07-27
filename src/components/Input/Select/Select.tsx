import RS, { Props as RsProps } from 'react-select';

interface Props extends RsProps {}

const Select = (props: Props) => {
  return <RS {...props} />;
};

export default Select;
Select.displayName = Select;
