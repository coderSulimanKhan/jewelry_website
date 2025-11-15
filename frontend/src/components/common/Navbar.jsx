import { Link, NavLink } from "react-router"
import { Sun, Moon, Home, Layers, ThumbsUp, Star, LogIn, Settings, UserCircle, ArrowDown, ChevronDown, ChevronLeft, Satellite, User2 } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../store/slices/user.slice"

const Navbar = ({ toggleTheme, isDark, role, image }) => {
  const [isPopOver, setIsPopOver] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const togglePopOver = () => {
    setIsPopOver(p => !p);
  };
  const { isLoggingOut } = useSelector(state => state.user);
  const handleLogout = () => {
    dispatch(logoutUser());
    location.reload();
  }
  return (
    // navigation bar starts
    <div className="max-w-[95%] mt-3 pl-10 pr-5 py-2 w-full flex items-center justify-between rounded-full bg-primary backdrop-brightness-150 border border-warning z-10">
      {/* logo starts */}
      <div>
        <Link to={"/"} className="flex justify-center items-center gap-1">
          <img src="/small-logo.png" alt="Logo" className="w-8 rounded" />
          <p className="w-35 h-9 flex flex-col relative">
            <span className="text-2xl absolute bottom-2 font-bold text-warning">Kohistan</span>
            <span className="absolute left-15 top-5 text-sm text-warning">Jewelers</span>
          </p>
        </Link>
      </div>
      {/* logo ends */}
      {/* navigation menu starts */}
      <div>
        <ul className="flex gap-10 text-xl tracking-wider">
          <li className="hover:scale-110 transition active:scale-90 text-warning">
            <NavLink to={"/"} className={({ isActive }) => isActive ? "text-info flex gap-1" : "flex gap-1"}><Home /> Home</NavLink>
          </li>
          <li className="hover:scale-110 transition active:scale-90 text-warning">
            <NavLink to={"/all"} className={({ isActive }) => isActive ? "text-info flex gap-1" : "flex gap-1"}><Layers />All</NavLink>
          </li>
          <li className="hover:scale-110 transition active:scale-90 text-warning">
            <NavLink to={"/new"} className={({ isActive }) => isActive ? "text-info flex gap-1" : "flex gap-1"}><Star />New</NavLink>
          </li>
          <li className="hover:scale-110 transition active:scale-90 text-warning">
            <NavLink to={"/best"} className={({ isActive }) => isActive ? "text-info flex gap-1" : "flex gap-1"}> <ThumbsUp /> Best</NavLink>
          </li>
          {
            role === "employee" && <li className="hover:scale-110 transition active:scale-90 text-warning">
              <NavLink to={"/employee/dashboard"} className={({ isActive }) => isActive ? "text-info flex gap-1" : "flex gap-1"}> <Settings /> Dashboard</NavLink>
            </li>
          }
          {
            role === "admin" && <li className="hover:scale-110 transition active:scale-90 text-warning">
              <NavLink to={"/admin/dashboard"} className={({ isActive }) => isActive ? "text-info flex gap-1" : "flex gap-1"}> <Settings /> Dashboard</NavLink>
            </li>
          }
        </ul>
      </div>
      {/* navigation menu ends */}
      {/* login/profile starts */}
      <div className="flex gap-2 items-center justify-center">
        <button onClick={toggleTheme} className="myBtn">{isDark ? <Moon /> : <Sun />}</button>
        {
          (role !== "employee" && role !== "admin") &&
          <Link to={"/login"} className="myBtn"> <LogIn /> Login</Link>
        }
        {
          (role === "employee" || role === "admin") &&
          <div onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)} className="cursor-pointer transition duration-1000">
            <div onClick={togglePopOver} className="flex items-center justify-center rounded-full">
              <img src={image} alt="profile" className="cursor-pointer w-13 rounded-full border border-warning" />
              {
                isPopOver ?
                  <ChevronDown className={`${isHover || isPopOver ? "opacity-100 text-warning" : "opacity-0"}`} />
                  :
                  <ChevronLeft className={`${isHover ? "opacity-100 text-warning" : "opacity-0"}`} />
              }
            </div>
            {
              isPopOver &&
              <div className="absolute flex flex-col bg-primary p-2 gap-2 rounded mt-2 text-lg border border-warning">
                <Link onClick={() => setIsPopOver(false)} className="text-warning flex gap-2 p-1 hover:scale-110 active:scale-90 transition cursor-pointer text-sm font-bold" to={"/profile"}><User2 className="size-5" /> Profile </Link>
                <hr className="text-warning" />
                <button disabled={isLoggingOut} onClick={handleLogout} className="text-warning flex gap-2 p-1 hover:scale-110 active:scale-90 transition cursor-pointer text-sm font-bold">
                  {
                    isLoggingOut ? <div className="loading" /> : <><LogIn className="rotate-180 size-5" /> Logout</>
                  }
                </button>
              </div>
            }
          </div>
        }
        {/* <Link to={"/register"} className="px-5 py-2 bg-secondary text-primary rounded-4xl font-bold shadow-xl hover:scale-110 active:scale-90 transition">Register</Link> */}
      </div>
      {/* login/rpofile ends */}
    </div>
    // navigation bar ends
  )
}

export default Navbar