import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Input } from '..';

interface Props extends ReactDatePickerProps {}

const DateInput = (props: Props) => {
  return (
    <DatePicker
      dateFormat="dd/MM/yyyy, HH:mm"
      customInput={<Input />}
      {...props}
    />
  );
};

export default DateInput;
DateInput.displayName = DateInput;
