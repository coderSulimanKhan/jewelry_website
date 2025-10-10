import { Route, Routes } from "react-router"
import Footer from "../components/common/Footer"
import Navbar from "../components/common/Navbar"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import Profile from "../components/common/Profile"
import { useEffect, useState } from "react"
// employee dashboard
import EmployeeDashboard from "../dashboards/employee/EmployeeDashboard"
// admin dashboard
import AdminDashboard from "../dashboards/admin/AdminDashboard"

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const role = "general";
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    // document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(p => !p);
  }

  return (
    // landing page starts
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
        <Route path="/admin/dashboard" element={<AdminDashboard role={role} />} />
      </Routes>
      {/* footer */}
      <Footer />
    </div>
    // landing pages ends
  )
}

export default App