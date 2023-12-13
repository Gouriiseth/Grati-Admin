import { wrappedFetch } from "./urlFunctions";
import API from "./urlConstants";

// Review management page api

export const listRevData = (limit, pageNo) => {
    return wrappedFetch(`${API.REV_DATA}?&limit=${limit}&pageNo=${pageNo}`, "GET");
}