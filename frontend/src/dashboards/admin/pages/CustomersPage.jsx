import { Plus, Search, X } from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCustomers } from "../../../store/slices/admin/customer.slice.js"
import Customer from "../components/customer/Customer"

const CustomersPage = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const closeSearchBar = () => {
    setIsSearchBarOpen(false);
  }

  const openSearchBar = () => {
    setIsSearchBarOpen(true);
  }
  const [customers, setCustomers] = useState([]);
  const [fCustomers, setFCustomers] = useState([]);

  const dispatch = useDispatch();
  const { allCloading: loading, allCustomers } = useSelector(state => state.customer);

  useEffect(() => {
    dispatch(getAllCustomers());
    setCustomers(allCustomers);
  }, [dispatch, allCustomers]);

  const handleSearchChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredCustomers = customers.filter(customer => {
      if (customer.name.toLowerCase().includes(term.toLowerCase())) {
        return customer;
      }
    });
    setFCustomers(filteredCustomers);
  }

  return (
    // customers page starts
    <div className="flex flex-col gap-5 p-4 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between">
        <h1 className="adminCardH1">Customers</h1>
        <div className="flex gap-2">
          <button className="myAdminBtn" onClick={openSearchBar}><Search className="size-5" />Search</button>
          <Link to={"/admin/dashboard/customers/create"} className="myAdminBtn"><Plus className="size-5" />Create</Link>
        </div>
        {
          isSearchBarOpen &&
          <div className="absolute left-1/2 right-4 flex items-center justify-around p-2 bg-primary gap-5">
            <input type="text" value={searchTerm} autoFocus onChange={handleSearchChange} placeholder="Search by name..." className="adminTextField w-full" />
            <Link to={"/admin/dashboard/customers"}><X onClick={closeSearchBar} className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
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
                <tr className="text-accent text-lg font-bold">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Orders</th>
                  <th>Cuts</th>
                  <th>Bills</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  fCustomers.length > 0 && isSearchBarOpen ?
                    fCustomers.map(customer => (
                      <tr key={customer._id} className="border-b">
                        <Customer customer={customer} />
                      </tr>
                    ))
                    :
                    fCustomers.length === 0 && isSearchBarOpen ?
                      <tr className="text-xl text-center">
                        <td colSpan={6} className="pt-3">No customers found <Link to={"/admin/dashboard/customers/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                      </tr>
                      :
                      customers.length > 0 ?
                        customers.map(customer => (
                          <tr key={customer._id} className="border-b">
                            <Customer customer={customer} />
                          </tr>
                        ))
                        :
                        <tr className="text-xl text-center">
                          <td colSpan={6} className="pt-3">No customers found <Link to={"/admin/dashboard/customers/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                        </tr>
                }
              </tbody>
            </table>
        }
      </div>
      {/* second section ends */}
    </div >
    // customers page ends
  )
}

export default CustomersPage