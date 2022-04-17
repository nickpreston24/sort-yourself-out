<template>
  <button
    class="font-bold text-white rounded-lg shadow-md p-tiny shadow-tahiti-500/30 md:text-lg sm:text-tiny bg-tahiti-500"
  >
    <slot></slot>
  </button>
</template>
<script setup>
import { darkMode, backgrounds } from "~~/hooks/useTheme";
// const DEFAULT = "border border-solid border-transparent";
//    :class="darkMode ? backgrounds.tahiti : backgrounds.sunglo"

// const props = defineProps({
//   color: { type: String, default: "tahiti" },
// });
</script>
