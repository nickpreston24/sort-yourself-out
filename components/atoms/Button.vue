<template>
  <Tooltip :text="tooltip">
    <button
      class="font-bold text-white rounded-lg shadow-md p-tiny shadow-tahiti-500/30 md:text-lg sm:text-tiny"
      :class="background"
    >
      <slot></slot>
    </button>
  </Tooltip>
</template>
<script setup>
import { darkMode, backgrounds } from "~~/hooks/useTheme";
import Tooltip from "./Tooltip.vue";
const props = defineProps({
  background: { default: `bg-tahiti-500` },
  tooltip: { default: "Button" },
});
// const DEFAULT = "border border-solid border-transparent";
//    :class="darkMode ? backgrounds.tahiti : backgrounds.sunglo"

// const props = defineProps({
//   color: { type: String, default: "tahiti" },
// });
</script>
