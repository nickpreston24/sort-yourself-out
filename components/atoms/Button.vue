<template>
  <button
    class="font-bold text-white rounded-lg shadow-md p-tiny bg-tahiti-500 shadow-tahiti-500/30 md:text-lg sm:text-tiny"
  >
    <slot></slot>
  </button>
</template>
<script setup>
// import { primaryButton } from "../../hooks/useTheme";
// const props = defineProps({
//   color: { type: String, default: "green" },
// });
// const shade = ref("ocean");
// const style = computed(() => `bg-${shade.value}-500 shadow-${shade.value}-400/50`);
</script>
