import { createRouter, createWebHistory } from "vue-router";


import ReporteEnvios from "../views/ReporteEnvios.vue";



const routes = [


{

path:"/",

name:"Reporte",

component:ReporteEnvios

}


];




const router = createRouter({


history:createWebHistory(),


routes


});



export default router;