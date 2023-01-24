import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = 'https://flick-it-take-data-4nyk6wb3ua-ew.a.run.app/v1/'

const createRequest = (url) => ({url})

export const flickitApi = createApi({
    reducerPath: 'flickitApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: 'register',
                method: 'POST',
                body
            })
        }),
        uploadFlick: builder.mutation({
            query : (body) => ({
                url: `upload/${body.userId}`,
                method: 'POST',
                body
            })
        }),
        getAllUsers: builder.query({
            query : () => createRequest('users')
        })
    })
})

export const {
    useRegisterUser,
    useUploadFlick,
    useGetAllUsers
} = flickitApi
