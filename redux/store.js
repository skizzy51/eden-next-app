import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import storeReducer from "./storeReducer"
import userReducer from "./userReducer"
import { persistReducer, persistStore } from "redux-persist"
import thunk from "redux-thunk"

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["store"],
}

const userPersistConfig = {
    key: "user",
    storage,
    whitelist: ["user", "admin", "username"],
    blacklist: ["favorites", "favoritesList", "loading"],
}

const rootReducer = combineReducers({
    store: storeReducer,
    user: persistReducer(userPersistConfig, userReducer),
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

export const persistor = persistStore(store)
