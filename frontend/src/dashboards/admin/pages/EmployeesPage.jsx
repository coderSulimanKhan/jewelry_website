import { Plus, Search, X } from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllEmployees } from "../../../store/slices/admin/employee.slice.js"
import Employee from "../components/employee/Employee"

const EmployeesPage = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const closeSearchBar = () => {
    setIsSearchBarOpen(false);
  }

  const openSearchBar = () => {
    setIsSearchBarOpen(true);
  }
  const [employees, setEmployees] = useState([]);
  const [fEmployees, setFEmployees] = useState([]);

  const dispatch = useDispatch();
  const { allEloading: loading, allEmployees } = useSelector(state => state.employee);

  useEffect(() => {
    dispatch(getAllEmployees());
    setEmployees(allEmployees);
  }, [dispatch, allEmployees]);

  const handleSearchChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredEmployees = employees.filter(employee => {
      if (employee.name.toLowerCase().includes(term.toLowerCase())) {
        return employee;
      }
    });
    setFEmployees(filteredEmployees);
  }

  return (
    // employee page starts
    <div className="flex flex-col gap-5 p-4 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between">
        <h1 className="adminCardH1">Employees</h1>
        <div className="flex gap-2">
          <button className="myAdminBtn" onClick={openSearchBar}><Search className="size-5" />Search</button>
          <Link to={"/admin/dashboard/employees/create"} className="myAdminBtn"><Plus className="size-5" />Create</Link>
        </div>
        {
          isSearchBarOpen &&
          <div className="absolute left-1/2 right-4 flex items-center justify-around p-2 bg-primary gap-5">
            <input type="text" value={searchTerm} autoFocus onChange={handleSearchChange} placeholder="Search by name..." className="adminTextField w-full" />
            <Link to={"/admin/dashboard/employees"}><X onClick={closeSearchBar} className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
          </div>
        }
      </div>
      <hr className="text-warning" />
      {/* first section ends */}
      {/* second section start */}
      <div className="border border-warning/50 p-3 rounded max-h-[82vh] overflow-y-scroll">
        {
          loading ?
            <div className="loading" /> :
            <table className="w-full">
              <thead className="border-b border-warning/50 p-3 rounded">
                <tr className="text-accent text-lg font-bold">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Orders</th>
                  <th>Cuts</th>
                  <th>Bills</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  fEmployees.length > 0 && isSearchBarOpen ?
                    fEmployees.map(employee => (
                      <tr key={employee._id} className="border-b">
                        <Employee employee={employee} />
                      </tr>
                    ))
                    :
                    fEmployees.length === 0 && isSearchBarOpen ?
                      <tr className="text-xl text-center">
                        <td colSpan={6} className="pt-3">No employees found <Link to={"/admin/dashboard/employees/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                      </tr>
                      :
                      employees.length > 0 ?
                        employees.map(employee => (
                          <tr key={employee._id} className="border-b">
                            <Employee employee={employee} />
                          </tr>
                        ))
                        :
                        <tr className="text-xl text-center">
                          <td colSpan={6} className="pt-3">No employees found <Link to={"/admin/dashboard/employees/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                        </tr>
                }
              </tbody>
            </table>
        }
      </div>
      {/* second section ends */}
    </div >
    // employee page ends
  )
}

export default EmployeesPage