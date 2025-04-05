import useSupabase from "@/hooks/useSupabase";
import { SupabaseClient } from "@supabase/supabase-js";

const FetchProducts = async () => {

  const supabase = useSupabase();

  const fetchProductsList = async () => {
    const { data, error } = await (supabase as SupabaseClient).from('products').select();
    // if (error) {
    //   return error
    // }
    // if (data) { 
    //   return data || ""
    // }
    return { data, error }
  };
  const products = await fetchProductsList();
  console.log("products", products)

  return products
}
export default FetchProducts;