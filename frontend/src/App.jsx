import { Route, Routes } from "react-router"
import Footer from "../components/common/Footer"
import Navbar from "../components/common/Navbar"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import { useEffect, useState } from "react"

const App = () => {
  const [isDark, setIsDark] = useState(false);
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
    <div className="w-full min-h-screen flex flex-col items-center justify-between bg-linear-to-r from-primary via-warning to-primary transition duration-1000">
      {/* navbar */}
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      {/* footer */}
      <Footer />
    </div>
    // landing pages ends
  )
}

export default App