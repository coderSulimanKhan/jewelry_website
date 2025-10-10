import { Link, NavLink } from "react-router"
import { Sun, Moon } from "lucide-react"

const Navbar = ({ toggleTheme, isDark }) => {
  return (
    // navigation bar starts
    <div className="max-w-[95%] mt-3 pl-10 pr-5 py-2 w-full flex items-center justify-between rounded-full bg-primary backdrop-brightness-150 border border-warning">
      {/* logo starts */}
      <div>
        <Link to={"/"}>
          <img src="/small-logo.png" alt="Logo" className="w-8 rounded" />
        </Link>
      </div>
      {/* logo ends */}
      {/* navigation menu starts */}
      <div>
        <ul className="flex gap-10 text-xl tracking-wider">
          <li className="hover:scale-110 transition active:scale-90 text-warning">
            <NavLink to={"/"} className={({ isActive }) => isActive ? "text-info" : ""}>Home</NavLink>
          </li>
          <li className="hover:scale-110 transition active:scale-90 text-warning">
            <NavLink to={"/all"} className={({ isActive }) => isActive ? "text-info" : ""}>All</NavLink>
          </li>
          <li className="hover:scale-110 transition active:scale-90 text-warning">
            <NavLink to={"/new"} className={({ isActive }) => isActive ? "text-info" : ""}>New</NavLink>
          </li>
          <li className="hover:scale-110 transition active:scale-90 text-warning">
            <NavLink to={"/best"} className={({ isActive }) => isActive ? "text-info" : ""}>Best</NavLink>
          </li>
        </ul>
      </div>
      {/* navigation menu ends */}
      {/* login/profile starts */}
      <div className="flex gap-2">
        <button onClick={toggleTheme} className="myBtn">{isDark ? <Moon /> : <Sun />}</button>
        <Link to={"/login"} className="myBtn">Login</Link>
        {/* <Link to={"/register"} className="px-5 py-2 bg-secondary text-primary rounded-4xl font-bold shadow-xl hover:scale-110 active:scale-90 transition">Register</Link> */}
      </div>
      {/* login/rpofile ends */}
    </div>
    // navigation bar ends
  )
}

export default Navbar