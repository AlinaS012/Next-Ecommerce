import { createClient, SupabaseClient } from "@supabase/supabase-js";

const useSupabase = (): SupabaseClient | null => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_NON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and key must be provided");
  }

  const supabase = //useMemo(() => 
    createClient(supabaseUrl, supabaseKey)//, [
    //supabaseUrl,
    //supabaseKey,
  //]
//);

  return supabase;
};

export default useSupabase;
