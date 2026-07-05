import { apiSlice } from "../slice/apiSlice";
import { loginUser, logoutUser } from "../slice/authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        register: build.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials
            })
        }),

        login: build.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(apiSlice.util.resetApiState());
                    dispatch(loginUser({
                        username: arg.username,
                        accessToken: data.accessToken
                    }));
                } catch (e) {
                    console.error("Login failed:", e);
                }
            },
        }),

        logout: build.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } finally {

                    dispatch(logoutUser());
                    dispatch(apiSlice.util.resetApiState());
                }
            }
        }),
    }),
    overrideExisting: false,
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation
} = authApi;