import { obtenerEnviosPorFecha } from "../models/envioModel.js";

export const calcularCostoEnvios = async (fechaInicio, fechaFin) => {

    const envios = await obtenerEnviosPorFecha(
        fechaInicio,
        fechaFin
    );

    const detalle = [];
    const resumen = {};

    envios.forEach((envio) => {

        const peso = Number(envio.peso_kg);

        const tarifa = Number(envio.zonas.tarifa_por_kg);

        const costo = peso * tarifa;

        // =====================
        // DETALLE POR ENVIO
        // =====================

        detalle.push({

            repartidor: envio.repartidor.nombre,

            fecha: envio.fecha_envio,

            zona: envio.zonas.nombre_zona,

            peso_kg: peso,

            tarifa_por_kg: tarifa,

            costo_envio: costo

        });

        // =====================
        // RESUMEN POR REPARTIDOR
        // =====================

        const nombre = envio.repartidor.nombre;

        if (!resumen[nombre]) {

            resumen[nombre] = {

                repartidor: nombre,

                cantidad_envios: 0,

                total_kg: 0,

                costo_total: 0

            };

        }

        resumen[nombre].cantidad_envios++;

        resumen[nombre].total_kg += peso;

        resumen[nombre].costo_total += costo;

    });

    return {

        detalle,

        resumen: Object.values(resumen)

    };

};