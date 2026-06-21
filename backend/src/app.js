import express from "express";
import cors from "cors";

import { obtenerRepartidores } from "./models/repartidorModel.js";
import envioRoutes from "./routes/envioRoutes.js";

const app = express();

// =========================
// MIDDLEWARES
// =========================

app.use(cors({
    origin: "*"
})); // Permitir solicitudes desde cualquier origen

app.use(express.json());

// =========================
// ROUTES
// =========================

app.use("/api/envios", envioRoutes);

// =========================
// HEALTH CHECK
// =========================

app.get("/", (req, res) => {

    res.json({
        mensaje: "API Mini Core Logística funcionando"
    });

});

// =========================
// TEST DATABASE
// =========================

app.get("/test-db", async (req, res) => {

    try {

        const datos = await obtenerRepartidores();

        res.json(datos);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});

export default app;