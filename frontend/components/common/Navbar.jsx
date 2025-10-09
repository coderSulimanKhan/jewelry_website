import { Link, NavLink } from "react-router"
import {Sun, Moon} from "lucide-react"

const Navbar = ({toggleTheme, isDark}) => {
  return (
    // navigation bar starts
    <div className="max-w-[95%] mt-3 pl-10 pr-5 py-2 w-full flex items-center justify-between rounded-full shadow-2xl backdrop-blur-2xl bg-gradient-to-r from-accent via-neutral to-accent backdrop-brightness-150">
      {/* logo starts */}
      <div>
        <Link to={"/"}>
          <img src="/small-logo.png" alt="Logo" className="w-8 rounded" />
        </Link>
      </div>
      {/* logo ends */}
      {/* navigation menu starts */}
      <div>
        <ul className="flex gap-10 text-secondary text-xl tracking-wider">
          <li>
            <NavLink to={"/"} className={({ isActive }) => isActive ? "text-accent" : "hover:text-info transition"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/all"} className={({ isActive }) => isActive ? "text-accent" : "hover:text-info transition"}>All</NavLink>
          </li>
          <li>
            <NavLink to={"/new"} className={({ isActive }) => isActive ? "text-accent" : "hover:text-info transition"}>New</NavLink>
          </li>
          <li>
            <NavLink to={"/best"} className={({ isActive }) => isActive ? "text-accent" : "hover:text-info transition"}>Best</NavLink>
          </li>
        </ul>
      </div>
      {/* navigation menu ends */}
      {/* login/profile starts */}
      <div className="flex gap-2">
        <button onClick={toggleTheme}  className="px-5 py-2 bg-secondary text-primary rounded-4xl font-bold shadow-xl hover:scale-110 active:scale-90 transition">{isDark ? <Moon /> : <Sun />}</button>
        <Link to={"/login"} className="px-5 py-2 bg-secondary text-primary rounded-4xl font-bold shadow-xl hover:scale-110 active:scale-90 transition">Login</Link>
      </div>
      {/* login/rpofile ends */}
    </div>
    // navigation bar ends
  )
}

export default Navbar