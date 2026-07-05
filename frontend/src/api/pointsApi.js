import { apiSlice } from "../slice/apiSlice";

export const pointsApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getPoints: build.query({
            query: () => ({
                url: '/points',
                method: 'GET'
            }),
            providesTags: ['Points']
        }),

        addPoint: build.mutation({
            query: (coordinates) => ({
                url: '/points',
                method: 'POST',
                body: { ...coordinates }
            }),

            invalidatesTags: ['Points'],

            async onQueryStarted(coordinates, { dispatch, queryFulfilled }) {
                try {
                    const { data: newPoint } = await queryFulfilled;


                    dispatch(
                        pointsApi.util.updateQueryData('getPoints', undefined, (draft) => {
                            if (Array.isArray(draft)) {
                                draft.unshift(newPoint);
                            }
                        })
                    );
                } catch (error) {
                    console.error("Error adding point:", error);
                }
            }
        })
    }),
    overrideExisting: false,
});

export const {
    useGetPointsQuery,
    useAddPointMutation
} = pointsApi;