// import { createStore } from "redux";
// import rootReducer from "./reducers/index"

// const store = createStore(rootReducer)

// export default store;


import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import user from "./user/slice"

const rootReducer = {
  user
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

export default configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware
});