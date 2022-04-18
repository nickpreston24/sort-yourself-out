<template>
  <h1 class="text-4xl sm:3xl text-sunglo-500 text-shadow" v-if="type === 'h1'">
    <slot></slot>
  </h1>
  <h2 class="text-3xl sm:2xl text-sunglo-500 text-shadow" v-if="type === 'h2'">
    <slot></slot>
  </h2>
  <h3 class="text-2xl sm:xl text-sunglo-600 text-shadow" v-if="type === 'h3'">
    <slot></slot>
  </h3>
  <h4 class="text-xl sm:lg text-sunglo-600 text-shadow" v-if="type === 'h4'">
    <slot></slot>
  </h4>
  <b class="m-2 text-lg font-bold sm:md text-regal-200" v-if="type === 'b'">
    <slot></slot>
  </b>
  <p class="m-2 text-lg sm:md text-regal-200" v-else-if="type === 'p'">
    <slot></slot>
  </p>
  <span v-else></span>
</template>

<script setup lang="ts">
const props = defineProps({
  type: { required: false, default: "p" },
});
</script>
<style scoped>
.text-shadow {
  text-shadow: 3px 4px 5px rgb(247 111 115 / 0.7);
}

.pop {
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa,
    0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3),
    0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15);
}
</style>
