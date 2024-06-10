import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalState";
import {
  FaCartPlus,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from "react-icons/fa";
import Cart from "./Cart";
import Quantity from "./Quantity";

const ProductDetails = () => {
  const {
    open,
    getSingleProductData,
    getsingleproduct,
    Loading,
    addedItems,
    handlecartdata,
    quantity,
  } = useContext(GlobalContext);

  //  const [isDis,setIsDis]=useState(false)
  // console.log(isDis,"fdf")
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleProductData(id);
  }, [id]);

  // useEffect(()=>{
  //   const a=cartdata.some(x=>x.id===getsingleproduct.id)
  //   console.log(a)
  // },[cartdata])

  if (!getsingleproduct) {
    return Loading();
  }

  const handlePreviousClick = () => {
    const prevId = parseInt(id) > 1 ? parseInt(id) - 1 : 1;
    navigate(`/product/${prevId}`);
  };

  const handleNextClick = () => {
    const nextId = parseInt(id) + 1;
    navigate(`/product/${nextId}`);
  };

  // const handlecartdata = (id) => {
  //   // setCount((prev) => prev + 1);
  //   setCartdata([...cartdata, getsingleproduct]);
  //   setAddedItems((prevAddedItems) => [...prevAddedItems, id]);
  // };

  const quantity1 = quantity[id] || 0;
  return (
    <div className="relative flex items-center justify-center min-h-screen p-5 lg:p-10">
      <FaArrowCircleLeft
        className="absolute left-10 cursor-pointer text-gray-700 hover:text-gray-900 text-3xl"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        onClick={handlePreviousClick}
      />
      <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div className="relative">
              <img
                src={getsingleproduct?.image}
                alt={getsingleproduct?.title}
                className="w-full relative z-10 max-h-[20rem] object-contain"
              />
              <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10">
            <div className="mb-10">
              <h1 className="font-bold uppercase text-2xl mb-5">
                {getsingleproduct?.title
                  ? getsingleproduct?.title.slice(0, 45)
                  : ""}
              </h1>
              <p className="text-sm text-gray-400 font-normal mb-2">
                {getsingleproduct?.description}
              </p>
              <p className="text-sm text-gray-400 font-normal mb-2">
                Price: ${getsingleproduct?.price}
              </p>
              <p className="text-sm text-gray-400 font-normal mb-2">
                Category: {getsingleproduct?.category}
              </p>
              <p className="text-sm text-gray-400 font-normal mb-2">
                Rating: {getsingleproduct?.rating.rate} (
                {getsingleproduct?.rating.count} reviews)
              </p>
            </div>
            <div>
              <div className="inline-block align-bottom mr-5">
                <span className="text-2xl leading-none align-baseline">$</span>
                <span className="font-bold text-5xl leading-none align-baseline">
                  {Math.floor(getsingleproduct?.price)}
                </span>
                <span className="text-2xl leading-none align-baseline">
                  .{(getsingleproduct?.price % 1).toFixed(2).split(".")[1]}
                </span>
              </div>
              <div className="inline-block align-bottom rounded">
      <div className="flex">
        <button
          className="flex items-center justify-center px-10 py-2 bg-gray-800 text-white rounded-lg"
          onClick={() => handlecartdata(id)}
        >
          <FaCartPlus className={`me-1`} />
          {addedItems.includes(id) ? `Added` : "Add to cart"}
          {/* Add to Cart */}
        </button>
        <Quantity id={id} type={'product'}/>
      </div>
    </div>
            </div>
          </div>
        </div>
      </div>
      <FaArrowCircleRight
        className="absolute right-10 cursor-pointer text-gray-700 hover:text-gray-900 text-3xl"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        onClick={handleNextClick}
      />
      {/* <FaCartPlus
        className="fixed right-0 cursor-pointer text-black-700 hover:text-gray-900 text-3xl me-2"
        style={{ top: '15', transform: 'translateY(-50%)' }}
        onClick={() => setOpen(!open)}
      /> */}
      {open && <Cart quantity={quantity1}/>}
    </div>
  );
};

export default ProductDetails;
