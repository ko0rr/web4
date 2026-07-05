import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutUser, updateAccessToken } from "./authSlice";
import { AUTH_SERVICE_URL, GEOMETRY_SERVICE_URL } from "../utils/api-config";

const baseQuery = fetchBaseQuery({
    baseUrl: '',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        headers.set('Content-Type', 'application/json');
        const accessToken = getState().auth.accessToken;
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {

    const isAuthRequest = args.url.includes("/auth");
    const serviceBaseUrl = isAuthRequest ? AUTH_SERVICE_URL : GEOMETRY_SERVICE_URL;
    const fullUrl = `${serviceBaseUrl}${args.url}`;


    let result = await baseQuery({ ...args, url: fullUrl }, api, extraOptions);

    if (isAuthRequest) return result;

    if (result.error && result.error.status === 401) {
        console.log("Access token expired, trying to refresh...");

        const refreshResult = await baseQuery(
            {
                url: `${AUTH_SERVICE_URL}/auth/refresh`,
                method: 'POST'
            },
            api,
            extraOptions
        );

        if (refreshResult.data?.accessToken) {

            api.dispatch(updateAccessToken(refreshResult.data.accessToken));

            result = await baseQuery({ ...args, url: fullUrl }, api, extraOptions);
        } else {

            api.dispatch(logoutUser());
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Points'],
    endpoints: () => ({})
});