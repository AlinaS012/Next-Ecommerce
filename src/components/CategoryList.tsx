import fetchSupabaseProducts from "@/config/fetchSupabaseProducts";
import fetchSupabaseProductsByCategory from "@/config/fetchSupabaseProductsByCategory";
import Image from "next/image";
import Link from "next/link";
import { GroupedProducts } from "@/config/fetchSupabaseProductsByCategory";

const CategoryList = async () => {
  const categories = await fetchSupabaseProductsByCategory()
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
