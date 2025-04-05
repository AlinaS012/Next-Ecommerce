import useSupabase from "@/hooks/useSupabase";
import { SupabaseClient } from "@supabase/supabase-js";

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

const FetchSupabaseProductsByCategory = async () => {
  const supabase = useSupabase();

  const fetchProductsList = async (): Promise<GroupedProducts | undefined> => {
    const { data, error } = await (supabase as SupabaseClient)
      .from('products')
      .select('category, id, name, price, image_url, variants, inventory');

    if (error) {
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
  console.log("products", products);

  return products;
};

export default FetchSupabaseProductsByCategory;
