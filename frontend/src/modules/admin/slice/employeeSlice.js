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

const adminEmployeesSlice = createSlice({
    name: 'adminEmployeesList',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successAdminEmployeesReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.data = action.payload.data;
            state.total = action.payload.total;
            state.limit = action.payload.limit;
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
        },
        failedAdminEmployeesReducer: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { successAdminEmployeesReducer, failedAdminEmployeesReducer, loaderListener } = adminEmployeesSlice.actions;

export default adminEmployeesSlice.reducer;