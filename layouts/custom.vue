// https://v3.nuxtjs.org/docs/directory-structure/layouts/
<template>
  <div>
    <lobster />
    <slot />
    <organisms-sidebar />
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
