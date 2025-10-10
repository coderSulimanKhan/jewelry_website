import { Route, Routes } from "react-router"
import Footer from "../components/common/Footer"
import Navbar from "../components/common/Navbar"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
// import RegisterPage from "../pages/RegisterPage"
import { useEffect, useState } from "react"

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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {/* footer */}
      <Footer />
    </div>
    // landing pages ends
  )
}

export default App