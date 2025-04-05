"use client";

import { useState } from "react";
import Add from "./Add";

// type ProductVariant = {
//   variant: string[]; 
//   color: string;   // e.g. "red"
//   size: string | null;  // e.g. "small" or null if no size
//   available: boolean; // True if the variant is in stock, false otherwise
// };

// interface Product {
//   variants: string[];
//   inventory: string[];
// }

const CustomizeProducts = ({
  productId,
  variants,
  inventory,
  category
}: {
  productId: number;
  variants: string[];
  inventory: string[];
  category: string;
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const processedVariants = variants.map((variant, index) => {
    const [color, size] = variant.split('/');
    return {
      variant,
      color,
      size: size || null, 
      available: inventory[index] === 'In stock', 
    };
  });

  const colors = [...new Set(processedVariants.map((v) => v.color))];

  const sizesByColor = colors.reduce((acc: { [color: string]: string[] }, color) => {
    const availableSizes = processedVariants
      .filter((v) => v.color === color && v.available && v.size)
      .map((v) => v.size);

    acc[color] = [...new Set(availableSizes)] as string[];
    return acc;
  }, {});

  const availableSizes = selectedColor ? sizesByColor[selectedColor] : [];

  const availableColors = selectedSize
    ? processedVariants.filter((v) => v.size === selectedSize && v.available).map((v) => v.color)
    : colors; 

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(null); 
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Color Options */}
      <div>
        <h4 className="font-medium">Choose a color:</h4>
        <ul className="flex items-center gap-3">
          {availableColors.map((color) => {
            const isDisabled = !sizesByColor[color].length; 
            const isSelected = selectedColor === color;

            return (
              <li
                key={color}
                className={`w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative ${isDisabled ? 'opacity-50' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              >
                {isSelected && (
                  <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Size Options based on selected color */}
      {selectedColor && (
        <div>
          <h4 className="font-medium">Choose a size:</h4>
          <ul className="flex items-center gap-3">
            {availableSizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <li
                  key={size}
                  className={`ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm cursor-pointer ${isSelected ? 'bg-pink-400 text-white' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size ? size : "No size available for this color"}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <Add
        productId={productId}
        selectedColor={selectedColor as string}
        selectedSize={selectedSize as string}
        category={category}
      />
    </div>
  );
};

export default CustomizeProducts;
