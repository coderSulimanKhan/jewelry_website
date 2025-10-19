import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../../../../store/slices/admin/employee.slice.js"
import { SquarePen, Trash } from "lucide-react";
import { Link } from "react-router";

const Employee = ({ employee }) => {
  const dispatch = useDispatch();
  const { loadingDeleteEmployee } = useSelector(state => state.employee);

  const handleDeleteCustomer = id => {
    dispatch(deleteEmployee(id));
  }

  return (
    <>
      <td align="center" className="p-2"><img src={employee?.image || "/avatar.png"} alt={employee?.name} className="max-w-20 max-h-20 border border-warning rounded-[100%]" /></td>
      <td align="center" className="p-2 adminCardH1">{employee?.name}</td>
      <td align="center"><span className="tableSpan">100</span></td>
      <td align="center"><span className="tableSpan">40</span></td>
      <td align="center"><span className="tableSpan">70</span></td>
      <td align="center" className="p-2"><Link to={`/admin/dashboard/employees/update/${employee._id}`}><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></Link></td>
      <td align="center" className="p-2"><button onClick={() => handleDeleteCustomer(employee._id)} disabled={loadingDeleteEmployee}><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></button></td>
    </>
  )
}

export default Employee