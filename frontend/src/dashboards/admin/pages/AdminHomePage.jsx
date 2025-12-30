import { Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { updateRate } from "../../../store/slices/rate.slice";

const AdminHomePage = () => {
  const { allCustomers } = useSelector(state => state.customer);
  const { allEmployees } = useSelector(state => state.employee);
  const { allAdmins } = useSelector(state => state.admin);
  const { allProducts } = useSelector(state => state.product);
  const customerLength = allCustomers?.length || "--";
  const employeeLength = allEmployees?.length || "--";
  const adminLength = allAdmins?.length || "--";
  const productLength = allProducts?.length || "--";
  const { gold_t: rate } = useSelector(state => state.rate);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [isRateFormOpen, setIsRateFormOpen] = useState(false);
  const [todayRate, setTodayRate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setTodayRate(rate);
  }, [rate])

  const handleMouseOver = () => {
    setIsUpdateVisible(true);
  }
  const handleMouseOut = () => {
    setIsUpdateVisible(false);
  }
  const handleRateDone = () => {
    dispatch(updateRate(todayRate));
    setIsRateFormOpen(false);
  }
  return (
    // homepage starts
    <div className="flex flex-col p-2 gap-5 items-center w-full">
      {/* first section starts*/}
      <div className="flex justify-around items-center w-full">
        <h1 className="text-4xl font-bold bg-gradient-to-b from-warning to-warning/30 text-transparent bg-clip-text">Admin Dashboard</h1>
        <div className="flex gap-1" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <span className="font-extrabold text-warning">Market Rate</span>
          <span className="px-2 bg-error/20 text-error rounded-full">{todayRate || 0}</span>
          {
            isUpdateVisible &&
            <button onClick={() => setIsRateFormOpen(true)} className="bg-warning/20 text-warning rounded-full px-2 hover:scale-110 active:scale-90 transition">Update</button>
          }
        </div>
        {
          isRateFormOpen &&
          <div className="flex gap-2">
            <input type="number" value={todayRate} className="adminTextField w-50" min={1} max={1_000_000} placeholder="Enter value..." onChange={(e) => setTodayRate(e?.target?.value)} />
            <button onClick={handleRateDone} className="bg-warning/20 text-warning rounded-full px-4 hover:scale-110 active:scale-90 transition">Done</button>
          </div>
        }
      </div>
      {/* first sections ends */}
      {/* second section starts */}
      <div className="grid grid-cols-3 p-10 gap-10 w-full h-screen items-center justify-center">
        <Link to={"/admin/dashboard/customers"} className="adminCardLink">
          <div className="adminCardInsideDiv">
            <h1 className="adminCardH1">Customers</h1>
            <p className="adminCardP">Total <span className="adminCardSpan">{customerLength}</span></p>
          </div>
        </Link>
        <Link to={"/admin/dashboard/employees"} className="adminCardLink">
          <div className="adminCardInsideDiv">
            <h1 className="adminCardH1">Employees</h1>
            <p className="adminCardP">Total <span className="adminCardSpan">{employeeLength}</span></p>
          </div>
        </Link>
        <Link to={"/admin/dashboard/admins"} className="adminCardLink">
          <div className="adminCardInsideDiv">
            <h1 className="adminCardH1">Admins</h1>
            <p className="adminCardP">Total <span className="adminCardSpan">{adminLength}</span></p>
          </div>
        </Link>
        <Link to={"/admin/dashboard/products"} className="adminCardLink">
          <div className="adminCardInsideDiv">
            <h1 className="adminCardH1">Products</h1>
            <p className="adminCardP">Total <span className="adminCardSpan">{productLength}</span></p>
          </div>
        </Link>
        <Link to={"/"} className="adminCardLink">
          <h1 className="adminCardH1">Shop</h1>
        </Link>
        <Link to={"/admin/dashboard/sales"} className="adminCardLink">
          <div className="adminCardInsideDiv">
            <h1 className="adminCardH1">Sales</h1>
            <p className="adminCardP">Total <span className="adminCardSpan">10</span></p>
          </div>
        </Link>
        <Link to={"/admin/dashboard/cuts"} className="adminCardLink">
          <div className="adminCardInsideDiv">
            <h1 className="adminCardH1">Cuts</h1>
            <p className="adminCardP">Total <span className="adminCardSpan">30</span></p>
          </div>
        </Link>
        <Link to={"/admin/dashboard/orders"} className="adminCardLink">
          <div className="adminCardInsideDiv">
            <h1 className="adminCardH1">Orders</h1>
            <p className="adminCardP">Total <span className="adminCardSpan">50</span></p>
          </div>
        </Link>
        <Link to={"/admin/dashboard/bills"} className="adminCardLink">
          <div className="adminCardInsideDiv">
            <h1 className="adminCardH1">Bills</h1>
            <p className="adminCardP">Total <span className="adminCardSpan">80</span></p>
          </div>
        </Link>
      </div>
      {/* second section ends */}
    </div>
    // homepage ends
  )
}

export default AdminHomePage