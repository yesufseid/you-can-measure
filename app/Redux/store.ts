import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import youReducer from "./youSlice";
import youSaga from "./youSaga";




const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    category:youReducer,
    },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(youSaga);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
