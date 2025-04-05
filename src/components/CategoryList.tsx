"use client"
// import fetchSupabaseProducts from "@/config/fetchSupabaseProducts";
// import fetchSupabaseProductsByCategory from "@/config/fetchSupabaseProductsByCategory";
import useSupabase from "@/hooks/useSupabase";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { GroupedProducts } from "@/config/fetchSupabaseProductsByCategory";

export interface Product {
  category: string;
  id: number;
  name: string;
  price: number;
  image_url: string;
  variants: string[];
  inventory: string[];
}

export interface GroupedProducts {
  [category: string]: Product[];
}

const CategoryList = () => {
  const [categories, setCategories] = useState<GroupedProducts | undefined>()
  const [error, setError] = useState<PostgrestError | null>()
  const supabase = useSupabase();
  console.log(error)
  //////
  const FetchSupabaseProductsByCategory = async () => {

    const fetchProductsList = async (): Promise<GroupedProducts | undefined> => {
      const { data, error } = await (supabase as SupabaseClient)
        .from('products')
        .select('category, id, name, price, image_url, variants, inventory');

      if (error) {
        setError(error)
        console.error(error);
        return;
      }

      const groupedProducts: GroupedProducts = data?.reduce((acc: GroupedProducts, product: Product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      }, {} as GroupedProducts);

      console.log(groupedProducts);
      return groupedProducts;
    };

    const products = await fetchProductsList();
    setCategories(products)
    // setError(error)
    console.log("products", products);

    return products;
  };

  useEffect(() => {
    FetchSupabaseProductsByCategory()
  }, [])

  //////
  // const categories = await fetchSupabaseProductsByCategory()
  console.log("categories:", categories)
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {categories && Object.entries(categories).map(([categoryName, products]) => (
          <Link
            href={`/list?cat=${categoryName}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={categoryName}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={products[0].image_url || "/category.png"}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {products[0].category}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
