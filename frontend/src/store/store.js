import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/user.slice"
import customerReducer from "./slices/admin/customer.slice"
import employeeReducer from "./slices/admin/employee.slice"
import adminReducer from "./slices/admin/admin.slice"
import productReducer from "./slices/admin/product.slice"
import saleReducer from "./slices/admin/sale.slice"
import cutReducer from "./slices/admin/cut.slice"
import orderReduer from "./slices/admin/order.slice"
import rateReducer from "./slices/rate.slice.js"

const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
    employee: employeeReducer,
    admin: adminReducer,
    product: productReducer,
    sale: saleReducer,
    cut: cutReducer,
    order: orderReduer,
    rate: rateReducer,
  }
});

export { store };