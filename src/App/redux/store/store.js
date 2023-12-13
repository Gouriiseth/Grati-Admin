import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";
import subAdminReducer from "../reducers/subAdmin";
// import userReducer from "./reducers/user";
// import loaderReducer from "./reducers/loader";
// import formDataReducer from "./reducers/formData";

const store = configureStore({
    reducer: {
        auth: authReducer,
        subAdmin:subAdminReducer,
        // user: userReducer,
        // loader: loaderReducer,
        // bookingData: formDataReducer,
    },
});

export default store;