import { Link } from "react-router"
import { useSelector } from "react-redux"

const AdminHomePage = () => {
  const { allCustomers } = useSelector(state => state.customer);
  const { allEmployees } = useSelector(state => state.employee);
  const { allAdmins } = useSelector(state => state.admin);
  const customerLength = allCustomers?.length || "--";
  const employeeLength = allEmployees?.length || "--";
  const adminLength = allAdmins?.length || "--";
  return (
    // homepage starts
    <div className="flex flex-col p-2 gap-5 items-center w-full">
      {/* first section starts*/}
      <div className="">
        <h1 className="text-4xl font-bold bg-gradient-to-b from-warning via-warning to-success text-transparent bg-clip-text">Admin Dashboard</h1>
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
            <p className="adminCardP">Total <span className="adminCardSpan">200</span></p>
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