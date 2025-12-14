import { Link, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { getAdminById, updateAdminById } from "../../../../store/slices/admin/admin.slice.js";
import { X } from "lucide-react";

const UpdateAdmin = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("/avatar.png");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { admin, isUpdatingAdmin: loading } = useSelector(state => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      country: "",
      city: "",
      street: "",
      postalCode: "",
    },
    phone: "",
  });

  useEffect(() => {
    dispatch(getAdminById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (admin) {
      setFormData(admin);
      setPreviewImage(admin.image || "/avatar.png");
    }
  }, [admin]);

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
    const rformData = new FormData();
    rformData.append("fullname", e.target.fullname.value);
    rformData.append("username", e.target.username.value);
    rformData.append("email", e.target.email.value);
    rformData.append("country", e.target.country.value);
    rformData.append("city", e.target.city.value);
    rformData.append("street", e.target.street.value);
    rformData.append("postalCode", e.target.postalCode.value);
    rformData.append("phone", e.target.phone.value);
    if (imageFile) {
      rformData.append("image", imageFile);
    }
    dispatch(updateAdminById({ id, rformData }));
  }

  return (
    // update admin form start
    <div className="flex flex-col gap-10 p-1 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between pr-10">
        <h1 className="adminCardH1">Update Admin</h1>
        <Link to={"/admin/dashboard/admins"}><X className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
      </div>
      {/* first section ends */}
      {/* second section starts */}
      <div className="flex justify-center">
        <form onSubmit={handleFormSubmit} className="w-4/5 border border-error p-3 rounded">
          <div className="grid grid-cols-2 gap-2">
            {/* fullname */}
            <div className="flex flex-col w-full">
              <label htmlFor="fullname" className="text-success flex pb-1 gap-1">Full Name{admin?.name !== formData?.name && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="text" id="fullname" value={formData?.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="adminTextField" placeholder="e.g Suliman Khan" />
            </div>
            {/* useranme */}
            <div className="flex flex-col">
              <label htmlFor="username" className="text-success flex pb-1 gap-1">Username{admin?.username !== formData?.username && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="text" id="username" value={formData?.username} onChange={e => setFormData({ ...formData, username: e.target.value })} className="adminTextField" placeholder="e.g suliman_khan" />
            </div>
            {/* email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-success flex pb-1 gap-1">E-mail{admin?.email !== formData?.email && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="email" id="email" value={formData?.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="adminTextField" placeholder="e.g myemail@example.xyz" />
            </div>
            <h1 className="col-span-2 text-xl text-warning/60">Address</h1>
            <div className="flex flex-col">
              <label htmlFor="country" className="text-success flex pb-1 gap-1">Country{admin?.address?.country !== formData?.address?.country && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="text" id="country" value={formData?.address?.country} onChange={e => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })} className="adminTextField" placeholder="e.g Pakistan" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="text-success flex pb-1 gap-1">City{admin?.address?.city !== formData?.address?.city && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="text" id="city" value={formData?.address?.city} onChange={e => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })} className="adminTextField" placeholder="e.g Peshawer" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="street" className="text-success flex pb-1 gap-1">Street{admin?.address?.street !== formData?.address?.street && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="text" id="street" value={formData?.address?.street} onChange={e => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })} className="adminTextField" placeholder="e.g Nana Market" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="postalCode" className="text-success flex pb-1 gap-1">PostalCode{admin?.address?.postalCode !== formData?.address?.postalCode && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="text" id="postalCode" value={formData?.address?.postalCode} onChange={e => setFormData({ ...formData, address: { ...formData.address, postalCode: e.target.value } })} className="adminTextField" placeholder="e.g 123456" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-success flex pb-1 gap-1">Phone{admin?.phone !== formData?.phone && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="text" id="phone" value={formData?.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="adminTextField" placeholder="e.g 03456789101" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="image" className="text-success">Image{admin?.image !== previewImage && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <label htmlFor="image" className="w-fit">
                <img src={previewImage} alt="" className="w-10" />
              </label>
              <input type="file" hidden onChange={handleImageChange} accept="image/*" id="image" className="adminTextField" />
            </div>
            <div className="col-span-2 justify-center flex">
              <button disabled={loading} className="successBtn" type="submit"> {loading ? <div className="loading" /> : "Update"} </button>
            </div>
          </div>
        </form>
      </div>
      {/* second section ends */}
    </div>
    // update admin form ends
  )
}

export default UpdateAdmin