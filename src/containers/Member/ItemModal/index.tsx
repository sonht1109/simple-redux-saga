import Button from 'components/Button';
import {
  DateInput,
  Input,
  InputWrapper,
  ValidateMessage,
} from 'components/Input';
import Modal from 'components/Modal';
import { generateId, isDefined } from 'helpers';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Member } from '../store';
import { handleAdd, handleUpdate } from '../store/actions';
import { SModalContent } from './styles';

interface Props {
  member?: Member;
  isOpen: boolean;
  toggleModal: () => void;
  isEditing?: boolean;
}

export default function ItemModal(props: Props) {
  const { member, isOpen, toggleModal, isEditing = false } = props;

  const disabled = !isEditing && isDefined(member);

  const title = disabled
    ? 'Member Detail'
    : isEditing
    ? 'Edit The Member'
    : 'Add Member';

  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
    control,
  } = useForm();

  const onSubmit = (values: any) => {
    if (isEditing) {
      dispatch(handleUpdate({ ...member, ...values.member }));
      toast.success('Member is updated');
    } else {
      const member: Member = {
        id: generateId(),
        ...values.member,
      };
      dispatch(handleAdd(member));
      toast.success('Task is added');
    }
    toggleModal();
    reset();
  };

  useEffect(() => {
    if (member && isOpen) {
      member.dob = new Date(member.dob);
      setValue('member', member);
    }
  }, [member, setValue, isOpen]);

  return (
    <Modal {...{ title, isOpen, toggleModal }}>
      <SModalContent>
        <form className="modal__form">
          <InputWrapper label="Member">
            <Input
              disabled={disabled}
              {...register('member.name', {
                required: 'This field is required',
              })}
            />
            <ValidateMessage {...{ errors, name: 'member.name' }} />
          </InputWrapper>
          <InputWrapper label="Date of birth">
            <Controller
              name="member.dob"
              control={control}
              render={({ field: { value, ref, ...rest } }) => (
                <DateInput
                  selected={value}
                  {...rest}
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                />
              )}
              rules={{
                required: 'This field is required',
                validate: value =>
                  new Date(value).getTime() < Date.now() ||
                  'Dob must be less than now',
              }}
            />
            <ValidateMessage {...{ errors, name: 'member.dob' }} />
          </InputWrapper>
        </form>
        {!disabled && (
          <div className="modal__footer">
            <Button
              className="modal__footer__btn"
              themeColor="white"
              onClick={toggleModal}
            >
              Cancel
            </Button>
            <Button
              className="modal__footer__btn"
              themeColor="red"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              Apply
            </Button>
          </div>
        )}
      </SModalContent>
    </Modal>
  );
}

ItemModal.displayName = ItemModal;
