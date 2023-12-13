import { wrappedFetch } from "./urlFunctions";
import API from "./urlConstants";

// Dashboard page api

export const dashboardData = () => {
    return wrappedFetch(API.DB_DATA, "GET");
}