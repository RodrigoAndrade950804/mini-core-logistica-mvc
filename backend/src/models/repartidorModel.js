import supabase from "../config/supabase.js";

export const obtenerRepartidores = async () => {

    const { data, error } = await supabase
        .from("repartidor")
        .select("*");

    if (error) {
        throw error;
    }

    return data;

};