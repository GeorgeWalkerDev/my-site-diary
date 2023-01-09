import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../utils'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl}),
    tagTypes: ['Diary', 'User'],
    endpoints: builder => ({})
})