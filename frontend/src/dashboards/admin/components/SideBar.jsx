import { Settings } from "lucide-react"
import { Link, NavLink } from "react-router"

const SideBar = () => {
  return (
    // sidebar starts
    <div className="w-5/25 bg-primary border-r border-warning shadow-lg shadow-warning h-screen flex flex-col gap-8 p-4">
      {/* admin header starts */}
      <div>
        <Link to={"/admin/dashboard"}>
          <h1 className="text-3xl flex items-center gap-2 font-bold text-warning"><Settings />Dashboard <span className="text-xs font-normal bg-green-300/20 text-accent p-1 rounded-full">Admin</span></h1>
        </Link>
      </div>
      {/* admin header ends */}
      {/* siderbar links starts */}
      <ul className="flex flex-col gap-4">
        <NavLink to={"/"} className={({ isActive }) => isActive ? "bg-success/20 text-warning p-2 rounded text-xl" : "bg-warning/15 text-warning p-2 rounded text-xl hover:scale-110 active:scale-90 transition"}>
          <span className="font-bold">Shop</span>
        </NavLink>
        <NavLink to={"/admin/dashboard/customers"} className={({ isActive }) => isActive ? "bg-success/20 text-warning p-2 rounded text-xl" : "bg-warning/15 text-warning p-2 rounded text-xl hover:scale-110 active:scale-90 transition"}>
          Manage <span className="font-bold">Customers</span>
        </NavLink>
        <NavLink to={"/admin/dashboard/employees"} className={({ isActive }) => isActive ? "bg-success/20 text-warning p-2 rounded text-xl" : "bg-warning/15 text-warning p-2 rounded text-xl hover:scale-110 active:scale-90 transition"}>
          Manage <span className="font-bold">Employees</span>
        </NavLink>
        <NavLink to={"/admin/dashboard/products"} className={({ isActive }) => isActive ? "bg-success/20 text-warning p-2 rounded text-xl" : "bg-warning/15 text-warning p-2 rounded text-xl hover:scale-110 active:scale-90 transition"}>
          Manage <span className="font-bold">Products</span>
        </NavLink>
        <NavLink to={"/admin/dashboard/sales"} className={({ isActive }) => isActive ? "bg-success/20 text-warning p-2 rounded text-xl" : "bg-warning/15 text-warning p-2 rounded text-xl hover:scale-110 active:scale-90 transition"}>
          Manage <span className="font-bold">Sales</span>
        </NavLink>
        <NavLink to={"/admin/dashboard/cuts"} className={({ isActive }) => isActive ? "bg-success/20 text-warning p-2 rounded text-xl" : "bg-warning/15 text-warning p-2 rounded text-xl hover:scale-110 active:scale-90 transition"}>
          Manage <span className="font-bold">Cuts</span>
        </NavLink>
        <NavLink to={"/admin/dashboard/orders"} className={({ isActive }) => isActive ? "bg-success/20 text-warning p-2 rounded text-xl" : "bg-warning/15 text-warning p-2 rounded text-xl hover:scale-110 active:scale-90 transition"}>
          Manage <span className="font-bold">Orders</span>
        </NavLink>
        <NavLink to={"/admin/dashboard/admins"} className={({ isActive }) => isActive ? "bg-success/20 text-warning p-2 rounded text-xl" : "bg-warning/15 text-warning p-2 rounded text-xl hover:scale-110 active:scale-90 transition"}>
          Manage <span className="font-bold">Admins</span>
        </NavLink>
        <NavLink to={"/admin/dashboard/bills"} className={({ isActive }) => isActive ? "bg-success/20 text-warning p-2 rounded text-xl" : "bg-warning/15 text-warning p-2 rounded text-xl hover:scale-110 active:scale-90 transition"}>
          Manage <span className="font-bold">Bills</span>
        </NavLink>
      </ul>
      {/* sidebar links ends */}
    </div>
    // sidebar ends
  )
}

export default SideBar