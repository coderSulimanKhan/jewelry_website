import { Layers, LogIn, Settings } from "lucide-react";
import { Link } from "react-router";

const HomePage = ({ role }) => {
  return (
    // homepage starts
    <div className="w-[95%] min-h-[79vh] max-h-[80vh] p-5 bg-primary flex border border-warning rounded-xl items-center justify-center gap-10">
      {/* first section starts */}
      <div className="w-[50%] flex items-center justify-center flex-col gap-5">
        <h1 className="text-7xl text-center bg-gradient-to-r from-accent via-warning to-accent text-transparent bg-clip-text">Jewelry That Speaks Without Words</h1>
        <p className="text-xl text-center">Luxury isn’t just how it looks — it’s how it makes you feel, every time you wear it.</p>
        {/* buttons start */}
        <div className="flex flex-col gap-4 w-fit">
          <Link to={"/all"} className="px-7 py-3 bg-gradient-to-r from-warning to-secondary text-neutral rounded-4xl font-bold shadow-xl hover:scale-110 active:scale-90 transition flex gap-1"><Layers />Explore Collections</Link>
          {
            (role !== "employee" && role !== "admin") &&
            <Link to={"/login"} className="px-7 py-3 bg-gradient-to-r from-warning to-secondary text-neutral rounded-4xl font-bold shadow-xl hover:scale-110 active:scale-90 transition text-center flex gap-1 items-center justify-center"> <LogIn /> Login</Link>
          }
          {
            role === "employee" &&
            <Link to={"/employee/dashboard"} className="px-7 py-3  bg-gradient-to-r from-warning to-secondary text-neutral rounded-4xl font-bold shadow-xl hover:scale-110 active:scale-90 transition text-center flex gap-1 items-center justify-center"><Settings /> Dashboard</Link>
          }
          {
            role === "admin" &&
            <Link to={"/admin/dashboard"} className="px-7 py-3  bg-gradient-to-r from-warning to-secondary text-neutral rounded-4xl font-bold shadow-xl hover:scale-110 active:scale-90 transition text-center flex gap-1 items-center justify-center"><Settings /> Dashboard</Link>
          }
        </div>
        {/* buttons end */}
      </div>
      {/* first section ends */}
    </div>
    // homepage ends
  )
}

export default HomePage