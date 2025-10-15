import { Delete, Plus, Search, SquarePen, Trash } from "lucide-react"
import { Link } from "react-router"

const CustomersPage = () => {
  return (
    // customers page starts
    <div className="flex flex-col gap-5 p-4 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between">
        <h1 className="adminCardH1">Customers</h1>
        <div className="flex gap-2">
          <button className="myAdminBtn"><Search className="size-5" />Search</button>
          <Link to={"/admin/dashboard/customers/create"} className="myAdminBtn"><Plus className="size-5" />Create</Link>
        </div>
      </div>
      <hr className="text-warning" />
      {/* first section ends */}
      {/* second section start */}
      <div className="border border-warning/50 p-3 rounded max-h-[82vh] overflow-y-scroll">
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
            <tr className="border-b">
              <td align="center"><img src="/avatar.png" alt="" className="w-20" /></td>
              <td align="center" className="p-2 adminCardH1">Suliman Khan</td>
              <td align="center"><span className="tableSpan">100</span></td>
              <td align="center"><span className="tableSpan">40</span></td>
              <td align="center"><span className="tableSpan">70</span></td>
              <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
              <td align="center" className="p-2"><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
            </tr>
            <tr className="border-b">
              <td align="center"><img src="/avatar.png" alt="" className="w-20" /></td>
              <td align="center" className="p-2 adminCardH1">Suliman Khan</td>
              <td align="center"><span className="tableSpan">100</span></td>
              <td align="center"><span className="tableSpan">40</span></td>
              <td align="center"><span className="tableSpan">70</span></td>
              <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
              <td align="center" className="p-2"><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
            </tr>
            <tr className="border-b">
              <td align="center"><img src="/avatar.png" alt="" className="w-20" /></td>
              <td align="center" className="p-2 adminCardH1">Suliman Khan</td>
              <td align="center"><span className="tableSpan">100</span></td>
              <td align="center"><span className="tableSpan">40</span></td>
              <td align="center"><span className="tableSpan">70</span></td>
              <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
              <td align="center" className="p-2"><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
            </tr>
            <tr className="border-b">
              <td align="center"><img src="/avatar.png" alt="" className="w-20" /></td>
              <td align="center" className="p-2 adminCardH1">Suliman Khan</td>
              <td align="center"><span className="tableSpan">100</span></td>
              <td align="center"><span className="tableSpan">40</span></td>
              <td align="center"><span className="tableSpan">70</span></td>
              <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
              <td align="center" className="p-2"><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
            </tr>
            <tr className="border-b">
              <td align="center"><img src="/avatar.png" alt="" className="w-20" /></td>
              <td align="center" className="p-2 adminCardH1">Suliman Khan</td>
              <td align="center"><span className="tableSpan">100</span></td>
              <td align="center"><span className="tableSpan">40</span></td>
              <td align="center"><span className="tableSpan">70</span></td>
              <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
              <td align="center" className="p-2"><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
            </tr>
            <tr className="border-b">
              <td align="center"><img src="/avatar.png" alt="" className="w-20" /></td>
              <td align="center" className="p-2 adminCardH1">Suliman Khan</td>
              <td align="center"><span className="tableSpan">100</span></td>
              <td align="center"><span className="tableSpan">40</span></td>
              <td align="center"><span className="tableSpan">70</span></td>
              <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
              <td align="center" className="p-2"><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
            </tr>
            <tr className="border-b">
              <td align="center"><img src="/avatar.png" alt="" className="w-20" /></td>
              <td align="center" className="p-2 adminCardH1">Suliman Khan</td>
              <td align="center"><span className="tableSpan">100</span></td>
              <td align="center"><span className="tableSpan">40</span></td>
              <td align="center"><span className="tableSpan">70</span></td>
              <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
              <td align="center" className="p-2"><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
            </tr>
            <tr className="border-b">
              <td align="center"><img src="/avatar.png" alt="" className="w-20" /></td>
              <td align="center" className="p-2 adminCardH1">Suliman Khan</td>
              <td align="center"><span className="tableSpan">100</span></td>
              <td align="center"><span className="tableSpan">40</span></td>
              <td align="center"><span className="tableSpan">70</span></td>
              <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
              <td align="center" className="p-2"><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
            </tr>
            <tr className="border-b">
              <td align="center"><img src="/avatar.png" alt="" className="w-20" /></td>
              <td align="center" className="p-2 adminCardH1">Suliman Khan</td>
              <td align="center"><span className="tableSpan">100</span></td>
              <td align="center"><span className="tableSpan">40</span></td>
              <td align="center"><span className="tableSpan">70</span></td>
              <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
              <td align="center" className="p-2"><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
            </tr>
            <tr className="border-b">
              <td align="center"><img src="/avatar.png" alt="" className="w-20" /></td>
              <td align="center" className="p-2 adminCardH1">Suliman Khan</td>
              <td align="center"><span className="tableSpan">100</span></td>
              <td align="center"><span className="tableSpan">40</span></td>
              <td align="center"><span className="tableSpan">70</span></td>
              <td align="center" className="p-2"><SquarePen className="bg-error/10 size-10 text-error px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
              <td align="center" className="p-2"><Trash className="bg-red-600/10 size-10 text-red-600 px-2 py-1 rounded hover:scale-110 active:scale-90 transition" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* second section ends */}
    </div>
    // customers page ends
  )
}

export default CustomersPage