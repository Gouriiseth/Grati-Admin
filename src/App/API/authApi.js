
import { wrappedFetch} from "./urlFunctions";
import API from "./urlConstants";

// auth api
export const loginUser = (data) => {
    return wrappedFetch(API.LOGIN_URL, "POST", data);
};

export const forgetPassword = (data) => {
    return wrappedFetch(API.FORGET_PASSWORD, "POST", data);
};

export const otpVerification = (data) => {
    return wrappedFetch(API.OTP_VERIFICATION, "POST", data);
};

export const resetPassword = (data) => {
    return wrappedFetch(API.RESET_PASSWORD, "POST", data);
};

