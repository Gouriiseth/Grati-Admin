import axios from "./axiosConfig";
export async function wrappedFetch(url, method, data, headers, configs) {
    let config = {
        url,
        method,
        data,
        ...configs,
    };
    // console.warn(data);
    // console.warn(config);

    if (headers) config.headers = headers;
    try {

        // console.warn(config.headers);
        return await axios(config);
    } catch (err) {
        // console.warn("Error", err);
        return {
            status: err.response === undefined ? false : err.response.status,
            err,
        };
    }
}
export async function wrappedGet(url, method) {
    let config = {
        url,
        method,
    };
    try {
        return await axios(config);
    } catch (err) {
        console.log("Error", err);
        return {
            status: err.response === undefined ? false : err.response.status,
            err,
        };
    }
}
