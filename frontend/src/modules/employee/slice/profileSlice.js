import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    data: [],
    error: [],
}

const employeeProfileSlice = createSlice({
    name: 'employeeProfile',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successEmployeeProfileReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.data = action.payload.data;
        },
        failedEmployeeProfileReducer: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { successEmployeeProfileReducer, failedEmployeeProfileReducer, loaderListener } = employeeProfileSlice.actions;

export default employeeProfileSlice.reducer;