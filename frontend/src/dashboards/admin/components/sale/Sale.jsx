import { useDispatch, useSelector } from "react-redux";
import { deleteSale } from "../../../../store/slices/admin/sale.slice.js";
import { SquarePen, Trash } from "lucide-react";
import { Link } from "react-router";

const Sale = ({ sale, setSales, sales, setMyId, setIsViewBoxOpen }) => {
    const dispatch = useDispatch();
    const { isDeleting } = useSelector(state => state.sale);

    const handleDeleteSale = async (id) => {
        const { payload: success } = await dispatch(deleteSale(id));
        if (success) {
            setSales(sales.filter(sale => sale._id !== id));
        };
    }

    const handleViewItems = index => {
        setMyId(index);
    }

    return (
        <>
            <td align="center" className="px-2 rounded-2xl text-warning">
                <img src={sale?.user?.image || "/avatar.png"} alt={sale?.name} className="max-w-20 max-h-20 border border-warning rounded-[100%]" />
                <p className="text-sm">{sale?.user?.name || "--"}</p>
                <p className="text-xs">@{sale?.user?.username || "--"}</p>
            </td>
            <td align="center" className="px-2 rounded-2xl text-error">
                <img src={sale?.createdBy?.image || "/avatar.png"} alt={sale?.name} className="max-w-20 max-h-20 border border-warning rounded-[100%]" />
                <p className="text-sm">{sale?.createdBy?.name || "--"}</p>
                <p className="text-xs">@{sale?.createdBy?.username || "--"}</p>
            </td>
            <td align="center">
                <p className="bg-warning/20 border border-warning text-warning rounded-full w-29 text-sm">{sale?.cash + sale?.another || "--"} <span className="text-xs text-error">PKR</span></p>
            </td>
            <td align="center">
                <p className="bg-error/20 border border-error text-error rounded-full text-sm w-fit px-2">{sale?.isDefaultProductsDiscounts ? "Yes" : "No"}</p>
            </td>
            <td align="center">
                <p className="bg-warning/20 border border-warning text-warning rounded-full px-2 w-29 text-sm">{sale?.discountFee || "--"} <span className="text-xs text-error">PKR</span></p>
            </td>
            <td align="center" className="">
                <p className="bg-error/20 border border-error text-error rounded-full w-fit px-2">{sale?.discountPercentage || "--"}%</p>
            </td>
            <td align="center">
                <p className="bg-warning/20 border border-warning text-warning rounded-full px-2 w-29 text-sm mx-5">{sale?.totalPrice || "--"} <span className="text-xs text-error">PKR</span></p>
            </td>
            <td align="center" className="">
                <p className="bg-error/20 border border-error text-error rounded-full w-29 px-1 text-sm">{sale?.remainingFee || "--"} <span className="text-xs text-warning">PKR</span></p>
            </td>
            <td align="center">
                <div className="flex flex-col items-center justify-center gap-1 py-5">
                    <button onClick={() => { handleViewItems(sale?._id); setIsViewBoxOpen(true) }} className="px-2 bg-warning/20 text-warning rounded hover:scale-110 active:scale-90 transition relative text-xl">View <span className="absolute -top-4 -right-3 text-sm border rounded-full px-1 bg-warning/20">{sale?.items?.length == 1 ? "1 Item" : `${sale?.items?.length} Items`}</span></button>
                    <Link to={`/admin/dashboard/sales/update/${sale?._id}`}><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></Link>
                    <button onClick={() => handleDeleteSale(sale?._id)} disabled={isDeleting}><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></button>
                </div>
            </td >
        </>
    )
}

export default Sale