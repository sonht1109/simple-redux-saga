import { isDefined } from 'helpers';
import { LOCAL_STORAGE_KEY_MEMBER } from 'helpers/constants';
import { Response } from 'helpers/types';
import { AppDispatch } from 'redux/types';
import { action } from 'typesafe-actions';
import { Member } from '.';
import * as consts from './constants';

export const defaultAction = (payload: any) => action(consts.DEFAULT, payload);

export const handleSearch = (keyword: string) =>
  action(consts.SEARCH, keyword.trim());

export const setData = (payload: Member[]) => action(consts.SET_DATA, payload);

export const setPage = (payload: number) => action(consts.SET_PAGE, payload);

export const setTake = (payload: number) => action(consts.SET_TAKE, payload);

export const setTotal = (payload: number) => action(consts.SET_TOTAL, payload);

export const refetch = () => action(consts.REFETCH);

export const getMembersFromStore = (): Member[] => {
  const members = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY_MEMBER) || '',
  );
  if (members?.data) {
    return members.data as Member[];
  }
  return [];
};

export const updateMembersInStore = (data: Member[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_MEMBER, JSON.stringify({ data }));
};

export const handleAdd = (payload: Member) => (dispatch: any) => {
  const tmp = [payload, ...getMembersFromStore()];
  updateMembersInStore(tmp);
  dispatch(refetch());
};

export const handleUpdate = (payload: Member) => (dispatch: any) => {
  const tmp = getMembersFromStore();
  const index = tmp.findIndex(d => d.id === payload.id);
  if (isDefined(index)) {
    tmp[index] = { ...payload };
    updateMembersInStore(tmp);
  }
  dispatch(refetch());
};

export const handleDelete = (id: string) => (dispatch: any) => {
  const tmp = getMembersFromStore().filter(d => d.id !== id);
  updateMembersInStore(tmp);
  dispatch(setPage(1));
}

export const getMembers = ({
  keyword = '',
  page = 1,
  take = 5,
}: {
  keyword?: string;
  page?: number;
  take?: number;
}): Response<Member> => {
  const data = getMembersFromStore();
  const start = (page - 1) * take;
  const end = page * take;
  const tmp = data.filter(d =>
    d.name.toLowerCase().includes(keyword.toLowerCase()),
  );
  return {
    data: tmp.slice(start, end),
    total: tmp.length,
  };
};

export const takeMembers =
  (res: Response<Member>) => (dispatch: AppDispatch) => {
    dispatch(setData(res.data));
    dispatch(setTotal(res.total));
  };

export const getMemberById = (id: string): Member | null => {
  const members = getMembersFromStore();
  return members.filter(d => d.id === id)?.[0];
};
