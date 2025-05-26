import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    data: [],
    error: [],
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0
}

const adminIssuesSlice = createSlice({
    name: 'adminIssuesList',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successAdminIssuesReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.data = action.payload.data;
            state.total = action.payload.total;
            state.limit = action.payload.limit;
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
        },
        failedAdminIssuesReducer: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { successAdminIssuesReducer, failedAdminIssuesReducer, loaderListener } = adminIssuesSlice.actions;

export default adminIssuesSlice.reducer;