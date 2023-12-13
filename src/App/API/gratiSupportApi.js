import { wrappedFetch } from "./urlFunctions";
import API from "./urlConstants";

// grati support page api

export const queriedUsers = () => {
    return wrappedFetch(API.QUERIED_USERS, "GET");
}
export const queryStatus = (data) => {
    return wrappedFetch(API.QUERY_STATUS, "PUT", data);
};