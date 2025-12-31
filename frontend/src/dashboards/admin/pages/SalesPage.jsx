import { Plus, Search, X } from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSales } from "../../../store/slices/admin/sale.slice.js"
import Sale from "../components/sale/Sale"

const SalesPage = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewBoxOpen, setIsViewBoxOpen] = useState(false);
  const [myId, setMyId] = useState("");
  const [sale, setSale] = useState(null);

  const closeSearchBar = () => {
    setIsSearchBarOpen(false);
  }

  const openSearchBar = () => {
    setIsSearchBarOpen(true);
  }
  const [sales, setSales] = useState([]);
  const [fSales, setFSales] = useState([]);

  const dispatch = useDispatch();
  const { getting: loading, allSales } = useSelector(state => state.sale);

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  useEffect(() => {
    setSales(allSales);
    console.log(sales);
  }, [allSales]);

  useEffect(() => {
    setSale(sales.filter(sale => sale._id === myId));
  }, [myId, setMyId, sales]);

  const handleSearchChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredSales = sales.filter(sale => {
      if (sale.user.name.toLowerCase().includes(term.toLowerCase())) {
        return sale;
      }
    });
    setFSales(filteredSales);
  }

  return (
    // admins page starts
    <div className="flex flex-col gap-5 p-4 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between">
        <h1 className="adminCardH1">Sales</h1>
        <div className="flex gap-2">
          <button className="myAdminBtn" onClick={openSearchBar}><Search className="size-5" />Search</button>
          <Link to={"/admin/dashboard/sales/create"} className="myAdminBtn"><Plus className="size-5" />Create</Link>
        </div>
        {
          isSearchBarOpen &&
          <div className="absolute left-1/2 right-4 flex items-center justify-around p-2 bg-primary gap-5">
            <input type="text" value={searchTerm} autoFocus onChange={handleSearchChange} placeholder="Search by user name..." className="adminTextField w-full" />
            <Link to={"/admin/dashboard/sales"}><X onClick={closeSearchBar} className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
          </div>
        }
      </div>
      <hr className="text-warning" />
      {/* first section ends */}
      {/* second section start */}
      <div className="border border-warning/50 p-3 rounded max-h-[82vh] max-w-[76vw] overflow-y-scroll overflow-x-hidden">
        {
          loading ?
            <div className="loading" /> :
            <table className="w-full">
              <thead className="border-b border-warning/50 p-3 rounded">
                <tr className="text-accent text-sm font-bold">
                  <th>Customer</th>
                  <th>Created By</th>
                  <th>Cash + Another</th>
                  <th>Default Discounts</th>
                  <th>Discount Fee</th>
                  <th>Discount Percentage</th>
                  <th>Total Price</th>
                  <th>Remaingin Fee</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  fSales.length > 0 && isSearchBarOpen ?
                    fSales.map(sale => (
                      <tr key={sale._id} className="border-b">
                        <Sale sale={sale} setSales={setSales} sales={sales} setMyId={setMyId} setIsViewBoxOpen={setIsViewBoxOpen} />
                      </tr>
                    ))
                    :
                    fSales.length === 0 && isSearchBarOpen ?
                      <tr className="text-xl text-center">
                        <td colSpan={8} className="pt-3">Sales not found <Link to={"/admin/dashboard/sales/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                      </tr>
                      :
                      sales.length > 0 ?
                        sales.map(sale => (
                          <tr key={sale._id} className="border-b">
                            <Sale sale={sale} setSales={setSales} sales={sales} setMyId={setMyId} setIsViewBoxOpen={setIsViewBoxOpen} />
                          </tr>
                        ))
                        :
                        <tr className="text-xl text-center">
                          <td colSpan={8} className="pt-3">Sales not found <Link to={"/admin/dashboard/sales/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                        </tr>
                }
              </tbody>
            </table>
        }
      </div>
      {/* second section ends */}
      {
        (isViewBoxOpen && sale) &&
        <div className="absolute inset-0 bg-warning/20 flex items-center justify-center">
          <div className="w-1/2 border border-warning rounded-2xl bg-primary shadow-2xl shadow-warning">
            <div className="w-full flex items-center justify-between p-2">
              <h1 className="adminCardH1">Items</h1>
              <button onClick={() => setIsViewBoxOpen(false)}><X className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></button>
            </div>
            <div className="grid grid-cols-2 max-h-[60vh] overflow-y-scroll items-center justify-center">
              {
                // sale[0].items[0].id.name
                // console.log(sale[0]?.items[0]?.id?.name)
                sale[0]?.items?.map(item => (
                  <div key={item?._id} className="flex flex-col border m-2 rounded-lg relative h-fit shadow-2xl shadow-warning">
                    <img src={item?.id?.images[0]} alt={item?.id?.name} className="rounded-t-lg" />
                    <h1 className="adminCardH1 m-1">{item?.id?.name}</h1>
                    <p className="bg-primary px-2 absolute rounded-full border text-xl font-bold text-warning top-1 left-1">{item?.quantity}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default SalesPage