import supabase from "../config/supabase.js";


export const obtenerZonas = async()=>{


const {data,error}= await supabase

.from("zonas")

.select("*");


if(error){

throw error;

}


return data;


}