/*
 *
 * App reducers
 *
 */
import { Reducer } from 'redux';
import { AppState } from 'redux/types';
import * as types from './constants';
import { AppAction, AppStore } from './types';

const initState: AppStore = {
  lang: 'vi',
  loading: false,
};

export const appReducer: Reducer<AppStore, AppAction> = (
  state = initState,
  actions: AppAction,
) => {
  switch (actions.type) {
    case types.LOADING: {
      return { ...state, loading: actions.payload };
    }

    case types.LANGUAGE: {
      return { ...state, lang: actions.payload };
    }
    default:
      return { ...state };
  }
};

export const appSelector = (state: AppState) => state.app;
