import Button from 'components/Button';
import {
  DateInput,
  Input,
  InputWrapper,
  Select,
  ValidateMessage,
} from 'components/Input';
import Modal from 'components/Modal';
import { getMemberById, getMembers } from 'containers/Member/store/actions';
import { generateId, isDefined } from 'helpers';
import { Option } from 'helpers/types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Todo } from '../store';
import { handleAdd, handleUpdate } from '../store/actions';
import { SModalContent } from './styles';

interface Props {
  todo?: Todo;
  isOpen: boolean;
  toggleModal: () => void;
  isEditing?: boolean;
}

export default function ItemModal(props: Props) {
  const { todo, isOpen, toggleModal, isEditing = false } = props;

  const disabled = !isEditing && isDefined(todo);

  const title = disabled
    ? 'Task Detail'
    : isEditing
    ? 'Edit The Task'
    : 'Add Task';

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
    values.todo.member = values.todo.member.value;
    if (isEditing) {
      dispatch(handleUpdate({ ...todo, ...values.todo }));
      toast.success('Task is updated');
    } else {
      const todo: Todo = {
        completed: false,
        createdAt: new Date().toISOString(),
        id: generateId(),
        ...values.todo,
      };
      dispatch(handleAdd(todo));
      toast.success('Task is added');
    }
    toggleModal();
    reset();
  };

  useEffect(() => {
    if (todo && isOpen) {
      if (todo?.deadline) {
        todo.deadline = new Date(todo.deadline);
      }

      setValue('todo', todo);

      const selectedMember = getMemberById(todo.member);
      if (selectedMember) {
        setValue('todo.member', {
          label: selectedMember?.name,
          value: selectedMember?.id,
        });
      }
    }
  }, [todo, setValue, isOpen]);

  const [members, setMembers] = useState<Option[]>([]);

  useEffect(() => {
    if (!disabled && isOpen) {
      const members = getMembers({take: 10}).data;
      if (members.length) {
        const mappedMembers: Option[] = members.map(d => ({
          label: d.name,
          value: d.id,
        }));
        setMembers(mappedMembers);
      }
    }
  }, [disabled, isOpen]);

  return (
    <Modal {...{ title, isOpen, toggleModal }}>
      <SModalContent>
        <form className="modal__form">
          <InputWrapper label="Member">
            <Controller
              control={control}
              name="todo.member"
              render={({ field: { ref, ...rest } }) => (
                <Select {...rest} options={members} isDisabled={disabled} />
              )}
            />
            <ValidateMessage {...{ errors, name: 'todo.member' }} />
          </InputWrapper>
          <InputWrapper label="Title">
            <Input
              disabled={disabled}
              {...register('todo.title', {
                required: 'This field is required',
              })}
            />
            <ValidateMessage {...{ errors, name: 'todo.title' }} />
          </InputWrapper>
          <InputWrapper label="Description">
            <Input
              disabled={disabled}
              {...register('todo.desc', {
                required: 'This field is required',
              })}
            />
            <ValidateMessage {...{ errors, name: 'todo.desc' }} />
          </InputWrapper>
          <InputWrapper label="Deadline">
            <Controller
              name="todo.deadline"
              control={control}
              render={({ field: { value, ref, ...rest } }) => (
                <DateInput
                  selected={value}
                  {...rest}
                  showTimeSelect={true}
                  minDate={new Date()}
                />
              )}
              rules={{
                validate: value =>
                  !value ||
                  new Date(value).getTime() > Date.now() ||
                  'Deadline must be greater than now',
              }}
            />
            <ValidateMessage {...{ errors, name: 'todo.deadline' }} />
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
