<script setup>

defineProps({
  datos: Array
})

</script>

<template>

<table class="w-full border-collapse">

  <thead>

    <tr class="bg-gray-200">

      <th class="border p-3">
        Repartidor
      </th>

      <th class="border p-3">
        Email
      </th>

      <th class="border p-3">
        Cantidad envíos
      </th>

      <th class="border p-3">
        Total Kg
      </th>

      <th class="border p-3">
        Costo Total
      </th>

    </tr>

  </thead>

  <tbody>

    <tr
      v-for="item in datos"
      :key="item.repartidor"
      class="text-center"
    >

      <td class="border p-3">
        {{ item.repartidor }}
      </td>

      <td class="border p-3">
        {{ item.email }}
      </td>

      <td class="border p-3">
        {{ item.cantidad_envios }}
      </td>

      <td class="border p-3">
        {{ item.total_kg }} kg
      </td>

      <td class="border p-3 font-bold">
        ${{ item.costo_total.toFixed(2) }}
      </td>

    </tr>

  </tbody>

</table>

</template>