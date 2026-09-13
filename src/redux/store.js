import { configureStore } from "@reduxjs/toolkit"
import userSlice from "../redux/userSlice"
import messageSlice from "../redux/messageSlice"
export const store = configureStore({
    reducer:{
        user:userSlice,
        message:messageSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['user.socket'],
                ignoredActions: ['user/setSocket'],
            },
        }),
})