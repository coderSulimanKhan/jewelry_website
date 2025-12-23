import { useDispatch, useSelector } from "react-redux";
import { changeStatus, deleteOrder } from "../../../../store/slices/admin/order.slice.js"
import { SquarePen, Trash, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

const Order = ({ order, setOrders, orders, setMyId, setIsViewBoxOpen }) => {
  const [isNoteBoxOpen, setIsNoteBoxOpen] = useState(false);
  const [status, setStatus] = useState(order?.status);
  const dispatch = useDispatch();
  const { isDeleting } = useSelector(state => state.order);

  const handleDeleteCut = async (id) => {
    const { payload: success } = await dispatch(deleteOrder(id));
    if (success) {
      setOrders(orders?.filter(order => order._id !== id));
    };
  }

  const handleViewItems = index => {
    setMyId(index);
  }

  const handleStatusChange = status => {
    setStatus(status);
    dispatch(changeStatus({ id: order?._id, status }));
  }

  return (
    <>
      <td align="center" className="px-2 rounded-2xl text-warning">
        <img src={order?.user?.image || "/avatar.png"} alt={order?.name} className="max-w-20 max-h-20 border border-warning rounded-[100%]" />
        <p className="text-sm">{order?.user?.name || "--"}</p>
        <p className="text-xs">@{order?.user?.username || "--"}</p>
      </td>
      <td align="center" className="px-2 rounded-2xl text-error">
        <img src={order?.createdBy?.image || "/avatar.png"} alt={order?.name} className="max-w-20 max-h-20 border border-warning rounded-[100%]" />
        <p className="text-sm">{order?.createdBy?.name || "--"}</p>
        <p className="text-xs">@{order?.createdBy?.username || "--"}</p>
      </td>
      <td align="center">
        <p className="bg-warning/20 border border-warning text-warning rounded-full w-29 text-sm">{order?.cash + order?.another || "--"} <span className="text-xs text-error">PKR</span></p>
      </td>
      <td align="center">
        <p className="bg-error/20 border border-error text-error rounded-full text-sm w-fit px-2">{order?.isDefaultOrdersDiscounts ? "Yes" : "No"}</p>
      </td>
      <td align="center">
        <button onClick={() => setIsNoteBoxOpen(true)} className="bg-warning/20 text-warning rounded px-2 m-1 font-bold hover:scale-110 active:scale-90 transition"> Note </button>
        {
          isNoteBoxOpen &&
          <div className="absolute inset-0 flex items-center justify-center bg-warning/20">
            <div className="bg-primary text-secondary p-3 rounded-lg shadow-2xl shadow-warning">
              <div className="flex items-center justify-between">
                <h1 className="adminCardH1">Note</h1>
                <X className="size-10 text-warning hover:scale-110 active:scale-90 transition" onClick={() => setIsNoteBoxOpen(false)} />
              </div>
              <p className="font-bold">{order?.note ? order?.note : "Note not found"}</p>
            </div>
          </div>
        }
      </td>
      <td align="center">
        <p className="bg-warning/20 border border-warning text-warning rounded-full px-2 w-29 text-sm">{order?.discountFee || "--"} <span className="text-xs text-error">PKR</span></p>
      </td>
      <td align="center" className="">
        <p className="bg-error/20 border border-error text-error rounded-full w-fit px-2">{order?.discountPer || "--"}%</p>
      </td>
      <td align="center">
        <p className="bg-warning/20 border border-warning text-warning rounded-full px-2 w-29 text-sm">{order?.totalPrice || "--"} <span className="text-xs text-error">PKR</span></p>
      </td>
      <td align="center" className="">
        <p className="bg-error/20 border border-error text-error rounded-full w-29 px-1 text-sm">{order?.remainingFee || "--"} <span className="text-xs text-warning">PKR</span></p>
      </td>
      <td align="center">
        <div className="flex flex-col items-center justify-center gap-1 py-5">
          <button onClick={() => { handleViewItems(order?._id); setIsViewBoxOpen(true) }} className="px-2 bg-warning/20 text-warning rounded hover:scale-110 active:scale-90 transition relative text-xl">View <span className="absolute -top-4 -right-3 text-sm border rounded-full px-1 bg-warning/20">{order?.items?.length == 1 ? "1 Item" : `${order?.items?.length} Items`}</span></button>
          <Link to={`/admin/dashboard/orders/update/${order?._id}`}><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></Link>
          <button onClick={() => handleDeleteCut(order?._id)} disabled={isDeleting}><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></button>
          <select name="status" id="status" className="adminTextField text-xs" value={status} onChange={(e) => handleStatusChange(e.target.value)}>
            <option className="bg-primary" value="processing">Processing</option>
            <option className="bg-primary" value="completed">Completed</option>
            <option className="bg-primary" value="cancelled">Cancelled</option>
          </select>
        </div>
      </td >
    </>
  )
}

export default Order