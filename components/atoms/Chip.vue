<template>
  <button
    @click="close"
    class="inline-flex items-center font-semibold border-2 rounded-full shadow-md"
    :class="chip"
  >
    <Row class="m-1">
      <slot></slot>
      <slot name="icon" />
    </Row>
  </button>
</template>
<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  status: { type: String, default: "Todo" },
});
const chip = computed(() => {
  switch (props.status.toLowerCase()) {
    case "in progress":
      return `bg-yellow-500 text-yellow-700 shadow-yellow-500/50 border-yellow-600/50`;

    case "done":
      return `bg-ocean-500 text-ocean-700 shadow-ocean-500/50 border-ocean-600/50`;

    case "todo":
    default:
      return `bg-crimson-600 text-crimson-800 shadow-crimson-500/50 border-crimson-600/50`;
  }
});
// import { chip } from "../../hooks/useTheme";
// const color = ref("orange");
// const text = ref("white");
// const style = computed(() => {
//   return `bg-${color?.value}-500 text-${text?.value}`;
// });
</script>
