import ErrorBound from 'components/ErrorBound';
import { Radio } from 'components/Input';
import { SListItem } from './styles';
import classNames from 'classnames';
import { Todo } from 'containers/Home/store';
import { useDispatch } from 'react-redux';
import { handleDelete, handleUpdate } from 'containers/Home/store/actions';
import useDisclosure from 'hooks/useDisclosure';
import ItemModal from 'containers/Home/ItemModal';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface Props {
  d: Todo;
}

type KeyOfTodo = keyof Todo;

export default function ListItem({ d }: Props) {
  const dispatch = useDispatch();

  const onUpdateItem = (newProps: { [k in KeyOfTodo]?: any }) => {
    dispatch(handleUpdate({ ...d, ...newProps }));
  };

  const isOverDeadline =
    !d?.completed && d?.deadline && new Date(d.deadline).getTime() < Date.now();

  return (
    <ErrorBound>
      <SListItem className={classNames({ 'over-deadline': isOverDeadline })}>
        <Radio
          checked={d.completed}
          onChange={() => onUpdateItem({ completed: !d.completed })}
        />
        <div className={classNames('item__label', { completed: d.completed })}>
          <span>{d.title}</span>
          <br />
          {d?.deadline && (
            <span className="item__deadline">
              Deadline: {format(new Date(d.deadline), 'dd/MM/yyyy, HH:mm')}
            </span>
          )}
        </div>
        <div className="item__handle--container">
          <ViewBtn d={d} />
          <EditBtn d={d} />
          <DeleteBtn d={d} />
        </div>
      </SListItem>
    </ErrorBound>
  );
}

ListItem.displayName = ListItem;

const ViewBtn = ({ d }: { d: Todo }) => {
  const [state, handler] = useDisclosure(false);

  return (
    <>
      <div className="item__handle" onClick={handler.open}>
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8805 4.68734C15.7377 4.52803 12.3026 0.78125 8.00002 0.78125C3.69745 0.78125 0.262328 4.52803 0.119484 4.68734C-0.0398281 4.86541 -0.0398281 5.13459 0.119484 5.31266C0.262328 5.47197 3.69752 9.21875 8.00002 9.21875C12.3025 9.21875 15.7377 5.47197 15.8805 5.31266C16.0398 5.13459 16.0398 4.86541 15.8805 4.68734ZM8.00002 8.28125C6.19092 8.28125 4.71877 6.80909 4.71877 5C4.71877 3.19091 6.19092 1.71875 8.00002 1.71875C9.80911 1.71875 11.2813 3.19091 11.2813 5C11.2813 6.80909 9.80911 8.28125 8.00002 8.28125Z"
            fill="#EF5350"
          />
        </svg>
      </div>
      <ItemModal
        isOpen={state}
        toggleModal={handler.toggle}
        todo={d}
        isEditing={false}
      />
    </>
  );
};

const EditBtn = ({ d }: { d: Todo }) => {
  const [state, handler] = useDisclosure(false);

  return (
    <>
      <div className="item__handle" onClick={handler.open}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9636 1.03552C13.5863 -0.345172 11.3466 -0.345172 9.96928 1.03552L0.812414 10.189C0.740823 10.2606 0.696504 10.3526 0.682868 10.4515L0.00445532 15.4765C-0.0159993 15.6197 0.0351373 15.7629 0.134001 15.8617C0.219229 15.947 0.338548 15.9981 0.457867 15.9981C0.478321 15.9981 0.498776 15.9981 0.519231 15.9947L3.54652 15.5856C3.79879 15.5515 3.97607 15.3197 3.94197 15.0674C3.90788 14.8151 3.67606 14.6379 3.42379 14.672L0.996506 14.9992L1.47037 11.4947L5.15903 15.1833C5.24425 15.2686 5.36357 15.3197 5.48289 15.3197C5.60221 15.3197 5.72153 15.272 5.80676 15.1833L14.9636 6.02986C15.6318 5.36168 16 4.47531 16 3.53099C16 2.58666 15.6318 1.70029 14.9636 1.03552ZM10.1466 2.16052L11.6841 3.69803L3.32834 12.0538L1.79083 10.5163L10.1466 2.16052ZM5.4863 14.2083L3.98288 12.7049L12.3386 4.34917L13.842 5.85259L5.4863 14.2083ZM14.4829 5.19463L10.8045 1.5162C11.2716 1.13097 11.8545 0.919608 12.4682 0.919608C13.167 0.919608 13.8216 1.19234 14.3159 1.68325C14.8102 2.17416 15.0795 2.83212 15.0795 3.53099C15.0795 4.14804 14.8682 4.72758 14.4829 5.19463Z"
            fill="#EF5350"
          />
        </svg>
      </div>
      <ItemModal
        isOpen={state}
        toggleModal={handler.toggle}
        todo={d}
        isEditing={true}
      />
    </>
  );
};

const DeleteBtn = ({ d }: { d: Todo }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    if (d.id) {
      dispatch(handleDelete(d.id));
      toast.success('Task is deleted');
    }
  };

  return (
    <div className="item__handle" onClick={onDelete}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5007 2.30263H11.7577V1.75987C11.7577 0.789474 10.8701 0 9.77901 0H6.22099C5.12991 0 4.24226 0.789474 4.24226 1.75987V2.30263H0.499307C0.221914 2.30263 0 2.5 0 2.74671C0 2.99342 0.221914 3.19079 0.499307 3.19079H1.40176V13.625C1.40176 14.9342 2.60009 16 4.07212 16H11.9279C13.3999 16 14.5982 14.9342 14.5982 13.625V3.19079H15.5007C15.7781 3.19079 16 2.99342 16 2.74671C16 2.5 15.7781 2.30263 15.5007 2.30263ZM5.24087 1.75987C5.24087 1.27961 5.681 0.888158 6.22099 0.888158H9.77901C10.319 0.888158 10.7591 1.27961 10.7591 1.75987V2.30263H5.24087V1.75987ZM13.5996 13.625C13.5996 14.4441 12.8488 15.1118 11.9279 15.1118H4.07212C3.15118 15.1118 2.40037 14.4441 2.40037 13.625V3.19079H13.6033V13.625H13.5996Z"
          fill="#EF5350"
        />
        <path
          d="M7.99979 13.5196C8.27718 13.5196 8.49909 13.3222 8.49909 13.0755V5.22684C8.49909 4.98013 8.27718 4.78276 7.99979 4.78276C7.7224 4.78276 7.50049 4.98013 7.50049 5.22684V13.0722C7.50049 13.3189 7.7224 13.5196 7.99979 13.5196Z"
          fill="#EF5350"
        />
        <path
          d="M4.74149 13.0295C5.01889 13.0295 5.2408 12.8321 5.2408 12.5854V5.71366C5.2408 5.46695 5.01889 5.26958 4.74149 5.26958C4.4641 5.26958 4.24219 5.46695 4.24219 5.71366V12.5854C4.24219 12.8321 4.4678 13.0295 4.74149 13.0295Z"
          fill="#EF5350"
        />
        <path
          d="M11.2581 13.0295C11.5355 13.0295 11.7574 12.8321 11.7574 12.5854V5.71366C11.7574 5.46695 11.5355 5.26958 11.2581 5.26958C10.9807 5.26958 10.7588 5.46695 10.7588 5.71366V12.5854C10.7588 12.8321 10.9807 13.0295 11.2581 13.0295Z"
          fill="#EF5350"
        />
      </svg>
    </div>
  );
};
