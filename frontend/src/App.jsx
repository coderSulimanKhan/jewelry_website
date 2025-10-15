import { Route, Routes } from "react-router"
import Footer from "./components/common/Footer"
import Navbar from "./components/common/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Profile from "./components/common/Profile"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
// employee dashboard
import EmployeeDashboard from "./dashboards/employee/EmployeeDashboard"
// admin dashboard
import AdminDashboard from "./dashboards/admin/AdminDashboard"
import CustomersPage from "./dashboards/admin/pages/CustomersPage"
import EmployeesPage from "./dashboards/admin/pages/EmployeesPage"
import AdminHomePage from "./dashboards/admin/pages/AdminHomePage"
import ProductsPage from "./dashboards/admin/pages/ProductsPage"
import SalesPage from "./dashboards/admin/pages/SalesPage"
import CutsPage from "./dashboards/admin/pages/CutsPages"
import OrdersPage from "./dashboards/admin/pages/OrdersPage"
import AdminsPage from "./dashboards/admin/pages/AdminsPage"
import BillsPage from "./dashboards/admin/pages/BillsPage"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "./store/slices/user.slice.js"
import CreateCustomer from "./dashboards/admin/components/CreateCustomer.jsx"

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const user = useSelector(state => state.user.user);
  const role = user?.role;
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    dispatch(getMe());
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(p => !p);
  }

  return (
    // landing page starts
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-between bg-linear-to-br from-warning via-primary to-warning transition duration-1000">
        {/* navbar */}
        <Navbar toggleTheme={toggleTheme} isDark={isDark} role={role} />
        <Routes>
          <Route path="/" element={<HomePage role={role} />} />
          <Route path="/login" element={<LoginPage role={role} />} />
          <Route path="/profile" element={<Profile />} />
          {/* routes for employee */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard role={role} />} />
          {/* routes for admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard role={role} />}>
            <Route index element={<AdminHomePage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="customers/create" element={<CreateCustomer />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="cuts" element={<CutsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="bills" element={<BillsPage />} />
          </Route>
        </Routes>
        {/* footer */}
        <Footer />
      </div>
      <ToastContainer position="top-right" toastClassName={"!bg-accent"} />
    </>
    // landing pages ends
  )
}

export default App