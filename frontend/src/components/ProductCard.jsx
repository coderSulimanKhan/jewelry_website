import { useState } from "react";
import { calculateTotalPrice } from "../utils/calculatePrice.js"
import { giveMeDiscount } from "../utils/giveMeDiscount.js";

const ProductCard = ({ product }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const currency = "PKR";
  console.log(product);
  return (
    // product card starts
    <div onMouseOver={() => setIsMouseOver(true)} onMouseOut={() => setIsMouseOver(false)} className="flex flex-col border border-warning p-1 rounded myCardShadow relative">
      <span className={`absolute -left-1 -top-1 bg-red-900 text-success rounded border border-success ${!isMouseOver ? "p-1" : "opacity-0"}`}>{giveMeDiscount(product)}</span>
      <div className={`capitalize flex justify-evenly pb-1 transition-all ${isMouseOver ? "opacity-100 h-8" : "opacity-0 h-0"}`}>
        <p className="productCardTag">{product?.category}</p>
        <p className="productCardTag">{product?.material}</p>
        <p className="productCardTag">{product?.color}</p>
        <p className="productCardTag">{!product?.stock ? "sold out" : product?.stock + " left"}</p>
      </div>
      <img className="h-[35vh] object-cover rounded" src={product?.images[0] || "/product.png"} alt={product?.name || "product image"} />
      <div>
        <div className="flex justify-between items-center p-1">
          <h1 className="text-lg font-bold text-warning">{product?.name || ""}</h1>
          <p><span className="text-success bg-success/20 rounded-full px-1 border">{calculateTotalPrice(product?.price, product?.discountFee, product?.discountPercentage)}<span className="text-xs text-warning">{currency}</span></span><span className="text-red-500 text-xs line-through">{product?.price}</span></p>
        </div>
        <p className="text-sm text-accent">{product?.description || ""}</p>
      </div>
      <div className={`capitalize flex justify-evenly transition-all border-t border-error ${isMouseOver ? "opacity-100 h-10 pt-2 mt-1" : "opacity-0 h-0"}`}>
        <p className="flex justify-center items-center gap-2">
          <span className="text-warning bg-warning/20 rounded text-sm py-1 px-2">{product?.weight?.value + product?.weight?.unit}</span>
          <span className="text-warning bg-warning/20 rounded text-sm py-1 px-2">{product?.size?.value + product?.size?.unit}</span>
        </p>
      </div>
    </div>
    // product card ends
  )
}

export default ProductCard