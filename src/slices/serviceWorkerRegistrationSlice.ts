import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceWorkerRegistrationSliceState {
  serviceWorkerRegistered: boolean;
  serviceWorkerUpdated: boolean;
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}

export const serviceWorkerRegistrationSliceInitialState: ServiceWorkerRegistrationSliceState = {
  serviceWorkerRegistered: false,
  serviceWorkerUpdated: false,
};

const slice = createSlice({
  name: "serviceWorkerRegistration",
  initialState: serviceWorkerRegistrationSliceInitialState,
  reducers: {
    success(
      state,
      action: PayloadAction<ServiceWorkerRegistration>
    ) {
      const serviceWorkerRegistration = action.payload;
      state.serviceWorkerRegistered = true;
      state.serviceWorkerRegistration = serviceWorkerRegistration;
    },
    update(state, action: PayloadAction<ServiceWorkerRegistration>) {
      state.serviceWorkerUpdated = !state.serviceWorkerUpdated;
      state.serviceWorkerRegistration = action.payload;
    },
  },
});

export const { success: successfulRegistration, update: updateAvailable } = slice.actions;

export default slice.reducer;
