// https://v3.nuxtjs.org/docs/directory-structure/layouts/
<template>
  <div class="h-full text-white bg-regal-800">
    <slot />
    <organisms-sidebar />

    <footer class="text-tahiti-500">Help</footer>
  </div>
</template>
<script setup lang="ts">
import { mode, collapsed } from "~~/components/organisms/sidebar/useSidebar";
import { onMounted } from "vue";

onMounted(() => {
  mode.value = "RIGHT";
  setTimeout(() => {
    collapsed.value = true;
  }, 2250);
});
</script>
