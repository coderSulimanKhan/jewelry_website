import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/admin/product.slice";

const BestProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const { allProducts, allPLoading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  
  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [setFilteredProducts, allProducts]);
  
  if(allPLoading) return <div className="loading"/>;
  return (
    // all products page starts
    <div className="w-[95%] min-h-[79vh] overflow-y-scroll max-h-[80vh] p-5 bg-primary grid grid-cols-3 items-start justify-center border border-warning rounded-xl gap-10">
      {
        filteredProducts?.length > 0 ?
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
          : <p>Pruducts not found</p>
      }
    </div>
    // all products page ends
  )
}

export default BestProductsPage