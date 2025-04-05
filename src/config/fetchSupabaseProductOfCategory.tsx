import useSupabase from "@/hooks/useSupabase";
import { Product } from "./fetchSupabaseSingleProduct";
import { SupabaseClient } from "@supabase/supabase-js";

const fetchSupabaseProductsOfCategory = async (categoryName: string) => {
    const supabase = useSupabase();

    const fetchProductsList = async (): Promise<any> => {
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

    const products = await fetchProductsList();
    console.log("Products in category", categoryName, ":", products);

    return products;
};

export default fetchSupabaseProductsOfCategory;
