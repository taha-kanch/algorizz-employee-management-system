import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    data: [],
    error: [],
}

const employeeIssuesSlice = createSlice({
    name: 'employeeIssuesList',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successEmployeeIssuesReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.data = action.payload.data;
        },
        failedEmployeeIssuesReducer: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { successEmployeeIssuesReducer, failedEmployeeIssuesReducer, loaderListener } = employeeIssuesSlice.actions;

export default employeeIssuesSlice.reducer;