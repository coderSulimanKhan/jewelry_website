import { Plus, Search, X } from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../../../store/slices/admin/order.slice.js"
import Order from "../components/orders/Order.jsx"

const OrdersPage = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewBoxOpen, setIsViewBoxOpen] = useState(false);
  const [myId, setMyId] = useState("");
  const [order, setOrder] = useState(null);

  const closeSearchBar = () => {
    setIsSearchBarOpen(false);
  }

  const openSearchBar = () => {
    setIsSearchBarOpen(true);
  }
  const [orders, setOrders] = useState([]);
  const [fOrders, setFOrders] = useState([]);

  const dispatch = useDispatch();
  const { isGettingAllOrders: loading, allOrders } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    console.log(allOrders);
    setOrders(allOrders);
  }, [allOrders]);

  useEffect(() => {
    setOrder(orders?.filter(cut => cut._id === myId));
  }, [myId, setMyId, orders]);

  const handleSearchChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredOrders = orders.filter(cut => {
      if (cut.user.name.toLowerCase().includes(term.toLowerCase())) {
        return cut;
      }
    });
    setFOrders(filteredOrders);
  }

  console.log(order);

  return (
    // admins page starts
    <div className="flex flex-col gap-5 p-4 w-[79vw]">
      {/* first section starts */}
      <div className="flex items-center justify-between">
        <h1 className="adminCardH1">Orders</h1>
        <div className="flex gap-2">
          <button className="myAdminBtn" onClick={openSearchBar}><Search className="size-5" />Search</button>
          <Link to={"/admin/dashboard/orders/create"} className="myAdminBtn"><Plus className="size-5" />Create</Link>
        </div>
        {
          isSearchBarOpen &&
          <div className="absolute left-1/2 right-4 flex items-center justify-around p-2 bg-primary gap-5">
            <input type="text" value={searchTerm} autoFocus onChange={handleSearchChange} placeholder="Search by name..." className="adminTextField w-full" />
            <Link to={"/admin/dashboard/orders"}><X onClick={closeSearchBar} className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
          </div>
        }
      </div>
      <hr className="text-warning" />
      {/* first section ends */}
      {/* second section start */}
      <div className="border border-warning/50 p-1 rounded max-h-[82vh] overflow-y-scroll">
        {
          loading ?
            <div className="loading" /> :
            <table className="w-full">
              <thead className="border-b border-warning/50 p-3 rounded">
                <tr className="text-accent text-xs font-bold">
                  <th>Customer</th>
                  <th>Created By</th>
                  <th>Cash + Another</th>
                  <th>Default Discounts</th>
                  <th>Note</th>
                  <th>Discount Fee</th>
                  <th>Discount Percentage</th>
                  <th>Total Amount</th>
                  <th>Remaining Amount</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {
                  fOrders.length > 0 && isSearchBarOpen ?
                    fOrders.map(order => (
                      <tr key={order._id} className="border-b">
                        <Order order={order} setOrders={setOrders} orders={orders} setMyId={setMyId} setIsViewBoxOpen={setIsViewBoxOpen} />
                      </tr>
                    ))
                    :
                    fOrders.length === 0 && isSearchBarOpen ?
                      <tr className="text-xl text-center">
                        <td colSpan={10} className="pt-3">No orders found <Link to={"/admin/dashboard/orders/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                      </tr>
                      :
                      orders?.length > 0 ?
                        orders?.map(order => (
                          <tr key={order._id} className="border-b">
                            <Order order={order} setOrders={setOrders} orders={orders} setMyId={setMyId} setIsViewBoxOpen={setIsViewBoxOpen} />
                          </tr>
                        ))
                        :
                        <tr className="text-xl text-center">
                          <td colSpan={10} className="pt-3">No orders found <Link to={"/admin/dashboard/orders/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                        </tr>
                }
              </tbody>
            </table>
        }
      </div>
      {
        (isViewBoxOpen && order) &&
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
                order[0]?.items?.map(order => (
                  <div key={order?._id} className="flex flex-col border m-2 rounded-lg relative h-fit shadow-2xl shadow-warning">
                    <img src={order?.id?.images[0]} alt={order?.id?.name} className="rounded-t-lg" />
                    <h1 className="adminCardH1 m-1">{order?.id?.name}</h1>
                    <p className="bg-primary px-2 absolute rounded-full border text-xl font-bold text-warning top-1 left-1">{order?.quantity}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
      {/* second section ends */}
    </div >

  )
}

export default OrdersPage