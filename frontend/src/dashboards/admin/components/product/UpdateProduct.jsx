import { Link, useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useState } from "react"
import { Gem, SquarePen, X } from "lucide-react"
import { toast } from "react-toastify"
import { getProductById, updateProductById } from "../../../../store/slices/admin/product.slice.js"

const UpdateProduct = () => {
  const navigate = useNavigate();
  const categories = useMemo(() => {
    return ["ring", "necklace", "bracelet", "earrings", "pendant", "anklet", "other"];
  }, []);
  const stoneTypes = useMemo(() => {
    return ["agate", "amethyst", "apatite", "aquamarine", "adventurine", "carnelian", "chrysoprase", "citrine", "diamond", "emerald", "garnet", "honey quartz", "jade", "lab grown blue sapphire", "lab grown diamond", "lab grown emerald", "lab grown ruby", "lab grown white sapphire", "multi", "neon apatite", "onyx", "opal", "pearl", "peridot", "prasiolite", "quartz", "ruby", "sapphire", "sodalite", "swiss blue topaz", "tiger eye", "topaz", "tourmaline", "tsavorite", "turquoise", "none"];
  }, []);
  const { product, isUpdating: isUpdatingProduct } = useSelector(state => state.product);
  const [previewImages, setPreviewImages] = useState([]);
  const [stonePreviewImages, setStonePreviewImages] = useState([]);
  const [allStones, setAllStones] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [stonePreviewImage, setStonePreviewImage] = useState(null);

  const [stoneImageFiles, setStoneImageFiles] = useState([]);
  const [isStoneModelOpen, setIsStoneModelOpen] = useState(false);
  const [isIAmTheUpdateButton, setIsIAmTheUpdateButton] = useState(false);

  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    material: "",
    price: "",
    color: "",
    stock: "",
    weight: {},
    size: {},
    discountFee: 0,
    discountPercentage: 0,
    stones: [],
    images: []
  });

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setFormData(product);
      setAllStones(product?.stones || []);
      setPreviewImages(product?.images || []);
      console.log(product?.images);
      product?.stones.forEach(stone => {
        setStonePreviewImages([...stonePreviewImages, stone?.image]);
      });
    }
  }, [product]);

  const handleAddImage = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageFiles([...imageFiles, file]);
      setPreviewImages([...previewImages, imageUrl]);
    }
  }

  const handleStoneImageChange = e => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    if (file) {
      setStoneImageFiles([...stoneImageFiles, file]);
      setStonePreviewImages([...stonePreviewImages, imageUrl]);
      setStonePreviewImage(imageUrl);
      setStoneProperties({ ...stoneProperties, image: imageUrl });
    }
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    const rformData = new FormData();
    rformData.append("name", e.target.name.value);
    rformData.append("description", e.target.description.value);
    rformData.append("category", e.target.category.value);
    rformData.append("material", e.target.material.value);
    rformData.append("price", e.target.price.value);
    rformData.append("color", e.target.color.value);
    rformData.append("stock", e.target.stock.value);
    rformData.append("weightValue", e.target.weight.value);
    rformData.append("weightUnit", e.target.unit.value);
    rformData.append("sizeValue", e.target.size.value);
    rformData.append("sizeUnit", e.target.sizeUnit.value);
    rformData.append("discountFee", e.target.discountFee.value);
    rformData.append("discountPercentage", e.target.discountPercentage.value);
    if (allStones) {
      rformData.append("stones", JSON.stringify(allStones));
    }
    if (stoneImageFiles) {
      stoneImageFiles.forEach(stone => {
        rformData.append("stoneImageFiles", stone);
      });
    }
    if (imageFiles) {
      imageFiles.forEach(image => {
        rformData.append("imageFiles", image);
      })
    }
    rformData.append("images", JSON.stringify(previewImages));
    dispatch(updateProductById({ productId, rformData }));
    navigate("/admin/dashboard/products");
  }

  const [stoneProperties, setStoneProperties] = useState({
    type: "agate",
    quantity: 1,
    shape: "",
    color: "",
    weight: { value: 0, unit: "g" },
    uniqueId: null,
    image: "",
  });

  const [id, setId] = useState(allStones?.length + 2);

  const handleUpdateTheStone = () => {
    // check fields validation for stone
    if (!stonePreviewImage || !stoneProperties.color || !stoneProperties.quantity || !stoneProperties.shape || !stoneProperties.type || !stoneProperties.weight.unit || !stoneProperties.weight.value) {
      return toast.error("Inavlid credentials");
    }
    if (isIAmTheUpdateButton) {
      const newStones = allStones.map(stone => {
        if (stone?.uniqueId === stoneProperties?.uniqueId) {
          return stoneProperties;
        } else {
          return stone;
        }
      });
      setAllStones(newStones);
    } else {
      setStonePreviewImage("");
      setStoneProperties({
        type: "agate",
        quantity: 1,
        shape: "",
        color: "",
        weight: { value: 0, unit: "g" },
        uniqueId: null,
        image: "",
      });
      if (!allStones) {
        setAllStones([{ ...stoneProperties, uniqueId: id }]);
        setId(p => p = p + 1);
      } else {
        setAllStones([...allStones, { ...stoneProperties, uniqueId: id }]);
        setId(p => p + 1);
      }
    }
    setIsStoneModelOpen(false);
  }

  const handleDeleteStone = stoneId => {
    const filteredStones = allStones.filter(stone => stone.uniqueId !== stoneId);
    setAllStones(filteredStones);
  }

  const handleUpdateStone = stoneId => {
    const stone = allStones.filter(stone => stone?.uniqueId == stoneId);
    console.log(allStones);
    setIsStoneModelOpen(true);
    setStoneProperties(stone[0]);
    setStonePreviewImage(stone[0]?.image);
  }

  const handleDeleteImage = index => {
    const newImages = previewImages.filter((_, i) => i != index);
    setPreviewImages(newImages);
  }

  return (
    // update product form start
    <div className="flex flex-col gap-10 p-1 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between pr-10">
        <h1 className="adminCardH1">Update Product</h1>
        <Link to={"/admin/dashboard/products"}><X className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
      </div>
      {/* first section ends */}
      {/* second section starts */}
      <div className="flex justify-center">
        <form onSubmit={handleFormSubmit} className="w-4/5 border border-error p-3 rounded h-[80vh] overflow-y-scroll">
          <div className="flex flex-col gap-3">
            {/* name */}
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-success flex pb-1 gap-1">Name{product?.name !== formData?.name && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="text" id="name" value={formData?.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="adminTextField" placeholder="e.g Golden Ring" />
            </div>
            {/* description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-success flex pb-1 gap-1">Description{product?.description !== formData?.description && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="text" id="description" value={formData?.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="adminTextField" placeholder="e.g It is golden ring for men with black emarald." />
            </div>
            {/* category */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-success flex pb-1 gap-1">Category{product?.category !== formData?.category && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <select id="category" value={formData?.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="capitalize adminTextField">
                {
                  categories.map(category => (
                    <option key={category} value={category} className="bg-primary">{category}</option>
                  ))
                }
              </select>
            </div>
            {/* material */}
            <div className="flex flex-col">
              <label htmlFor="material" className="text-success flex pb-1 gap-1">Material{product?.material !== formData?.material && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <select id="material" value={formData?.material} onChange={(e) => setFormData({ ...formData, material: e.target.value })} className="adminTextField">
                <option value="gold" className="bg-primary">Gold</option>
                <option value="silver" className="bg-primary">Silver</option>
              </select>
            </div>
            {/* price */}
            <div className="flex flex-col w-full">
              <label htmlFor="price" className="text-success flex pb-1 gap-1">Price{product?.price !== formData?.price && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="number" id="price" value={formData?.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="adminTextField" placeholder="e.g 100" min={1} />
            </div>
            {/* color */}
            <div className="flex flex-col w-full">
              <label htmlFor="color" className="text-success flex pb-1 gap-1">Color{product?.color !== formData?.color && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="text" id="color" value={formData?.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="adminTextField" placeholder="e.g Golden" />
            </div>
            {/* stock */}
            <div className="flex flex-col w-full">
              <label htmlFor="stock" className="text-success flex pb-1 gap-1">Stock{product?.stock !== formData?.stock && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="number" id="stock" value={formData?.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="adminTextField" placeholder="e.g 12" min={1} />
            </div>
            {/* weight */}
            <div className="flex gap-3 items-center justify-center">
              <div className="flex flex-col w-full">
                <label htmlFor="weight" className="text-success flex pb-1 gap-1">Weight{product?.weight?.value !== formData?.weight?.value && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
                <input type="number" id="weight" value={formData?.weight?.value ?? 0} onChange={(e) => setFormData({ ...formData, weight: { ...formData.weight, value: e.target.value } })} className="adminTextField" placeholder="e.g 25" min={1} />
              </div>
              {/* unit */}
              <div className="flex flex-col w-1/3">
                <label htmlFor="unit" className="text-success flex pb-1 gap-1">Unit{product?.weight?.unit !== formData?.weight?.unit && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
                <select id="unit" value={formData?.weight?.unit} onChange={(e) => setFormData({ ...formData, weight: { ...formData.weight, unit: e.target.value } })} className="adminTextField">
                  <option value="g" className="bg-primary">Grams</option>
                  <option value="ct" className="bg-primary">Carats</option>{/* 0.2g */}
                  <option value="oz" className="bg-primary">Ounces</option>{/* 28.35g */}
                </select>
              </div>
            </div>
            {/* size */}
            <div className="flex gap-3 items-center justify-center">
              <div className="flex flex-col w-full">
                <label htmlFor="size" className="text-success flex pb-1 gap-1">Size{product?.size?.value !== formData?.size?.value && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
                <input type="number" value={formData?.size?.value ?? 0} onChange={(e) => setFormData({ ...formData, size: { ...formData.size, value: e.target.value } })} id="size" className="adminTextField" placeholder="e.g 3" min={1} />
              </div>
              {/* unit */}
              <div className="flex flex-col w-1/3">
                <label htmlFor="sizeUnit" className="text-success flex pb-1 gap-1">Unit{product?.size?.unit !== formData?.size?.unit && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
                <select id="sizeUnit" value={formData?.size?.unit} onChange={(e) => setFormData({ ...formData, size: { ...formData.size, unit: e.target.value } })} className="adminTextField">
                  <option value="cm" className="bg-primary">Centimeters</option>
                  <option value="inch" className="bg-primary">Inches</option>
                </select>
              </div>
            </div>
            {/* discount price */}
            <div className="flex flex-col w-full">
              <label htmlFor="discountFee" className="text-success flex pb-1 gap-1">Discount Fee{product?.discountFee !== formData?.discountFee && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="number" id="discountFee" value={formData?.discountFee} onChange={(e) => setFormData({ ...formData, discountFee: e.target.value })} className="adminTextField" placeholder="e.g 10" min={0} />
            </div>
            {/* discount percentage */}
            <div className="flex flex-col w-full">
              <label htmlFor="discountPercentage" className="text-success flex pb-1 gap-1">Discount Percentage{product?.discountPercentage !== formData?.discountPercentage && <span className="bg-error/20 text-error text-xs px-1 py-1 rounded-full">Updated</span>}</label>
              <input type="number" id="discountPercentage" value={formData?.discountPercentage} onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })} className="adminTextField" placeholder="e.g 2" min={0} />
            </div>
            {/* add stone */}
            <div className="flex flex-col w-full">
              <label htmlFor="discountPercentage" className="text-success">Stones</label>
              <div className={`${allStones.length > 0 ? "grid grid-cols-1" : "flex items-center"} gap-2`}>
                {
                  allStones.length > 0 ?
                    allStones.map((stone, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <img src={stone?.image || allStones[stone?.uniqueId]} alt="" className="w-20 border border-warning rounded" />
                        <h1 className="adminCardH1 text-center">{stone?.type?.length > 7 ? stone?.type.slice(0, 7) + "..." : stone?.type}</h1>
                        <p className="adminCardSpan">{stone?.quantity}</p>
                        <p className="adminCardSpan">{stone?.weight?.value + stone?.weight?.unit}</p>
                        <p className="adminCardSpan">{stone?.shape}</p>
                        <SquarePen onClick={() => { handleUpdateStone(stone?.uniqueId); setIsIAmTheUpdateButton(true) }} className="bg-error/20 text-error rounded-full p-1 size-7 hover:scale-110 transition active:scale-90" />
                        <X onClick={() => handleDeleteStone(stone?.uniqueId)} className="bg-red-900/20 text-red-500 rounded-full p-1 size-7 hover:scale-110 transition active:scale-90" />
                      </div>
                    )) : <p className="text-warning">No stones added</p>
                }
                <button className="successBtn" type="button" onClick={() => {
                  setIsStoneModelOpen(true); setIsIAmTheUpdateButton(false); setStonePreviewImage("");
                  setStoneProperties({
                    type: "agate",
                    quantity: 1,
                    shape: "",
                    color: "",
                    weight: { value: 0, unit: "g" },
                    uniqueId: null,
                    image: "",
                  });
                }}>Add Stone</button>
              </div>
            </div>
            {/* stone */}
            {
              isStoneModelOpen && (
                // background blur starts
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-warning/20 flex items-center justify-center z-50">
                  {/* actual form starts*/}
                  <div className="w-[40vw] bg-primary rounded border border-warning flex flex-col gap-1 p-4 items-center justify-evenly">
                    <div className="flex justify-between w-full">
                      <h1 className="adminCardH1">Select Stone</h1>
                      <X onClick={() => setIsStoneModelOpen(false)} className="size-10 text-warning hover:scale-110 active:scale-90 transition" />
                    </div>
                    {/* stones */}
                    <div className="flex flex-col w-full">
                      <label htmlFor="stone" className="text-success">Stone Name<span className="text-red-600 text-xl">*</span></label>
                      <select id="stone" value={stoneProperties?.type} onChange={(e) => setStoneProperties({ ...stoneProperties, type: e.target.value })} className="w-full adminTextField bg-primary capitalize">
                        {
                          stoneTypes.map(stone => (
                            <option key={stone} value={stone}>{stone}</option>
                          ))
                        }
                      </select>
                    </div>
                    {/* stone quantity */}
                    <div className="flex flex-col w-full">
                      <label htmlFor="stoneQ" className="text-success">Quantity<span className="text-red-600 text-xl">*</span></label>
                      <input type="number" id="stoneQ" value={stoneProperties?.quantity} onChange={(e) => setStoneProperties({ ...stoneProperties, quantity: e.target.value })} className="adminTextField" placeholder="e.g 1" min={1} />
                    </div>
                    {/* shape */}
                    <div className="flex flex-col w-full">
                      <label htmlFor="shape" className="text-success">Shape<span className="text-red-600 text-xl">*</span></label>
                      <input type="text" id="shape" value={stoneProperties?.shape} onChange={(e) => setStoneProperties({ ...stoneProperties, shape: e.target.value })} className="adminTextField" placeholder="e.g Diamond" />
                    </div>
                    {/* color */}
                    <div className="flex flex-col w-full">
                      <label htmlFor="dColor" className="text-success">Color<span className="text-red-600 text-xl">*</span></label>
                      <input type="text" id="dColor" value={stoneProperties?.color} onChange={(e) => setStoneProperties({ ...stoneProperties, color: e.target.value })} className="adminTextField" placeholder="e.g Blue" />
                    </div>
                    {/* stone weight */}
                    <div className="flex gap-3 items-center justify-center w-full">
                      <div className="flex flex-col w-full">
                        <label htmlFor="sWeight" className="text-success">Weight<span className="text-red-600 text-xl">*</span></label>
                        <input type="number" id="sWeight" value={stoneProperties?.weight?.value} onChange={(e) => setStoneProperties({ ...stoneProperties, weight: { ...stoneProperties.weight, value: e.target.value } })} className="adminTextField" placeholder="e.g 25" min={0} />
                      </div>
                      {/* stone unit */}
                      <div className="flex flex-col w-1/3">
                        <label htmlFor="sUnit" className="text-success">Unit<span className="text-red-600 text-xl">*</span></label>
                        <select id="sUnit" value={stoneProperties?.weight?.unit} onChange={(e) => setStoneProperties({ ...stoneProperties, weight: { ...stoneProperties.weight, unit: e.target.value } })} className="adminTextField">
                          <option value="g" className="bg-primary">Grams</option>
                          <option value="ct" className="bg-primary">Carats</option>{/* 0.2g */}
                          <option value="oz" className="bg-primary">Ounces</option>{/* 28.35g */}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label htmlFor="sImage" className="text-success">Image</label>
                      <label htmlFor="sImage" className="w-fit">
                        {
                          stonePreviewImage ? <img src={stonePreviewImage} alt="" className="w-10" /> : <Gem className="size-10" />
                        }
                      </label>
                      <input type="file" hidden onChange={handleStoneImageChange} accept="image/*" id="sImage" className="adminTextField" />
                    </div>
                    <button className="successBtn" type="button" onClick={handleUpdateTheStone}>{isIAmTheUpdateButton ? "Update" : "Add"}</button>
                  </div>
                  {/* actual form ends */}
                </div>
                // background blur ends
              )
            }
            <div className="flex flex-col gap-1">
              <label className="text-success">Images</label>
              <div className="w-fit grid grid-cols-5 items-center gap-2">
                {
                  previewImages.length > 0 ? (
                    previewImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img src={image} alt="" className="w-20 border border-warning rounded" />
                        <button type="button" onClick={() => handleDeleteImage(index)} className="absolute right-0 top-0"><X className="bg-red-900/20 text-red-500 rounded-full p-1 size-7 hover:scale-110 transition active:scale-90" /></button>
                      </div>
                    ))
                  ) : <p className="text-warning">No images selected</p>
                }
              </div>
              <label htmlFor="image" className="successBtn">Add Image</label>
              <input type="file" hidden onChange={handleAddImage} accept="image/*" id="image" className="adminTextField" />
            </div>
            <div className="col-span-2 justify-center flex">
              <button disabled={isUpdatingProduct} className="successBtn" type="submit"> {isUpdatingProduct ? <div className="loading" /> : "Update"} </button>
            </div>
          </div>
        </form>
      </div>
      {/* second section ends */}
    </div>
    // update product form ends
  )
}

export default UpdateProduct