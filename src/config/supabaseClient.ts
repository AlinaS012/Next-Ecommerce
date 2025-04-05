
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_NON_KEY

console.log(supabaseKey, supabaseUrl, "console from env in ts")
export const supabase = createClient(supabaseUrl as string, supabaseKey as string)

export default supabase