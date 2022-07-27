import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export enum EnumTodoFilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface Todo {
  member: string;
  title: string;
  desc: string;
  completed: boolean;
  createdAt: string;
  id?: string;
  deadline: string | Date;
}

export interface HomeState {
  data: Todo[];
  filter: EnumTodoFilterType;
  keyword: string;
  take: number;
  page: number;
  total: number;
  shouldRefetch: boolean;
}

export type HomeAction = ActionType<typeof actions>;
