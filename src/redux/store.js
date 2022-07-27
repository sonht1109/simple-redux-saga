import { appReducer } from 'containers/App/store';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootSaga from './root-saga';

const hasExtension =
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware];

const composeWith = hasExtension
  ? compose(applyMiddleware(...middlewares), hasExtension)
  : compose(applyMiddleware(...middlewares));

const staticReducers = {
  app: appReducer,
};

// Configure the store
function configureStore(initialState) {
  const store = createStore(createReducer(), initialState, composeWith);

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  sagaMiddleware.run(rootSaga);

  // Return the modified store
  return store;
}

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

const store = configureStore();

export default store;
