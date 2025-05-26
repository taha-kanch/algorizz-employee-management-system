import React, { Suspense } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { RouterProvider } from 'react-router-dom'
import router from './router/routes'
import { ToastContainer } from 'react-toastify'
import { CircularProgress, ThemeProvider, createTheme } from '@mui/material'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#00538B',
    },
    secondary: {
      main: '#062f2d',
    },
  },
});

function App() {
  return (

    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Suspense fallback={<div className="loding_spinner"> <CircularProgress /></div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </Provider>

  )
}

export default App;