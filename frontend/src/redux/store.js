import { combineReducers, configureStore } from '@reduxjs/toolkit'
// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// auth
import authSlice from '../modules/auth/slice'

// admin
import adminEmployeeSlice from '../modules/admin/slice/employeeSlice';
import adminIssueSlice from '../modules/admin/slice/issueSlice';


// employee
import employeeIssuesSlice from '../modules/employee/slice/issuesSlice';
import employeeProfileSlice from '../modules/employee/slice/profileSlice';

const persistConfig = {
  debug: false,
  key: 'root',
  keyPrefix: 'v.1',
  storage,
  blacklist: [],
  // add reducer name to persist
  whitelist: ['auth']
}

// combine all reducers here
const rootReducer = combineReducers({
  // auth
  auth: authSlice,

  // admin
  employees_admin: adminEmployeeSlice,
  issues_admin: adminIssueSlice,

  // employee
  issues_employee: employeeIssuesSlice,
  profile_employee: employeeProfileSlice,

});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(logger)
});

export const persistor = persistStore(store)