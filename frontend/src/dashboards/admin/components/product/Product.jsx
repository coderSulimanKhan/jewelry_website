import { useDispatch, useSelector } from "react-redux";
import { deleteProductById } from "../../../../store/slices/admin/product.slice.js"
import { SquarePen, Trash } from "lucide-react";
import { Link } from "react-router";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { isDeleteingProduct } = useSelector(state => state.admin);

  const handleDeleteProduct = id => {
    dispatch(deleteProductById(id));
  }

  const calculateTotalPrice = (p, f, pp) => {
    let totalPrice = 0;
    if (p) {
      totalPrice = p;
    }
    if (f) {
      totalPrice = totalPrice - f;
    }
    if (pp) {
      totalPrice = totalPrice - (pp / 100) * totalPrice;
    }
    return Math.floor(totalPrice);
  }

  return (
    <>
      <td align="center" className="p-2"><img src={product?.images[0] || "/product.png"} alt={product?.name} className="max-w-20 max-h-20 border border-warning rounded-[100%]" /></td>
      <td align="center" className="p-2 flex flex-col items-start">
        <h1 className="adminCardH1">{product?.name}</h1>
        <p className="text-start text-gray-400">{product?.description}</p>
      </td>
      <td align="center"><span className="bg-warning/20 text-warning px-2 py-1 rounded text-lg">{product?.category}</span></td>
      <td align="center"><span className="bg-success/20 text-success rounded text-lg flex items-center justify-center gap-1 mx-2 px-1">{product?.price} <span className="text-xs text-warning">PKR</span> </span></td>
      <td align="center"><span className="bg-warning/20 text-warning rounded text-lg flex items-center justify-center gap-1 mx-2 px-1">{product?.discountFee} <span className="text-xs text-success">PKR</span> </span></td>
      <td align="center"><span className="bg-success/20 text-success rounded text-lg flex items-center justify-center gap-1 mx-2 px-1">{product?.discountPercentage} <span className="text-warning">%</span> </span></td>
      <td align="center"><span className="bg-warning/20 text-warning rounded text-lg flex items-center justify-center gap-1 mx-2 px-1">{calculateTotalPrice(product?.price, product?.discountFee, product?.discountPercentage)} <span className="text-xs text-red-600">PKR</span> </span></td>
      <td align="center" className="p-2"><Link to={`/admin/dashboard/products/update/${product?._id}`}><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></Link></td>
      <td align="center" className="p-2"><button onClick={() => handleDeleteProduct(product?._id)} disabled={isDeleteingProduct}><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></button></td>
    </>
  )
}

export default Product