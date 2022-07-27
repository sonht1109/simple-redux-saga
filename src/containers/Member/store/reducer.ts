import { MemberState, MemberAction } from './types';
import * as consts from './constants';
import { AppState } from 'redux/types';
import { Reducer } from 'redux';

const initState: MemberState = {
  data: [],
  keyword: '',
  page: 1,
  take: 5,
  total: 0,
  shouldRefetch: false,
};

export const memberReducer: Reducer<MemberState, MemberAction> = (
  state = initState,
  action: MemberAction,
) => {
  switch (action.type) {
    case consts.SEARCH: {
      return { ...state, keyword: action.payload };
    }

    case consts.SET_DATA: {
      return { ...state, data: [...action.payload] };
    }

    case consts.SET_PAGE: {
      return { ...state, page: action.payload };
    }

    case consts.SET_TAKE: {
      return { ...state, take: action.payload };
    }

    case consts.SET_TOTAL: {
      return { ...state, total: action.payload };
    }

    case consts.REFETCH: {
      return { ...state, shouldRefetch: !state.shouldRefetch };
    }

    default:
      return { ...state };
  }
};

export const memberSelector = (state: AppState) => state.member;
