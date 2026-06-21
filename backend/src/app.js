import express from "express";
import cors from "cors";

import { obtenerRepartidores } from "./models/repartidorModel.js";
import envioRoutes from "./routes/envioRoutes.js";


const app = express();
    
/*app.use(cors());*/ //Quitamos para deploys

app.use(cors({origin:"*"})); // Permitir solicitudes desde cualquier origen

app.use(express.json());

app.use("/api/envios", envioRoutes);

app.get("/", (req,res)=>{

    res.json({
        mensaje:"API Mini Core Logística funcionando"
    });

});


app.get("/test-db", async(req,res)=>{


    try {

        const datos = await obtenerRepartidores();

        res.json(datos);


    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }


});


export default app;