import { Plus, Trash, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getAllCustomers } from "../../../../store/slices/admin/customer.slice.js"
import { getAllProducts } from "../../../../store/slices/admin/product.slice.js"
import { getCutById, updateCut } from "../../../../store/slices/admin/cut.slice.js"

const UpdateCut = () => {
  const { id } = useParams();
  const [cut, setCut] = useState({});
  const [customerId, setCustomerId] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [isProductsBoxOpen, setIsProductBoxOpen] = useState(false);
  const customers = useSelector(state => state.customer.allCustomers);
  const products = useSelector(state => state.product.allProducts);
  const { cut: myCut } = useSelector(state => state.cut);
  const { isUpdating: loading } = useSelector(state => state.cut);
  const [cnic, setCnic] = useState("");
  const [note, setNote] = useState("");
  const [deductions, setDeductions] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [cash, setCash] = useState(null);
  const [another, setAnother] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getAllProducts());
    dispatch(getCutById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setAllCustomers(customers);
    setAllProducts(products);
    setCut(myCut);
  }, [customers, products, myCut]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
    setCustomerId(cut?.user);
    setAddedItems(cut?.items || []);
    setCnic(cut?.cnic || "");
    setDeductions(cut?.deductions || 0);
    setCash(cut?.cash || 0);
    setAnother(cut?.another || 0);
    setNote(cut?.note || "");
  }, [products, cut]);

  useEffect(() => {
    const basePrice = calculateTotalPrice();
    const finalPrice = basePrice - (Number(deductions) || 0);
    setTotalPrice(finalPrice);
  }, [addedItems, deductions]);

  const openProductsBox = () => {
    setAddedItems([]);
    setIsProductBoxOpen(true);
  }

  const closeProductsBox = () => {
    setIsProductBoxOpen(false);
    setTotalPrice(calculateTotalPrice());
  }

  const handleProductChange = (e, id, name, price, f, p) => {
    if (e.target.checked) {
      if (!addedItems.some(item => item?.id == id)) {
        setAddedItems([...addedItems, { id, quantity: 1, name, price, f, p }]);
      };
    } else {
      setAddedItems(addedItems.filter(item => item?.id !== id));
    }
  }

  const handleItemsChange = e => {
    const value = e.target.value;
    if (value) {
      setAllProducts(allProducts.filter(item => item?.name?.toLowerCase().includes(value.toLowerCase())));
    } else {
      setAllProducts(products);
    }
  };

  const handleQuantityChange = (e, id) => {
    const value = Number(e.target.value);
    setAddedItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: value }
          : item
      )
    );
  };

  const handleDeleteAddedItem = id => {
    setAddedItems(addedItems.filter(item => item.id !== id));
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    addedItems?.forEach(item => {
      const product = products?.find(p => p._id === item?.id?._id || p._id === item?.id);
      if (product) {
        totalPrice += product?.price * item?.quantity;
      }
    });
    return Math.round(totalPrice);
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", customerId);
    formData.append("items", JSON.stringify(addedItems)); // todo: pass as a string
    formData.append("cnic", cnic);
    formData.append("deductions", deductions);
    formData.append("cash", cash);
    formData.append("another", another);
    formData.append("note", note);
    formData.append("totalAmount", totalPrice);
    formData.append("remainingAmount", totalPrice - cash - another);
    dispatch(updateCut({ id, formData }));
  };

  return (
    <div className="flex flex-col gap-10 p-1 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between pr-10">
        <h1 className="adminCardH1">Update Got</h1>
        <Link to={"/admin/dashboard/cuts"}><X className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
      </div>
      {/* first section ends */}
      {/* second section starts */}
      <div className="flex justify-center">
        <form onSubmit={handleFormSubmit} className="w-4/5 border border-error p-3 rounded flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col">
            <label htmlFor="users" className="text-success">Select Customer</label>
            <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} name="users" id="users" className="adminTextField">
              {
                allCustomers?.map(customer => (
                  <option key={customer?._id} className="bg-primary" value={customer?._id}>{customer?.name}</option>
                ))
              }
            </select>
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="items" className="text-success">Add items</label>
            <div className="flex flex-col">
              {
                addedItems.length > 0 ?
                  addedItems.map(item => (
                    <div key={item?.id} className="flex justify-between  items-center">
                      <h2 className="adminCardH1">{item?.id?.name || item?.name}</h2>
                      <h2 className="bg-warning/20 border border-success text-warning rounded-full px-2 h-fit">{item?.price || item?.id?.price} <span className="text-xs">PKR</span></h2>
                      <h2 className="text-3xl text-warning border bg-error/20 rounded-full px-2">{item?.quantity}</h2>
                      <button className="text-red-400 hover:text-red-500 hover:scale-110 active:scale-90 transition" type="button" onClick={() => handleDeleteAddedItem(item?.id)}><Trash /></button>
                    </div>
                  )) :
                  <span className="text-warning">No items added</span>
              }
            </div>
            {
              addedItems.length < 1 ?
                <button type="button" onClick={openProductsBox} className="successBtn flex items-center justify-center"><Plus />Add</button> :
                <button type="button" onClick={openProductsBox} className="successBtn flex items-center justify-center">Cancel</button>
            }
            {
              isProductsBoxOpen &&
              <div className="w-[100vw] h-[100vh] bg-warning/25 absolute inset-0 flex items-center justify-center z-100">
                <div className="w-2/3 bg-primary p-4 rounded-2xl border border-warning shadow-2xl shadow-warning">
                  <div className="flex items-center justify-between">
                    <h1 className="adminCardH1">Select Items</h1>
                    <input type="text" className="adminTextField" placeholder="Search by name..." onChange={handleItemsChange} />
                    <button onClick={closeProductsBox}><X className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></button>
                  </div>
                  <div className="flex flex-col p-9 gap-3 overflow-y-scroll justify-center">
                    {
                      allProducts?.map(product => (
                        <div key={product?._id} className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <h1 className="text-3xl text-success">{product?.name}</h1>
                            <h2 className="bg-warning/20 border border-success text-warning rounded-full px-2">{product?.price} <span className="text-xs">PKR</span></h2>
                            <h3 className="text-3xl text-warning border bg-error/20 rounded-full px-2">{product?.stock} </h3>
                            <h4>{product?.soldOut ? "Sold Out" : ""}</h4>
                            <p className="text-2xl text-success">-{product?.discountFee ? product?.discountFee : "--"}{product?.discountFee ? <span className="text-sm text-warning">PKR</span> : ""}</p>
                            <p className="text-2xl text-success">-{product?.discountPercentage ? product?.discountPercentage : "--"}{product?.discountPercentage ? <span className="text-sm text-warning">%</span> : ""}</p>
                            <input type="checkbox" onChange={(e) => handleProductChange(e, product?._id, product?.name, product?.price, product?.discountFee, product?.discountPercentage)} className="checkbox checkbox-xl checkbox-warning" />
                          </div>
                          {addedItems.some(item => item.id === product._id) && (
                            <input onChange={(e) => handleQuantityChange(e, product._id)} defaultValue={1} type="number" min={1} placeholder="Quantity..." className="adminTextField m-1" />
                          )}
                        </div>
                      ))
                    }
                  </div>
                  <button type="button" className="successBtn mx-90 relative" onClick={closeProductsBox}>Done <span className="absolute -top-5 -right-4 bg-warning px-2 border text-primary rounded-full shadow-md shadow-warning">{addedItems?.length || 0}</span> </button>
                </div>
              </div>
            }
          </div>
          <div className="flex flex-col">
            <label htmlFor="cnic" className="text-success">CNIC</label>
            <input id="cnic" type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} className="adminTextField" placeholder="@ 156..." min={0} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="deductions" className="text-success">Deductions</label>
            <input id="deductions" type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} className="adminTextField" placeholder="@ 2000" min={0} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cash" className="text-success">Cash</label>
            <input id="cash" type="number" value={cash} onChange={(e) => setCash(e.target.value)} className="adminTextField" placeholder="@ 2000" min={0} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="another" className="text-success">Another</label>
            <input id="another" type="number" value={another} onChange={(e) => setAnother(e.target.value)} className="adminTextField" placeholder="@ 2000" min={0} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="note" className="text-success">Note</label>
            <textarea className="adminTextField" name="note" id="note" value={note} onChange={(e) => setNote(e?.target?.value)} rows={5} placeholder="@ This is my note..." />
          </div>
          <div className="flex gap-3">
            <label htmlFor="totalPrice" className="adminCardH1">Total Price</label>
            <p className="text-4xl">{totalPrice} <span className="text-warning text-sm">PKR</span></p>
          </div>
          <div className="flex gap-3">
            <label htmlFor="totalPrice" className="adminCardH1">Remaining Fee</label>
            <p className="text-4xl">{totalPrice - cash - another} <span className="text-warning text-sm">PKR</span></p>
          </div>
          <div className="col-span-2 justify-center flex">
            <button disabled={loading} className="successBtn" type="submit"> {loading ? <div className="loading" /> : "Update"} </button>
          </div>
        </form>
      </div>
      {/* second section ends */}
    </div>
  )
}

export default UpdateCut