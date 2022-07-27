import rootReducer from "./root-reducers";
import store from "./store";

export type AppStore = typeof store
export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']