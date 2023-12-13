import { wrappedFetch } from "./urlFunctions";
import API from "./urlConstants";

// manage admin api
export const createSubAdmin = (data) => {
    return wrappedFetch(API.CREATE_SUBADMIN, "POST", data);
}
export const viewAdminDets = (id) => {
    return wrappedFetch(`${API.VIEW_ADMIN_DETS}?_id=${id}`, "GET");

}
export const listAdminDets = (filter,pageNo,limit) => {
    return wrappedFetch(`${API.LIST_ADMIN_DETS}?filter=${filter}&pageNo=${pageNo}&limit=${limit}`, "GET");

}
export const editAdminDets = (data) => {
    return wrappedFetch(API.EDIT_ADMIN_DETS, "PUT",data);
};
export const delAdmin = (data) => {
    return wrappedFetch(API.DEL_ADMIN, "DELETE", data);
};
export const searchAdmin = (fullName) => {
    return wrappedFetch(`${API.SEARCH_ADMIN}?fullName=${fullName}`, "GET");
};
export const blockAdmin = (data) => {
    return wrappedFetch(API.BLOCK_ADMIN, "POST",data);
};