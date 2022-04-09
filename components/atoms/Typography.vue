<template>
  <h1 class="text-4xl text-crimson-500" v-if="type === 'h1'">
    <slot></slot>
  </h1>
  <h2 class="text-3xl text-crimson-600" v-if="type === 'h2'">
    <slot></slot>
  </h2>
  <h3 class="text-2xl text-crimson-700" v-if="type === 'h3'">
    <slot></slot>
  </h3>
  <h4 class="text-xl text-crimson-800" v-if="type === 'h4'">
    <slot></slot>
  </h4>
  <b class="m-2 text-lg font-bold text-regal-200" v-if="type === 'b'">
    <slot></slot>
  </b>
  <p class="m-2 text-lg text-regal-200" v-else-if="type === 'p'">
    <slot></slot>
  </p>
  <span v-else></span>
</template>

<script setup lang="ts">
const props = defineProps({
  type: { required: false, default: "p" },
});
</script>
