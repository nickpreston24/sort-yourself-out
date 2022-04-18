<template>
  <div class="tooltip-box">
    <slot />
    <div v-show="text" class="rounded-full tooltip" :class="props.background">
      <span class="text font-extra-bold">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { backgrounds, darkMode } from "~~/hooks/useTheme";

const props = defineProps({
  text: { default: "[!]" },
  background: { default: "bg-sunglo-500" },
});

const { text } = props;
</script>
<style scoped>
.tooltip-box {
  position: relative;
  display: inline-block;
}

.tooltip-box:hover .tooltip {
  opacity: 1;
}

.tooltip {
  color: #ffffff;
  text-align: center;
  /* padding: 5px 0; */
  border-radius: 2px;

  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

  opacity: 0;
  transition: opacity 0.5s;

  position: absolute;
  z-index: 1;
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #c6a9fa transparent transparent transparent;
}
</style>
