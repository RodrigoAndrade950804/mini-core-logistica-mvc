<script setup>

import { ref } from "vue";

import { obtenerReporte } from "../services/envioService";

import TablaDetalle from "../components/TablaDetalle.vue";
import TablaResumen from "../components/TablaResumen.vue";


const fechaInicio = ref("");
const fechaFin = ref("");
const detalle = ref([]);
const resumen = ref([]);
const cargando = ref(false);

const buscar = async () => {

    if (!fechaInicio.value || !fechaFin.value) {

        alert("Seleccione ambas fechas");

        return;

    }

    try {

        cargando.value = true;

        const respuesta = await obtenerReporte(

            fechaInicio.value,

            fechaFin.value

        );

        detalle.value = respuesta.detalle;

        resumen.value = respuesta.resumen;

    } catch (error) {

        console.error(error);

        alert("Error consultando información");

    } finally {

        cargando.value = false;

    }

}

</script>


<template>

    <div class="min-h-screen bg-gray-100 p-10">

        <div class="max-w-6xl mx-auto bg-white rounded-xl shadow p-8">

            <h1 class="text-3xl font-bold mb-3">

                Mini Core Logística

            </h1>

            <p class="text-gray-600 mb-8">

                Cálculo de costos de envíos por repartidor según rango de fechas y zona de entrega.

            </p>

            <!-- FILTRO -->

            <div class="grid grid-cols-3 gap-5 mb-10">

                <div>

                    <label class="block font-semibold mb-2">

                        Fecha Inicio

                    </label>

                    <input

                        type="date"

                        v-model="fechaInicio"

                        class="border rounded-lg p-2 w-full"

                    />

                </div>

                <div>

                    <label class="block font-semibold mb-2">

                        Fecha Fin

                    </label>

                    <input

                        type="date"

                        v-model="fechaFin"

                        class="border rounded-lg p-2 w-full"

                    />

                </div>

                <div class="flex items-end">

                    <button

                        @click="buscar"

                        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full"

                    >

                        Consultar

                    </button>

                </div>

            </div>

            <div

                v-if="cargando"

                class="text-center text-gray-500 mb-6"

            >

                Consultando información...

            </div>

            <!-- TABLA DETALLE -->

            <div v-if="detalle.length">

                <h2 class="text-xl font-bold mb-4">

                    Detalle de envíos

                </h2>

                <TablaDetalle :datos="detalle"/>

            </div>

            <!-- TABLA RESUMEN -->

            <div v-if="resumen.length">

                <h2 class="text-xl font-bold mb-4">

                    Resumen por repartidor

                </h2>

                <TablaResumen :datos="resumen"/>

            </div>

            <div

                v-if="!detalle.length && !cargando"

                class="text-gray-500 text-center mt-8"

            >
                No existen datos para el rango seleccionado.

            </div>

        </div>

    </div>

</template>