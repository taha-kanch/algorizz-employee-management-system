import React from 'react'
import { CircularProgress } from '@mui/material'
const Loader = () => {
  return (
    <div className="loader_screen">
      <div className="loaderprogress">
        <CircularProgress />
      </div>
    </div>
  )
}

export default Loader
