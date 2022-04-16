<template>
  <button
    class="font-bold text-white rounded-lg shadow-md p-tiny shadow-tahiti-500/30 md:text-lg sm:text-tiny"
    :class="COLORS[props.color]"
  >
    <slot></slot>
  </button>
</template>
<script setup>
const DEFAULT = "border border-solid border-transparent";

const COLORS = {
  tahiti: "text-white bg-tahiti-400 hover:bg-tahiti-500",
  lobster: "text-white bg-crimson-400 hover:bg-crimson-500",
};
// import { primaryButton } from "../../hooks/useTheme";
const props = defineProps({
  color: { type: String, default: "tahiti" },
});
// const shade = ref("ocean");
// const style = computed(() => `bg-${shade.value}-500 shadow-${shade.value}-400/50`);
</script>
