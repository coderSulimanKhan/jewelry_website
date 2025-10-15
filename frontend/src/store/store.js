import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/user.slice"
import customerReducer from "./slices/admin/customer.slice"

const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer
  }
});

export { store };