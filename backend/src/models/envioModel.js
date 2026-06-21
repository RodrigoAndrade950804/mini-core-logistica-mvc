import supabase from "../config/supabase.js";


export const obtenerEnviosPorFecha = async(fechaInicio, fechaFin)=>{


const {data,error}= await supabase

.from("envios")

.select(`
    id_envio,
    peso_kg,
    fecha_envio,

    repartidor(
        id_repartidor,
        nombre
    ),

    zonas(
        id_zona,
        nombre_zona,
        tarifa_por_kg
    )

`)

.gte("fecha_envio",fechaInicio)

.lte("fecha_envio",fechaFin);



if(error){

throw error;

}



return data;


}