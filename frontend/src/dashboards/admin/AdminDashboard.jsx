import { Outlet } from "react-router"
import SideBar from "./components/SideBar"

const AdminDashboard = ({ role }) => {
  if (role !== "admin") {
    return <div>Only for admins</div>
  }

  return (
    // admin dashboard starts
    <div className="absolute w-screen h-screen bg-primary z-10 inset-0 flex gap-2">
      <SideBar />
      <Outlet />
    </div>
    // admin dashboard ends
  )
}

export default AdminDashboard