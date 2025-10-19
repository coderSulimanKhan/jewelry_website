import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/user.slice"
import customerReducer from "./slices/admin/customer.slice"
import employeeReducer from "./slices/admin/employee.slice"

const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
    employee: employeeReducer
  }
});

export { store };