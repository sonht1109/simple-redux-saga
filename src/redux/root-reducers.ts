import { combineReducers } from 'redux';
import { appReducer } from 'containers/App/store';
import { homeReducer } from 'containers/Home/store';
import { memberReducer } from 'containers/Member/store'
// [IMPORT NEW REDUCERS]

//pages
const rootReducer = combineReducers({
  app: appReducer,
  home: homeReducer,
  member: memberReducer,
  // [COMBINE NEW REDUCERS]
});

export default rootReducer;
