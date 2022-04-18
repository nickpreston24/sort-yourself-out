// https://v3.nuxtjs.org/docs/directory-structure/layouts/
<template>
  <div class="h-full text-white bg-regal-800">
    <slot />
    <organisms-sidebar />
    <footer class="text-tahiti-500">Help</footer>
    <!-- <span class="absolute bottom-0 right-0 p-2 mb-4 ml-4"> -->
    <Toaster :debug="false" />
    <!-- </span> -->
  </div>
</template>
<script setup lang="ts">
import { mode, collapsed } from "~~/components/organisms/sidebar/useSidebar";
import { onMounted } from "vue";
import Toaster from "~~/components/atoms/Toaster.vue";

function listener(event) {
  // event.returnValue = "Write something"; // Notify user of refresh
  collapsed.value = true;
}

onMounted(() => {
  console.log("mounted");
  window?.addEventListener("beforeunload", listener);

  // setTimeout(() => {
  //   collapsed.value = true;
  // }, 2500);
});

onUnmounted(() => {
  window?.removeEventListener("beforeunload", listener);
  collapsed.value = true;
});
</script>
