import { useDispatch, useSelector } from "react-redux";
import { deleteAdmin } from "../../../../store/slices/admin/admin.slice.js"
import { SquarePen, Trash } from "lucide-react";
import { Link } from "react-router";

const Admin = ({ admin }) => {
  const dispatch = useDispatch();
  const { loadingDeleteAdmin } = useSelector(state => state.admin);

  const handleDeleteAdmin = id => {
    dispatch(deleteAdmin(id));
  }

  return (
    <>
      <td align="center" className="p-2"><img src={admin?.image || "/avatar.png"} alt={admin?.name} className="max-w-20 max-h-20 border border-warning rounded-[100%]" /></td>
      <td align="center" className="p-2 adminCardH1">{admin?.name}</td>
      <td align="center"><span className="tableSpan">100</span></td>
      <td align="center"><span className="tableSpan">40</span></td>
      <td align="center"><span className="tableSpan">70</span></td>
      <td align="center" className="p-2"><Link to={`/admin/dashboard/admins/update/${admin?._id}`}><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></Link></td>
      <td align="center" className="p-2"><button onClick={() => handleDeleteAdmin(admin?._id)} disabled={loadingDeleteAdmin}><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></button></td>
    </>
  )
}

export default Admin