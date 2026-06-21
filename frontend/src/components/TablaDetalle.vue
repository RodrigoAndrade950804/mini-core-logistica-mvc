<script setup>

defineProps({

    datos: Array

})

</script>

<template>

<table class="w-full border-collapse mb-10">

    <thead>

        <tr class="bg-gray-200">

            <th class="border p-3">
                Repartidor
            </th>

            <th class="border p-3">
                Fecha
            </th>

            <th class="border p-3">
                Zona
            </th>

            <th class="border p-3">
                Peso
            </th>

            <th class="border p-3">
                Tarifa/Kg
            </th>

            <th class="border p-3">
                Costo
            </th>

        </tr>

    </thead>

    <tbody>

        <tr

            v-for="item in datos"

            :key="item.fecha + item.zona"

            class="text-center"

        >

            <td class="border p-3">

                {{ item.repartidor }}

            </td>

            <td class="border p-3">

                {{ item.fecha }}

            </td>

            <td class="border p-3">

                {{ item.zona }}

            </td>

            <td class="border p-3">

                {{ item.peso_kg }} kg

            </td>

            <td class="border p-3">

                ${{ item.tarifa_por_kg.toFixed(2) }}

            </td>

            <td class="border p-3 font-bold">

                ${{ item.costo_envio.toFixed(2) }}

            </td>

        </tr>

    </tbody>

</table>

</template>