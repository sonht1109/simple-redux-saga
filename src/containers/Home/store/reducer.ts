import { HomeState, HomeAction, EnumTodoFilterType } from './types';
import * as consts from './constants';
import { AppState } from 'redux/types';
import { Reducer } from 'redux';

const initState: HomeState = {
  data: [],
  filter: EnumTodoFilterType.ALL,
  keyword: '',
  take: 5,
  page: 1,
  shouldRefetch: false,
  total: 0
};

export const homeReducer: Reducer<HomeState, HomeAction> = (
  state = initState,
  action: HomeAction,
) => {
  switch (action.type) {
    case consts.FILTER: {
      return { ...state, filter: action.payload };
    }

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

export const homeSelector = (state: AppState) => state.home;
