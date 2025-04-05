import CategoryList from "@/components/CategoryList";
// import CheckStatus from "@/components/CheckStatus";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import UseSupabase from "@/components/UseSupabase";
// import { SupabaseClient } from "@supabase/supabase-js";
// import { redirect, useRouter } from "next/navigation";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="">
      {/* <CheckStatus/> */}
      <UseSupabase />
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            // limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      {/* <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            // limit={4}
          />
        </Suspense>
      </div> */}
    </div>
  );
};

export default HomePage;




