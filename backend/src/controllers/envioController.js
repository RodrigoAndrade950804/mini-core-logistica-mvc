import { calcularCostoEnvios } from "../services/calculoCostoService.js";

export const reporteEnvios = async (req, res) => {

    try {

        const {
            fechaInicio,
            fechaFin

        } = req.query;

        const resultado = await calcularCostoEnvios(

            fechaInicio,

            fechaFin

        );

        res.json(resultado);

    } catch (error) {

        res.status(500).json({

            mensaje: "Error calculando envíos",

            error: error.message

        });

    }

};