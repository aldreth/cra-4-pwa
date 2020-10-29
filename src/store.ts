import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import serviceWorkerRegistrationSliceReducer from './slices/serviceWorkerRegistrationSlice'
const store = configureStore({
  reducer: {
    serviceWorkerRegistration: serviceWorkerRegistrationSliceReducer

  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store