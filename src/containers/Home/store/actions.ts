import { isDefined } from 'helpers';
import { LOCAL_STORAGE_KEY } from 'helpers/constants';
import { Response } from 'helpers/types';
import { action } from 'typesafe-actions';
import { EnumTodoFilterType, Todo } from '.';
import * as consts from './constants';

export const defaultAction = (payload: any) => action(consts.DEFAULT, payload);

export const handleFilter = (filter: EnumTodoFilterType) =>
  action(consts.FILTER, filter);

export const handleSearch = (keyword: string) =>
  action(consts.SEARCH, keyword.trim());

export const setData = (todos: Todo[]) => action(consts.SET_DATA, todos);

export const setPage = (payload: number) => action(consts.SET_PAGE, payload);

export const setTake = (payload: number) => action(consts.SET_TAKE, payload);

export const setTotal = (payload: number) => action(consts.SET_TOTAL, payload);

export const refetch = () => action(consts.REFETCH);

export const getTodosFromStore = (): Todo[] => {
  const members = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '');
  if (members?.data) {
    return members.data as Todo[];
  }
  return [];
};

export const updateTodosInStore = (data: Todo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ data }));
};

export const handleAdd = (payload: Todo) => (dispatch: any) => {
  const tmp = [payload, ...getTodosFromStore()];
  updateTodosInStore(tmp);
  dispatch(refetch());
};

export const handleUpdate = (payload: Todo) => (dispatch: any) => {
  const tmp = getTodosFromStore();
  const index = tmp.findIndex(d => d.id === payload.id);
  if (isDefined(index)) {
    tmp[index] = { ...payload };
    updateTodosInStore(tmp);
  }

  dispatch(refetch());
};

export const handleDelete = (id: string) => (dispatch: any) => {
  const tmp = getTodosFromStore().filter(d => d.id !== id);
  updateTodosInStore(tmp);
  dispatch(setPage(1));
};

export const getTodos = ({
  keyword = '',
  page = 1,
  take = 5,
  filter = EnumTodoFilterType.ALL,
}: {
  keyword?: string;
  page?: number;
  take?: number;
  filter?: EnumTodoFilterType;
}): Response<Todo> => {
  const data: Todo[] = getTodosFromStore();
  const start = (page - 1) * take;
  const end = page * take;

  let tmp = data.filter(d =>
    d.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  if (filter === EnumTodoFilterType.ACTIVE) {
    tmp = tmp.filter(d => d.completed === false);
  } else if (filter === EnumTodoFilterType.COMPLETED) {
    tmp = tmp.filter(d => d.completed === true);
  }

  return {
    data: tmp.slice(start, end),
    total: tmp.length,
  };
};

// export const takeTodos = (res: Response<Todo>) => (dispatch: AppDispatch) => {
//   dispatch(setData(res.data));
//   dispatch(setTotal(res.total));
// };

export const takeTodos = (res: Response<Todo>) => action(consts.TAKE_DATA, res);
