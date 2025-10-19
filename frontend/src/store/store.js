import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/user.slice"
import customerReducer from "./slices/admin/customer.slice"
import employeeReducer from "./slices/admin/employee.slice"
import adminReducer from "./slices/admin/admin.slice"

const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
    employee: employeeReducer,
    admin: adminReducer
  }
});

export { store };