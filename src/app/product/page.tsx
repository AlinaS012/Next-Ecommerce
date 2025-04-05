"use client"
// import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import useSupabase from "@/hooks/useSupabase";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
// import Reviews from "@/components/Reviews";
// import fetchSingleProduct from "@/config/fetchSupabaseSingleProduct";

export type Product = {
  id: number | any;
  name: string | any;
  price: number | any;
  category: string | any;
  variants: string[] | any;
  inventory: string[] | any;
  image_url: string | any;
};


const SinglePage = ({ searchParams }: { searchParams: { productId: string | undefined } }) => {

  const productName = parseInt(searchParams.productId as string) || 1;
  const [product, setProduct] = useState<Product | null>()
  const [error, setError] = useState<PostgrestError | null>()
  const otherImages = [
    {
      id: 2,
      url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    }
  ]
  // const { data: product, error: singleProdcutError } = await fetchSingleProduct(productName)

  const FetchSingleProduct =
    async (productName: number):
      Promise<{ data: Product | null, error: any }> => {
      const supabase = useSupabase();
      console.log(productName, "productname")
      try {
        const { data, error } = await (supabase as SupabaseClient)
          .from('products')
          .select('id, name, price, category, variants, inventory, image_url')
          .eq('id', productName)
        setProduct((data as Product[])[0])

        console.log(error)
        if (!data || data.length === 0) {
          console.log("No product found");
          return { data: null, error: null };
        }
        setError(error)
        return { data: data[0] as Product, error: null };

      } catch (err) {
        console.error("Unexpected error fetching products:", err);
        return { data: null, error: err };
      }
    };
  useEffect(() => {
    FetchSingleProduct(productName)
    // const firstImg = {
    //   id: 1, url: (product?.image_url as string)
    // }
  }, [])
  // console.log(singleProdcutError)
  return (
    product ?
      (<div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages
            items={[{ id: 1, url: (product?.image_url as string) }, ...otherImages]}
          />
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">
            {product.name}
          </h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorum debitis vitae omnis perferendis voluptatem eos explicabo dolore eum! Nisi porro ullam soluta laborum necessitatibus repudiandae asperiores reiciendis sapiente deleniti!
          </p>
          <div className="h-[2px] bg-gray-100" />

          <h2 className="font-medium text-2xl">
            ${product.price}
          </h2>

          <div className="h-[2px] bg-gray-100" />
          <CustomizeProducts productId={product.id}
            variants={product.variants}
            inventory={product.inventory}
            category={product.category}
          />
          <div className="h-[2px] bg-gray-100" />
          {/* {product.additionalInfoSections?.map((section: any) => ( */}
          <div className="text-sm" //key={section.title}
          >
            <h4 className="font-medium mb-4">
              {/* {section.title} */}
              Title
            </h4>
            <p>
              {/* {section.description} */}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic dolorum debitis vitae omnis perferendis voluptatem eos explicabo dolore eum! Nisi porro ullam soluta laborum necessitatibus repudiandae asperiores reiciendis sapiente deleniti!
            </p>
          </div>
          {/* // ))} */}
          <div className="h-[2px] bg-gray-100" />
          {/* REVIEWS */}
          {/* <h1 className="text-2xl">User Reviews</h1>
          <Suspense fallback="Loading...">
            <Reviews productId={product.id} />
          </Suspense> */}
        </div>
      </div>) : null
  );
};

export default SinglePage;
