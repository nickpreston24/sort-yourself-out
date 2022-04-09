// https://v3.nuxtjs.org/docs/directory-structure/layouts/
<template>
  <div class="h-full text-white bg-regal-800">
    <lobster />
    <slot />
    <organisms-sidebar />

    <footer class="text-tahiti-500">Help</footer>
  </div>
</template>
<script setup lang="ts">
import { Right } from "@mpreston17/flexies";
import { mode } from "~~/components/organisms/sidebar/useSidebar";
import { onMounted } from "vue";

onMounted(() => {
  mode.value = "RIGHT";
});
</script>
