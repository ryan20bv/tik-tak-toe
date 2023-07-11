import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import tikTakToeSlice from "../tiktak/tiktakSlice";

const reducers = combineReducers({
	tikTakToeReducer: tikTakToeSlice.reducer,
});

export const indexStore = configureStore({
	reducer: reducers,
	// middleware: [thunk],
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Disable serializable check for redux-persist
		}),
});

export type RootState = ReturnType<typeof indexStore.getState>;
export type AppDispatch = typeof indexStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default indexStore;
