<template>
  <div class="p-8 text-gray-500 text-center">
    <p>404 — Not Found</p>
    <router-link
      :to="{ name: 'SolNote' }"
      class="block text-yellow-500 hover:underline mt-2"
    >
      Go back solnote
    </router-link>
  </div>
</template>
