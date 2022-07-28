import ErrorBound from 'components/ErrorBound';
import Pagination from 'components/Pagination';
import { Children, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeSelector } from '../store';
import { getTodos, setPage, takeTodos } from '../store/actions';
import ListItem from './ListItem';
import { SList } from './styles';
interface Props {}

export default function List(props: Props) {
  const { data, filter, keyword, page, take, shouldRefetch, total } =
    useSelector(homeSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(takeTodos(getTodos({ filter, keyword, take, page })));
  }, [filter, keyword, dispatch, page, take, shouldRefetch]);

  return (
    <ErrorBound>
      <SList>
        {data.length ? (
          Children.toArray(data.map(d => <ListItem key={d.id} d={d} />))
        ) : (
          <p style={{ textAlign: 'center' }}>No data</p>
        )}
      </SList>
      <Pagination
        current={page}
        size={take}
        total={total}
        onChange={page => dispatch(setPage(page))}
      />
    </ErrorBound>
  );
}

List.displayName = List;
