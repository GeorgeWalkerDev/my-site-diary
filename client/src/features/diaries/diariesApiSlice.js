import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const diaryAdapter = createEntityAdapter({});

const initialState = diaryAdapter.getInitialState();

export const diaryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiary: builder.query({
      query: () => '/diaries',
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
      transformResponse: (responseData) => {
        const loadedDiary = responseData.map((diary) => {
          diary.id = diary._id;
          return diary;
        });
        return diaryAdapter.setAll(initialState, loadedDiary);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'Diary', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Diary', id })),
          ];
        }
        return [{ type: 'Diary', id: 'LIST' }];
      },
    }),
    addNewDiary: builder.mutation({
      query: (initialDiaryData) => ({
        url: '/diaries',
        method: 'POST',
        body: {
          ...initialDiaryData,
        },
      }),
      invalidatesTags: [{ type: 'Diary', id: 'LIST' }],
    }),
    updateDiary: builder.mutation({
      query: (initialDiaryData) => ({
        url: '/diaries',
        method: 'PATCH',
        body: {
          ...initialDiaryData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Diary', id: arg.id }],
    }),
    deleteDiary: builder.mutation({
      query: ({ id }) => ({
        url: `/diaries`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Diary', id: arg.id }],
    }),
  }),
});

export const {
  useGetDiaryQuery,
  useAddNewDiaryMutation,
  useUpdateDiaryMutation,
  useDeleteDiaryMutation,
} = diaryApiSlice;

// returns the query result object
export const selectDiaryResult = diaryApiSlice.endpoints.getDiary.select();

// creates memoized selector
const selectDiaryData = createSelector(
  selectDiaryResult,
  (diaryResult) => diaryResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllDiary,
  selectById: selectDiaryById,
  selectIds: selectDiaryIds,
  // Pass in a selector that returns the diary slice of state
} = diaryAdapter.getSelectors(
  (state) => selectDiaryData(state) ?? initialState
);
