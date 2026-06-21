import express from "express";

import {
reporteEnvios

} from "../controllers/envioController.js";



const router = express.Router();



router.get(
"/reporte",
reporteEnvios
);



export default router;