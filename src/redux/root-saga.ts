import * as homeConstants from 'containers/Home/store/constants';
import * as memberConstants from 'containers/Member/store/constants';
import { put, takeLatest } from 'redux-saga/effects';
import { action } from 'typesafe-actions';

function *watchFetchListTaskAction(actions: any) {
  if (actions?.payload) {
    const response = actions.payload;
    if (response?.data) {
      yield put(action(homeConstants.SET_DATA, response.data));
      yield put(action(homeConstants.SET_TOTAL, response.total));
    }
  }
}

function *watchFetchListMemberAction(actions: any) {
  if (actions?.payload) {
    const response = actions.payload;
    if (response?.data) {
      yield put(action(memberConstants.SET_DATA, response.data));
      yield put(action(memberConstants.SET_TOTAL, response.total));
    }
  }
}

export default function* rootSaga() {
  // fork tạo ra 1 process mới để hướng dẫn middleware perform 1 non-blocking call
  // yield fork(watchFetchListTaskAction);
  // or yield fork [watcher1, watcher2, ...];

  // takeLatest: call các actions => chỉ thực thi action cuối => có thể dùng kèm delay
  // takeEvery: thực thi tất cả các actions được call
  yield takeLatest(homeConstants.TAKE_DATA, watchFetchListTaskAction);

  yield takeLatest(memberConstants.TAKE_DATA, watchFetchListMemberAction);
}
