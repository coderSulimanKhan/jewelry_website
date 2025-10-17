import { X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { createCustomer } from "../../../../store/slices/admin/customer.slice.js";
import { useDispatch, useSelector } from "react-redux"

const CreateCustomer = () => {
  const [previewImage, setPreviewImage] = useState("/avatar.png");
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.customer);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageFile(file);
      setPreviewImage(imageUrl);
    }
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", e.target.fullname.value);
    formData.append("username", e.target.username.value);
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("country", e.target.country.value);
    formData.append("city", e.target.city.value);
    formData.append("street", e.target.street.value);
    formData.append("postalCode", e.target.postalCode.value);
    formData.append("phone", e.target.phone.value);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    dispatch(createCustomer(formData));
  }
  return (
    // create customer form start
    <div className="flex flex-col gap-10 p-1 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between pr-10">
        <h1 className="adminCardH1">Create Customer</h1>
        <Link to={"/admin/dashboard/customers"}><X className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
      </div>
      {/* first section ends */}
      {/* second section starts */}
      <div className="flex justify-center">
        <form onSubmit={handleFormSubmit} className="w-4/5 border border-error p-3 rounded">
          <div className="grid grid-cols-2 gap-2">
            {/* fullname */}
            <div className="flex flex-col w-full">
              <label htmlFor="fullname" className="text-success">Full Name<span className="text-red-600 text-xl">*</span></label>
              <input type="text" id="fullname" className="adminTextField" placeholder="e.g Suliman Khan" />
            </div>
            {/* useranme */}
            <div className="flex flex-col">
              <label htmlFor="username" className="text-success">Username<span className="text-red-600 text-xl">*</span></label>
              <input type="text" id="username" className="adminTextField" placeholder="e.g suliman_khan" />
            </div>
            {/* email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-success">E-mail<span className="text-red-600 text-xl">*</span></label>
              <input type="email" id="email" className="adminTextField" placeholder="e.g myemail@example.xyz" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-success">Password<span className="text-red-600 text-xl">*</span></label>
              <input type="password" id="password" className="adminTextField" placeholder="e.g abcd1234" />
            </div>
            <h1 className="col-span-2 text-xl text-warning/60">Address</h1>
            <div className="flex flex-col">
              <label htmlFor="country" className="text-success">Country</label>
              <input type="text" id="country" className="adminTextField" placeholder="e.g Pakistan" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="text-success">City</label>
              <input type="text" id="city" className="adminTextField" placeholder="e.g Peshawer" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="street" className="text-success">Street</label>
              <input type="text" id="street" className="adminTextField" placeholder="e.g Nana Market" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="postalCode" className="text-success">PostalCode</label>
              <input type="text" id="postalCode" className="adminTextField" placeholder="e.g 123456" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-success">Phone</label>
              <input type="text" id="phone" className="adminTextField" placeholder="e.g 03456789101" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="image" className="text-success">Image</label>
              <label htmlFor="image" className="w-fit">
                <img src={previewImage} alt="" className="w-10" />
              </label>
              <input type="file" hidden onChange={handleImageChange} accept="image/*" id="image" className="adminTextField" />
            </div>
            <div className="col-span-2 justify-center flex">
              <button disabled={loading} className="successBtn" type="submit"> {loading ? <div className="loading" /> : "Create"} </button>
            </div>
          </div>
        </form>
      </div>
      {/* second section ends */}
    </div>
    // create customer form ends
  )
}

export default CreateCustomer