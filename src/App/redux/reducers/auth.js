import { createSlice } from "@reduxjs/toolkit";
import API from "../../API/urlConstants";

const token = localStorage.getItem(API.AUTH_TOKEN);

const initialState = {
  
    loggedIn: token ? true : false,
    // user:null,
    // isAuthenticated:false,
    email:"",
    fullName:"",
    profileImage:""
};
console.log(token, "tokennnnn");
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.loggedIn = true;
            state.email=action.payload?.email
            state.fullName=action.payload?.fullName
            state.profileImage=action.payload?.profileImage
            // state.user=action.payload
            // state.isAuthenticated=true
            return state;
        },

        logout(state) {
            state.loggedIn = false;

            return state;
        },
    },
});




export const authActions = authSlice.actions;

export default authSlice.reducer;