// auth constants
const API_URL ="http://52.90.74.171:5000/api/";
 const API = {
      AUTH_TOKEN : "Grati",
   AUTHORIZATION_HEADER :"authorization",

   //auth 
    LOGIN_URL : API_URL + "admin/login",
     FORGET_PASSWORD: API_URL + "admin/sendOtp",
     OTP_VERIFICATION: API_URL + "admin/verifyOTP",
    RESET_PASSWORD: API_URL + "admin/resetpassword",
   
   // manage admin
    BLOCK_ADMIN: API_URL + "admin/blockAdmin",
   CREATE_SUBADMIN: API_URL + "admin/createSubAdmin",
     VIEW_ADMIN_DETS: API_URL + "admin/viewAdminDetails",
     LIST_ADMIN_DETS: API_URL + "admin/listAllAdmins",
      EDIT_ADMIN_DETS: API_URL + "admin/editAdminRoles",
      DEL_ADMIN: API_URL + "admin/deleteAdmins",
      SEARCH_ADMIN: API_URL + "admin/searchAdmins",

      // grati support
     QUERIED_USERS: API_URL + "admin/queriedUsers",
     QUERY_STATUS: API_URL + "admin/updateQueryStatus",
     
     // dashboard
   DB_DATA: API_URL + "admin/dashboardData",

  //  user management
   USER_DATA: API_URL + "admin/userManagement",
   DAILY_USER_DATA: API_URL + "admin/dailySignupData",
      
  //  review management
   REV_DATA: API_URL + "admin/reviewManagement",
      
}
export default API;
