import { useEffect, useRef, useState } from "react";

const HomePage = () => {
  const images = ["jewelry-1.jpg", "jewelry-2.jpg", "jewelry-3.jpeg", "jewelry-4.jpeg"];
  const sliderRef = useRef();
  const [sliderCount, setSliderCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderCount(prev => (prev + 1) % images.length);
    }, 3000);
    return clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.src = images[sliderCount];
    }
  }, [sliderCount, images]);
  return (
    // homepage starts
    <div>
      {/* first section starts */}
      <div className="">
        <h1>Jewelry That Speaks Without Words.</h1>
        <p>Luxury isn’t just how it looks — it’s how it makes you feel, every time you wear it.</p>
      </div>
      {/* first section ends */}
      {/* second sections starts */}
      <div className="">
        <img ref={sliderRef} src={images[sliderCount]} alt="" />
      </div>
      {/* second section ends */}
    </div>
    // homepage ends
  )
}

export default HomePage