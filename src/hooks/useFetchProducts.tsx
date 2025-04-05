"use client"

import useSupabase from "@/hooks/useSupabase";  
import { SupabaseClient } from "@supabase/supabase-js";
import { Suspense, useState, useEffect } from "react";

const UseFetchProducts = async () => {
    const [products, setProducts] = useState<null | string[]>(null);
    const [error, setError] = useState<null | string>(null);
    const supabase = useSupabase();  
    console.log(error)
    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await (supabase as SupabaseClient).from('products').select();
            if (error) {
                setError('Could not fetch user');
                setProducts(null);
            }
            if (data) {
                console.log(data, "data")
                setProducts(data || '');  
            }
        };
        fetchProducts();
    }, [supabase]);

    return products
}

export default UseFetchProducts