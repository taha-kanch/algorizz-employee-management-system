import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
}

const authmodelSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      const { data } = action.payload
      state.data = data
    }
  }
})
// Action creators are generated for each case reducer function
export const { signin } = authmodelSlice.actions

export default authmodelSlice.reducer
