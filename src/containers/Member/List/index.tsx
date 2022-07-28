import ErrorBound from 'components/ErrorBound';
import Pagination from 'components/Pagination';
import { Children, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memberSelector } from '../store';
import { getMembers, setPage, takeMembers } from '../store/actions';
import ListItem from './ListItem';
import { SList } from './styles';

interface Props {}

export default function List(props: Props) {
  const { data, keyword, take, page, total, shouldRefetch } =
    useSelector(memberSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(takeMembers(getMembers({ keyword, take, page })));
  }, [keyword, dispatch, take, page, shouldRefetch]);

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
