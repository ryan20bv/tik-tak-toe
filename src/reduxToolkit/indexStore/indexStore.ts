import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import tikTakToeSlice from "../tiktak/slices/tiktakSlice";

// for redux persistence
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const reducers = combineReducers({
	tikTakToeReducer: tikTakToeSlice.reducer,
});

const persistConfig = {
	key: "root",
	storage,
	blacklist: [],
	// storageSession,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const indexStore = configureStore({
	reducer: persistedReducer,
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

// export default indexStore;

export const persistor = persistStore(indexStore);
