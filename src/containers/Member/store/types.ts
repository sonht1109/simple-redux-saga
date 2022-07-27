import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export interface MemberState {
  data: Member[];
  keyword: string;
  take: number;
  page: number;
  total: number;
  shouldRefetch: boolean;
}

export type MemberAction = ActionType<typeof actions>;

export interface Member {
  name: string;
  id: string;
  dob: string | Date;
}
