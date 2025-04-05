"use client"

import useSupabase from "@/hooks/useSupabase";  
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const UseSupabase = () => {
    const [user, setUser] = useState<null | string>(null);
    const [error, setError] = useState<null | string>(null);
    const supabase = useSupabase();  
    console.log(user, error)
    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await (supabase as SupabaseClient).from('users').select();
            if (error) {
                setError('Could not fetch user');
                setUser(null);
            }
            if (data) {
                console.log(data, "data")
                setUser(data[0]?.name || '');  
            }
        };
        fetchUser();
    }, [supabase]);
    return (<></>)
}

export default UseSupabase