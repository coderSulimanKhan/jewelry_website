import { useDispatch, useSelector } from "react-redux";
import { deleteProductById } from "../../../../store/slices/admin/product.slice.js"
import { SquarePen, Trash } from "lucide-react";
import { Link } from "react-router";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { isDeleteingProduct } = useSelector(state => state.admin);
  const { gold_t } = useSelector(state => state.rate);
  let goldPrice;

  const handleDeleteProduct = id => {
    dispatch(deleteProductById(id));
  }

  const calculateTotalPrice = (f, pp, m) => {
    let totalPrice = 0;
    if (goldPrice) {
      totalPrice += goldPrice;
    }
    if (m) {
      totalPrice += m;
    }
    if (f) {
      totalPrice = totalPrice - f;
    }
    if (pp) {
      totalPrice = totalPrice - (pp / 100) * totalPrice;
    }

    return Math.floor(totalPrice);
  }

  const bestName = name => {
    if (name?.length > 11) {
      let n = name?.split("");
      let an = [];
      for (let i = 0; i < 10; i++) {
        an.push(n[i]);
      };
      return an.join("") + "... ";
    } else {
      return name;
    };
  };

  const calculateGoldPrice = (w, ws, po) => {
    const pricePerGram = gold_t / 11.6638;
    let totalWeight = 0;
    if (w) {
      totalWeight += w;
    };
    if (ws) {
      totalWeight -= ws;
    };
    if (po) {
      totalWeight += po;
    };
    goldPrice = Math.round(totalWeight * pricePerGram);
    return Math.round(totalWeight * pricePerGram);
  };

  return (
    <>
      <td align="center" className="py-1"><img src={product?.images[0] || "/product.png"} alt={product?.name} className="max-w-20 max-h-20 border border-warning rounded-[100%]" /></td>
      <td align="center" className="px-1 text-center">
        <h1 className="text-lg font-bold text-warning truncate">{bestName(product?.name)}</h1>
      </td>
      <td align="center"><span className="bg-warning/20 text-warning px-1 py-1 rounded text-sm">{product?.category}</span></td>
      <td align="center"><span className="bg-success/20 text-success rounded text-sm flex items-center justify-center gap-1 mx-1 px-1">{calculateGoldPrice(product?.weight.value, product?.wastage, product?.polish) || "--"} <span className="text-xs text-warning">PKR</span> </span></td>
      <td align="center"><span className="bg-warning/20 text-warning rounded text-sm flex items-center justify-center gap-1 mx-1 px-1">{product?.making || "--"} <span className="text-xs text-success">PKR</span> </span></td>
      <td align="center"><span className="bg-success/20 text-success rounded text-sm flex items-center justify-center gap-1 mx-1 px-1">{product?.weight.value || "--"} <span className="text-xs text-warning">g</span> </span></td>
      <td align="center"><span className="bg-warning/20 text-warning rounded text-sm flex items-center justify-center gap-1 mx-1 px-1">{product?.wastage || "--"} <span className="text-xs text-success">g</span> </span></td>
      <td align="center"><span className="bg-success/20 text-success rounded text-sm flex items-center justify-center gap-1 mx-1 px-1">{product?.polish || "--"} <span className="text-xs text-warning">g</span> </span></td>
      <td align="center"><span className="bg-warning/20 text-warning rounded text-sm flex items-center justify-center gap-1 mx-1 px-1">{product?.discountFee || "--"} <span className="text-xs text-success">PKR</span> </span></td>
      <td align="center"><span className="bg-success/20 text-success rounded text-sm flex items-center justify-center gap-1 mx-1 px-1">{product?.discountPercentage || "--"} <span className="text-warning">%</span> </span></td>
      <td align="center"><span className="bg-warning/20 text-warning rounded text-sm flex items-center justify-center gap-1 mx-1 px-1">{calculateTotalPrice(product?.discountFee, product?.discountPercentage, product?.making)} <span className="text-xs text-red-600">PKR</span> </span></td>
      <td align="center" className="p-1"><Link to={`/admin/dashboard/products/update/${product?._id}`}><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></Link></td>
      <td align="center" className="p-1"><button onClick={() => handleDeleteProduct(product?._id)} disabled={isDeleteingProduct}><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 mt-1 rounded hover:scale-110 active:scale-90 transition" /></button></td>
    </>
  )
}

export default Product