"use client"
import Image from "next/image";
import Link from "next/link";
// import fetchSupabaseProducts from "@/config/fetchSupabaseProducts";
// import fetchSupabaseProductsOfCategory from "@/config/fetchSupabaseProductOfCategory";
import { Product } from "@/config/fetchSupabaseSingleProduct";
import useSupabase from "@/hooks/useSupabase";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// const PRODUCT_PER_PAGE = 8;

const ProductList = ({
  categoryName,
  // limit,
  // searchParams,
}: {
  categoryName?: string;
  // limit?: number;
  // searchParams?: any;
}) => {
  const supabase = useSupabase();
  const [products, setProducts] = useState([])
  const [error, setError] = useState<PostgrestError | null>()
  const FetchSupabaseProductsOfCategory = async (categoryName: string) => {
    const fetchProductsList = async () => {
      const { data, error } = await (supabase as SupabaseClient)
        .from('products')
        .select('category, id, name, price, image_url, variants, inventory')
        .eq('category', categoryName);

      // if (error) {
      //     console.error("Error fetching products by category:", error);
      //     return;
      // }

      // console.log("Fetched products in category:", categoryName);
      // console.log(data);

      // return data;
      return { data, error }
    };

    const { data: productTemp, error } = await fetchProductsList();
    console.log("Products in category", categoryName, ":", products);
    setProducts(productTemp as never[])
    setError(error)
    return products;
  };
  const FetchProducts = async () => {
    const fetchProductsList = async () => {
      const { data, error } = await (supabase as SupabaseClient).from('products').select();
      // if (error) {
      //   return error
      // }
      // if (data) { 
      //   return data || ""
      // }
      setProducts(data as never[])
      setError(error)
      return { data, error }
    };
    const products = await fetchProductsList();
    console.log("products", products)

    return products
  }
  ////
  // useEffect(() => {
  //   FetchProducts()
  // }, [])
  useEffect(() => {
    console.log(error)
    if (categoryName) {
      FetchSupabaseProductsOfCategory(categoryName)
    } else {
      FetchProducts()
    }
  }, [])
  if (categoryName) {
    // const { data: products, error } = await fetchSupabaseProductsOfCategory(categoryName as string)
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
    // const { data: products, error } = await fetchSupabaseProducts()
    // const [products, setProducts] = useState([])
    // const [error, setError] = useState<PostgrestError | null>()
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
