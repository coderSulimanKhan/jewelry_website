import { Plus, Search, X } from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../../store/slices/admin/product.slice.js"
import Product from "../components/product/Product"

const ProductsPage = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const closeSearchBar = () => {
    setIsSearchBarOpen(false);
  }

  const openSearchBar = () => {
    setIsSearchBarOpen(true);
  }
  const [allproducts, setAllProducts] = useState([]);
  const [fProducts, setFProducts] = useState([]);

  const dispatch = useDispatch();
  const { allPloading: loading, allProducts } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
    setAllProducts(allProducts);
  }, [dispatch, allProducts]);

  const handleSearchChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = allproducts.filter(product => {
      if (product.name.toLowerCase().includes(term.toLowerCase())) {
        return product;
      }
    });
    setFProducts(filteredProducts);
  }

  return (
    // products page starts
    <div className="flex flex-col gap-5 p-4 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between">
        <h1 className="adminCardH1">Products</h1>
        <div className="flex gap-2">
          <button className="myAdminBtn" onClick={openSearchBar}><Search className="size-5" />Search</button>
          <Link to={"/admin/dashboard/products/create"} className="myAdminBtn"><Plus className="size-5" />Create</Link>
        </div>
        {
          isSearchBarOpen &&
          <div className="absolute left-1/2 right-4 flex items-center justify-around p-2 bg-primary gap-5">
            <input type="text" value={searchTerm} autoFocus onChange={handleSearchChange} placeholder="Search by name..." className="adminTextField w-full" />
            <Link to={"/admin/dashboard/products"}><X onClick={closeSearchBar} className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
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
                <tr className="text-accent text-sm font-bold">
                  <th className="text-lg p-2">Image</th>
                  <th className="text-lg p-2">Name</th>
                  <th className="p-2">Category</th>
                  <th className="p-2 truncate">Gold Price</th>
                  <th className="p-2">Making</th>
                  <th className="text-sm p-2">Weight</th>
                  <th className="p-2">Wastage</th>
                  <th className="p-2">Polish</th>
                  <th className="text-md p-2">Discount Fee</th>
                  <th className="text-md p-2">Discount Percentage</th>
                  <th className="p-2 truncate">Total Price</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  fProducts.length > 0 && isSearchBarOpen ?
                    fProducts.map(product => (
                      <tr key={product._id} className="border-b">
                        <Product product={product} />
                      </tr>
                    ))
                    :
                    fProducts.length === 0 && isSearchBarOpen ?
                      <tr className="text-xl text-center">
                        <td colSpan={12} className="pt-3">Products not found <Link to={"/admin/dashboard/products/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                      </tr>
                      :
                      allproducts.length > 0 ?
                        allproducts.map(product => (
                          <tr key={product._id} className="border-b">
                            <Product product={product} />
                          </tr>
                        ))
                        :
                        <tr className="text-xl text-center">
                          <td colSpan={12} className="pt-3">Products not found <Link to={"/admin/dashboard/products/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                        </tr>
                }
              </tbody>
            </table>
        }
      </div>
      {/* second section ends */}
    </div >
    // products page ends
  )
}

export default ProductsPage