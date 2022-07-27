import Button from 'components/Button';
import ErrorBound from 'components/ErrorBound';
import { Children } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filters } from '../data';
import { homeSelector } from '../store';
import { handleFilter } from '../store/actions';
import { SHandle } from './styles';

interface Props {}

export default function Handle(props: Props) {
  const { filter } = useSelector(homeSelector);

  const dispatch = useDispatch();

  return (
    <ErrorBound>
      <SHandle>
        {Children.toArray(
          filters.map(f => (
            <Button
              onClick={() => {
                dispatch(handleFilter(f.filter));
              }}
              themeColor={filter === f.filter ? 'red' : 'gray'}
            >
              {f.label}
            </Button>
          )),
        )}
      </SHandle>
    </ErrorBound>
  );
}

Handle.displayName = Handle;
