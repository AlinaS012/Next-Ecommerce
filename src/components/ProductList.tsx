

import Image from "next/image";
import Link from "next/link";
import fetchSupabaseProducts from "@/config/fetchSupabaseProducts";
import fetchSupabaseProductsOfCategory from "@/config/fetchSupabaseProductOfCategory";
import { Product } from "@/config/fetchSupabaseSingleProduct";

// const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryName,
  // limit,
  // searchParams,
}: {
  categoryName?: string;
  // limit?: number;
  // searchParams?: any;
}) => {
  if (categoryName) {
    const { data: products, error } = await fetchSupabaseProductsOfCategory(categoryName as string)
    console.log(error)
    return (
      <div className="w-full mt-12 flex gap-x-2 gap-y-16 justify-between flex-wrap">
        {products && (products as Product[]).map((product, index) => (
          <Link key={index} href={`/product?productId=${product.id}`} className="w-full flex flex-col gap-4 sm:w-[45%] lg:[22%]">           <div className="relative w-full h-80">
            {/* First image */}
            <Image
              src={product.image_url || "/product.png"}
              alt=""
              fill
              sizes="50vw"
              className="absolute rounded-md z-10 transition-opacity ease-in-out duration-500" // hover:opacity-0 

            />
            <div className="absolute flex justify-center bottom-[-25px] gap-[50px]">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">${product.price}</span>
            </div>
          </div>
          </Link>
        ))}
      </div >
    )
  } else {
    const { data: products, error } = await fetchSupabaseProducts()
    console.log("Fetch Products Error: ", error)
    return (
      <div className="w-full mt-12 flex gap-x-2 gap-y-16 justify-between flex-wrap">
        {products && (products as Product[]).map((product, index) => (
          <Link key={index} href={`/product?productId=${product.id}`} className="w-full flex flex-col gap-4 sm:w-[45%] lg:[22%]">           <div className="relative w-full h-80">
            {/* First image */}
            <Image
              src={product.image_url || "/product.png"}
              alt=""
              fill
              sizes="50vw"
              className="absolute rounded-md z-10 transition-opacity ease-in-out duration-500" // hover:opacity-0 

            />
            <div className="absolute flex justify-center bottom-[-25px] gap-[50px]">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">${product.price}</span>
            </div>
          </div>
          </Link>
        ))}
      </div >
    )
  }
}
export default ProductList;
