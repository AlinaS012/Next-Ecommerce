import useSupabase from "@/hooks/useSupabase";
import { SupabaseClient } from "@supabase/supabase-js";

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    variants: string[];
    inventory: string[];
    image_url: string;
};

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
            console.log(error)
            if (!data || data.length === 0) {
                console.log("No product found");
                return { data: null, error: null };
            }

            return { data: data[0] as Product, error: null };

        } catch (err) {
            console.error("Unexpected error fetching products:", err);
            return { data: null, error: err };
        }
    };

export default FetchSingleProduct;
