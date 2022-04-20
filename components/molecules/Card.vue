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
  if (props?.enableShadow) return "shadow-none";
  return isHovering?.value ? "shadow-xl" : "shadow-lg";
});
const props = defineProps({
  enableShadow: { default: true },
});
</script>
<style scoped>
.resizeable {
  resize: horizontal;
  overflow: hidden;
}
</style>
