import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer } from "../../../../store/slices/admin/customer.slice.js"
import { SquarePen, Trash } from "lucide-react";

const Customer = ({ customer }) => {
  const dispatch = useDispatch();
  const { loadingDeleteCustomer } = useSelector(state => state.customer);

  const handleDeleteCustomer = id => {
    console.log("Hi i am delete customer");
    dispatch(deleteCustomer(id));
  }

  return (
    <>
      <td align="center" className="p-2"><img src={customer?.image || "/avatar.png"} alt={customer?.name} className="max-w-20 max-h-20 border border-warning rounded-[100%]" /></td>
      <td align="center" className="p-2 adminCardH1">{customer?.name}</td>
      <td align="center"><span className="tableSpan">100</span></td>
      <td align="center"><span className="tableSpan">40</span></td>
      <td align="center"><span className="tableSpan">70</span></td>
      <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
      <td align="center" className="p-2"><button onClick={() => handleDeleteCustomer(customer._id)} disabled={loadingDeleteCustomer}><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></button></td>
    </>
  )
}

export default Customer