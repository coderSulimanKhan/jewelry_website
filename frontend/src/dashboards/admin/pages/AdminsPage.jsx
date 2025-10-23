import { Plus, Search, X } from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllAdmins } from "../../../store/slices/admin/admin.slice.js"
import Admin from "../components/admin/Admin"

const AdminsPage = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const closeSearchBar = () => {
    setIsSearchBarOpen(false);
  }

  const openSearchBar = () => {
    setIsSearchBarOpen(true);
  }
  const [admins, setAdmins] = useState([]);
  const [fAdmins, setFAdmins] = useState([]);

  const dispatch = useDispatch();
  const { allAloading: loading, allAdmins } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getAllAdmins());
    setAdmins(allAdmins);
  }, [dispatch, allAdmins]);

  const handleSearchChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredAdmins = admins.filter(admin => {
      if (admin.name.toLowerCase().includes(term.toLowerCase())) {
        return admin;
      }
    });
    setFAdmins(filteredAdmins);
  }

  return (
    // admins page starts
    <div className="flex flex-col gap-5 p-4 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between">
        <h1 className="adminCardH1">Admins</h1>
        <div className="flex gap-2">
          <button className="myAdminBtn" onClick={openSearchBar}><Search className="size-5" />Search</button>
          <Link to={"/admin/dashboard/admins/create"} className="myAdminBtn"><Plus className="size-5" />Create</Link>
        </div>
        {
          isSearchBarOpen &&
          <div className="absolute left-1/2 right-4 flex items-center justify-around p-2 bg-primary gap-5">
            <input type="text" value={searchTerm} autoFocus onChange={handleSearchChange} placeholder="Search by name..." className="adminTextField w-full" />
            <Link to={"/admin/dashboard/admins"}><X onClick={closeSearchBar} className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
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
                  fAdmins.length > 0 && isSearchBarOpen ?
                    fAdmins.map(admin => (
                      <tr key={admin._id} className="border-b">
                        <Admin admin={admin} />
                      </tr>
                    ))
                    :
                    fAdmins.length === 0 && isSearchBarOpen ?
                      <tr className="text-xl text-center">
                        <td colSpan={6} className="pt-3">No admins found <Link to={"/admin/dashboard/admins/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                      </tr>
                      :
                      admins.length > 0 ?
                        admins.map(admin => (
                          <tr key={admin._id} className="border-b">
                            <Admin admin={admin} />
                          </tr>
                        ))
                        :
                        <tr className="text-xl text-center">
                          <td colSpan={6} className="pt-3">No admins found <Link to={"/admin/dashboard/admins/create"} className="text-warning hover:text-success transition">Create One</Link></td>
                        </tr>
                }
              </tbody>
            </table>
        }
      </div>
      {/* second section ends */}
    </div >
    // admins page ends
  )
}

export default AdminsPage