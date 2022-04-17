<template>
  <div class="animate-fade-out">
    <div :class="animation" @mouseover="isHovering = true" @mouseout="isHovering = false">
      <div class="h-1/3">
        <slot name="header"></slot>
      </div>
      <div class="h-auto">
        <slot></slot>
      </div>
      <div class="h-1/3">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
const isHovering = ref(false);
const animation = computed(() => {
  return isHovering?.value ? "shadow-xl" : "shadow-lg";
});
</script>
<style scoped>
.resizeable {
  resize: horizontal;
  overflow: hidden;
}
</style>
