// import axios from "axios";
// // import {
// //   //  API_URL,
// //     // AUTHTOKEN,
// //     // AUTHORIZATION_HEADER,
// //     // DEVICE_TOKEN,
// //     // DEVICE_TOKEN_HEADER,
// // } from "./urlConstants";
// // import _ from "lodash";
// const fetchClient = () => {
//     let instance = axios.create({
//         baseURL: "http://52.90.74.171:5000/api/",
//         validateStatus: (status) => {
//             return (
//                 (status >= 200 && status <= 204) ||
//                 status === 401 ||
//                 status === 400 ||
//                 status === 409
//             );
//         },
//     });
    // instance.interceptors.request.use((config) => {
        // const token = localStorage.getItem(AUTHTOKEN);
        // const device_token = localStorage.getItem(DEVICE_TOKEN);

        // if (!_.isEmpty(token)) {
        //     config.headers[AUTHORIZATION_HEADER] = token;
        // }
        // if (!_.isEmpty(device_token)) {
        //     config.headers[DEVICE_TOKEN_HEADER] = device_token;
        // }
    //     return config;
    // });
    // instance.interceptors.response.use((response) => {
        // try {
        //     if (response.data.user_details?.token) {
        //         if (
        //             response.data.user_details.email.isVerified ||
        //             response.data.user_details.phone.isVerified
        //         ) {
                    // const token = response.data.user_details.token;
                    // const device_token = response.data.user_details.device_token;
                //    localStorage.setItem(AUTHTOKEN, token);
                //    localStorage.setItem(DEVICE_TOKEN, device_token);
            //     }
            // }
        //     return response;
        // } catch (err) {
        //     console.log("Error in axiosConfig", err);
        // }
//     });
//     return instance;
// };
// export default fetchClient();


import axios from "axios";
import API from "./urlConstants";
const fetchClient = () => {
    let instance = axios.create();
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem(API.AUTH_TOKEN);
        
        // if (token) config.headers.authorization = token;
        if (token) config.headers[API.AUTHORIZATION_HEADER] = `Bearer ${token}`;
        console.log(token, "tokennnnn")
        return config;
    });
    return instance;
};
export default fetchClient();
