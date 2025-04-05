"use client";

import { useState } from "react";

const Add = ({
  productId,
  selectedColor,
  selectedSize,
  category
}: {
  productId: number;
  selectedColor: string;
  selectedSize: string;
  category: string;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i") {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    console.log(category, "category")
    if (!selectedSize && category !== 'Accessories') {
      alert('Please Select Size');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-36 text-sm rounded-3xl ring-1 ring-black text-black py-2 px-4 hover:bg-black hover:text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
