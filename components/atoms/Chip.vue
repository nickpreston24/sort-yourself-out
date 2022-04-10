<template>
  <button
    @click="close"
    class="inline-flex items-center font-semibold border-2 rounded-full shadow-md shadow-crimson-500/50 border-crimson-600/50 bg-crimson-600"
  >
    <Row class="m-1">
      <slot></slot>
      <slot name="icon" />
    </Row>
  </button>
</template>
<script setup>
import { computed, ref } from "vue";
import { chip } from "../../hooks/useTheme";
// const color = ref("orange");
// const text = ref("white");
// const style = computed(() => {
//   return `bg-${color?.value}-500 text-${text?.value}`;
// });
</script>
