import { createSlice } from "@reduxjs/toolkit";
import API from "../../API/urlConstants";

const token = localStorage.getItem(API.AUTH_TOKEN);

const initialState = {

 //   loggedIn: token ? true : false,
    // user:null,
    // isAuthenticated:false,
    fullName:"",
    email: "",
    role:"",
   // password:"",
};
console.log(token, "tokennnnn");
const subAdminSlice = createSlice({
    name: "subAdmin",
    initialState,
    reducers: {
        subAdmin(state, action) {
          //  state.loggedIn = true;
            state.email = action.payload?.email
            state.fullName = action.payload?.fullName
            state.role = action.payload?.role
           // state.password=action.payload
            return state;
        },

    },
});




export const subAdminActions = subAdminSlice.actions;

export default subAdminSlice.reducer;