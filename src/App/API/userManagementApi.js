import { wrappedFetch } from "./urlFunctions";
import API from "./urlConstants";

// User management page api

export const listUserData = (limit,pageNo) => {
    return wrappedFetch(`${API.USER_DATA}?&limit=${limit}&pageNo=${pageNo}`,"GET");
}
export const dailyUserData = (limit,pageNo) => {
    return wrappedFetch(`${API.DAILY_USER_DATA}?&limit=${limit}&pageNo=${pageNo}`,"GET");
}