<template>
  <h1 class="text-4xl text-crimson-500" v-if="type === 'h1'">
    <slot></slot>
  </h1>
  <h2 class="text-3xl text-crimson-500" v-if="type === 'h2'">
    <slot></slot>
  </h2>
  <h3 class="text-2xl text-crimson-500" v-if="type === 'h3'">
    <slot></slot>
  </h3>
  <h4 class="text-xl text-crimson-500" v-if="type === 'h4'">
    <slot></slot>
  </h4>
  <b class="text-lg font-bold text-tahiti-500" v-if="type === 'b'">
    <slot></slot>
  </b>
  <p class="text-lg text-tahiti-500" v-else-if="type === 'p'">
    <slot></slot>
  </p>
  <span v-else></span>
</template>

<script setup lang="ts">
const props = defineProps({
  type: { required: false, default: "p" },
});
</script>
