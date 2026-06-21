/*const API = "http://localhost:3000/api/envios";*/
const API = import.meta.env.VITE_API_URL;



export const obtenerReporte = async(fechaInicio,fechaFin)=>{


const respuesta = await fetch(

`${API}/reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`

);



const datos = await respuesta.json();


return datos;


}