import { Gem, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { createProduct } from "../../../../store/slices/admin/product.slice";
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react";

const CreateProduct = () => {
  const categories = useMemo(() => {
    return ["ring", "necklace", "bracelet", "earrings", "pendant", "anklet", "other"];
  }, []);
  const stoneTypes = useMemo(() => {
    return ["agate", "amethyst", "apatite", "aquamarine", "adventurine", "carnelian", "chrysoprase", "citrine", "diamond", "emerald", "garnet", "honey quartz", "jade", "lab grown blue sapphire", "lab grown diamond", "lab grown emerald", "lab grown ruby", "lab grown white sapphire", "multi", "neon apatite", "onyx", "opal", "pearl", "peridot", "prasiolite", "quartz", "ruby", "sapphire", "sodalite", "swiss blue topaz", "tiger eye", "topaz", "tourmaline", "tsavorite", "turquoise", "none"];
  }, []);
  const [previewImages, setPreviewImages] = useState([]);
  console.log(previewImages);
  const [imageFiles, setImageFiles] = useState([]);
  console.log(imageFiles);

  const [stonePreviewImages, setStonePreviewImages] = useState([]);
  const [stonePreviewImage, setStonePreviewImage] = useState(null);
  const [stoneImageFiles, setStoneImageFiles] = useState([]);
  const [allStones, setAllStones] = useState([]);
  const [id, setId] = useState(0);
  console.log(allStones[0]?.uniqueId);
  console.log(stonePreviewImages);
  const [isStoneModelOpen, setIsStoneModelOpen] = useState(false);
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.employee);

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
    }
    console.log(stoneImageFiles);
  }

  const [stoneProperties, setStoneProperties] = useState({
    type: "agate",
    quantity: 1,
    shape: "",
    color: "",
    weight: { value: 0, unit: "g" },
    uniqueId: null
  });

  const handleAddStone = () => {
    setAllStones([...allStones, { ...stoneProperties, uniqueId: id }]);
    console.log(stoneProperties);
    setId(p => p + stonePreviewImages?.length);
    console.log(allStones);
  }

  const handleDeleteStone = stoneId => {
    const filteredStones = allStones.filter(stone => stone.uniqueId !== stoneId);
    setAllStones(filteredStones);
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("category", e.target.category.value);
    formData.append("material", e.target.material.value);
    formData.append("price", e.target.price.value);
    formData.append("color", e.target.color.value);
    formData.append("stock", e.target.stock.value);
    formData.append("weightValue", e.target.weight.value);
    formData.append("weightUnit", e.target.unit.value);
    formData.append("sizeValue", e.target.size.value);
    formData.append("sizeUnit", e.target.sizeUnit.value);
    formData.append("discountFee", e.target.discountFee.value);
    formData.append("discountPercentage", e.target.discountPercentage.value);
    if (allStones) {
      formData.append("stones", JSON.stringify(allStones));
    }
    if (stoneImageFiles) {
      formData.append("stoneImages", stoneImageFiles);
    }
    if (imageFiles) {
      formData.append("imageFiles", imageFiles);
    }
    dispatch(createProduct(formData));
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  }
  return (
    // create product form start
    <div className="flex flex-col gap-10 p-1 w-full">
      {/* first section starts */}
      <div className="flex items-center justify-between pr-10">
        <h1 className="adminCardH1">Create Product</h1>
        <Link to={"/admin/dashboard/products"}><X className="size-10 text-warning hover:scale-110 active:scale-90 transition" /></Link>
      </div>
      {/* first section ends */}
      {/* second section starts */}
      <div className="flex justify-center">
        <form onSubmit={handleFormSubmit} className="w-4/5 border border-error p-3 rounded h-[80vh] overflow-y-scroll">
          <div className="flex flex-col gap-3">
            {/* name */}
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-success">Name<span className="text-red-600 text-xl">*</span></label>
              <input type="text" id="name" className="adminTextField" placeholder="e.g Golden Ring" />
            </div>
            {/* description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-success">Description<span className="text-red-600 text-xl">*</span></label>
              <input type="text" id="description" className="adminTextField" placeholder="e.g It is golden ring for men with black emarald." />
            </div>
            {/* category */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-success">Category<span className="text-red-600 text-xl">*</span></label>
              <select id="category" className="capitalize adminTextField">
                {
                  categories.map(category => (
                    <option key={category} value={category} className="bg-primary">{category}</option>
                  ))
                }
              </select>
            </div>
            {/* material */}
            <div className="flex flex-col">
              <label htmlFor="material" className="text-success">Material<span className="text-red-600 text-xl">*</span></label>
              <select id="material" className="adminTextField">
                <option value="gold" className="bg-primary">Gold</option>
                <option value="silver" className="bg-primary">Silver</option>
              </select>
            </div>
            {/* price */}
            <div className="flex flex-col w-full">
              <label htmlFor="price" className="text-success">Price<span className="text-red-600 text-xl">*</span></label>
              <input type="number" id="price" className="adminTextField" placeholder="e.g 100" min={1} />
            </div>
            {/* color */}
            <div className="flex flex-col w-full">
              <label htmlFor="color" className="text-success">Color<span className="text-red-600 text-xl">*</span></label>
              <input type="text" id="color" className="adminTextField" placeholder="e.g Golden" />
            </div>
            {/* stock */}
            <div className="flex flex-col w-full">
              <label htmlFor="stock" className="text-success">Stock<span className="text-red-600 text-xl">*</span></label>
              <input type="number" id="stock" className="adminTextField" placeholder="e.g 12" min={1} />
            </div>
            {/* weight */}
            <div className="flex gap-3 items-center justify-center">
              <div className="flex flex-col w-full">
                <label htmlFor="weight" className="text-success">Weight<span className="text-red-600 text-xl">*</span></label>
                <input type="number" id="weight" className="adminTextField" placeholder="e.g 25" min={1} />
              </div>
              {/* unit */}
              <div className="flex flex-col w-1/3">
                <label htmlFor="unit" className="text-success">Unit<span className="text-red-600 text-xl">*</span></label>
                <select id="unit" className="adminTextField">
                  <option value="g" className="bg-primary">Grams</option>
                  <option value="ct" className="bg-primary">Carats</option>{/* 0.2g */}
                  <option value="oz" className="bg-primary">Ounces</option>{/* 28.35g */}
                </select>
              </div>
            </div>
            {/* size */}
            <div className="flex gap-3 items-center justify-center">
              <div className="flex flex-col w-full">
                <label htmlFor="size" className="text-success">Size<span className="text-red-600 text-xl">*</span></label>
                <input type="number" id="size" className="adminTextField" placeholder="e.g 3" min={1} />
              </div>
              {/* unit */}
              <div className="flex flex-col w-1/3">
                <label htmlFor="sizeUnit" className="text-success">Unit<span className="text-red-600 text-xl">*</span></label>
                <select id="sizeUnit" className="adminTextField">
                  <option value="cm" className="bg-primary">Centimeters</option>
                  <option value="inch" className="bg-primary">Inches</option>
                </select>
              </div>
            </div>
            {/* discount price */}
            <div className="flex flex-col w-full">
              <label htmlFor="discountFee" className="text-success">Discount Fee</label>
              <input type="number" id="discountFee" className="adminTextField" placeholder="e.g 10" min={1} />
            </div>
            {/* discount percentage */}
            <div className="flex flex-col w-full">
              <label htmlFor="discountPercentage" className="text-success">Discount Percentage</label>
              <input type="number" id="discountPercentage" className="adminTextField" placeholder="e.g 2" min={1} />
            </div>
            {/* add stone */}
            <div className="flex flex-col w-full">
              <label htmlFor="discountPercentage" className="text-success">Stones</label>
              <div className={`${allStones.length > 0 ? "grid grid-cols-1" : "flex items-center"} gap-2`}>
                {
                  allStones.length > 0 ?
                    allStones.map(stone => (
                      <div key={stone?.uniqueId} className="flex items-center gap-1">
                        <img src={stonePreviewImages[stone?.uniqueId]} alt="" className="w-20 border border-warning rounded" />
                        <h1 className="adminCardH1 text-center">{stone?.type?.length > 7 ? stone?.type.slice(0, 7) + "..." : stone?.type}</h1>
                        <p className="adminCardSpan">{stone?.quantity}</p>
                        <p className="adminCardSpan">{stone?.weight?.value + stone?.weight?.unit}</p>
                        <p className="adminCardSpan">{stone?.shape}</p>
                        <p></p>
                        <X onClick={() => handleDeleteStone(stone?.uniqueId)} className="bg-red-900/20 text-red-500 rounded-full p-1 size-7" />
                      </div>
                    ))
                    : <p className="text-warning">No stones added</p>
                }
                <button className="successBtn " type="button" onClick={() => setIsStoneModelOpen(true)}>Add Stone</button>
              </div>
            </div>
            {/* stone */}
            {
              isStoneModelOpen && (
                // background blur starts
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-warning/20 flex items-center justify-center">
                  {/* actual form starts*/}
                  <div className="w-[40vw] bg-primary rounded border border-warning flex flex-col gap-1 p-4 items-center justify-evenly">
                    <div className="flex justify-between w-full">
                      <h1 className="adminCardH1">Select Stone</h1>
                      <X onClick={() => setIsStoneModelOpen(false)} className="size-10 text-warning hover:scale-110 active:scale-90 transition" />
                    </div>
                    {/* stones */}
                    <div className="flex flex-col w-full">
                      <label htmlFor="stone" className="text-success">Stone Name<span className="text-red-600 text-xl">*</span></label>
                      <select id="stone" value={stoneProperties.type} onChange={(e) => setStoneProperties({ ...stoneProperties, type: e.target.value })} className="w-full adminTextField bg-primary capitalize">
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
                      <input type="number" id="stoneQ" value={stoneProperties.quantity} onChange={(e) => setStoneProperties({ ...stoneProperties, quantity: e.target.value })} className="adminTextField" placeholder="e.g 1" min={1} />
                    </div>
                    {/* shape */}
                    <div className="flex flex-col w-full">
                      <label htmlFor="shape" className="text-success">Shape<span className="text-red-600 text-xl">*</span></label>
                      <input type="text" id="shape" value={stoneProperties.shape} onChange={(e) => setStoneProperties({ ...stoneProperties, shape: e.target.value })} className="adminTextField" placeholder="e.g Diamond" />
                    </div>
                    {/* color */}
                    <div className="flex flex-col w-full">
                      <label htmlFor="dColor" className="text-success">Color<span className="text-red-600 text-xl">*</span></label>
                      <input type="text" id="dColor" value={stoneProperties.color} onChange={(e) => setStoneProperties({ ...stoneProperties, color: e.target.value })} className="adminTextField" placeholder="e.g Blue" />
                    </div>
                    {/* stone weight */}
                    <div className="flex gap-3 items-center justify-center w-full">
                      <div className="flex flex-col w-full">
                        <label htmlFor="sWeight" className="text-success">Weight<span className="text-red-600 text-xl">*</span></label>
                        <input type="number" id="sWeight" value={stoneProperties.weight.value} onChange={(e) => setStoneProperties({ ...stoneProperties, weight: { ...stoneProperties.weight, value: e.target.value } })} className="adminTextField" placeholder="e.g 25" min={0} />
                      </div>
                      {/* stone unit */}
                      <div className="flex flex-col w-1/3">
                        <label htmlFor="sUnit" className="text-success">Unit<span className="text-red-600 text-xl">*</span></label>
                        <select id="sUnit" value={stoneProperties.weightUnit} onChange={(e) => setStoneProperties({ ...stoneProperties, weight: { ...stoneProperties.weight, unit: e.target.value } })} className="adminTextField">
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
                    <button className="successBtn" type="button" onClick={handleAddStone}>Add</button>
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
                    previewImages.map(image => (
                      <img key={Math.random()} src={image} alt="" className="w-20 border border-warning rounded" />
                    ))
                  ) : <p className="text-warning">No images selected</p>
                }
              </div>
              <label htmlFor="image" className="successBtn">Add Image</label>
              <input type="file" hidden onChange={handleAddImage} accept="image/*" id="image" className="adminTextField" />
            </div>
            <div className="col-span-2 justify-center flex">
              <button disabled={loading} className="successBtn" type="submit"> {loading ? <div className="loading" /> : "Create"} </button>
            </div>
          </div>
        </form>
      </div>
      {/* second section ends */}
    </div>
    // create product form ends
  )
}

export default CreateProduct