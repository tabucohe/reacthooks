import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'
import Notes1 from './createSlice/Notes1'
import rootReducer from './createSlice/slice'
// import { Notes } from './Notes'

export function App() {

  const store = configureStore({
    reducer: rootReducer
  })
  return (
  //  <Notes/>
  <Provider store={store}>
  <Notes1/>
  </Provider>
  )
}

