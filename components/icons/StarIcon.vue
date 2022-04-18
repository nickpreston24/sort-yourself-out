<template>
  <!-- <?xml version="1.0" encoding="UTF-8" standalone="no"?> -->
  <!-- Created with Inkscape (http://www.inkscape.org/) -->
  <Tooltip :text="props.tooltip">
    <svg viewBox="0 0 40 40" version="1.1" xmlns:svg="http://www.w3.org/2000/svg">
      <path
        style="stroke-width: 0.355176; stroke-linejoin: round"
        :stroke="props.stroke"
        :fill="props.fill"
        d="M 29.25946,33.951739 19.577733,28.862917 9.8969661,33.95356 11.744906,23.173163 3.9118971,15.5393 14.735706,13.965468 l 4.839701,-9.808627 4.841547,9.807716 10.824111,1.571796 -7.831573,7.635336 z"
      />
    </svg>
  </Tooltip>
</template>
<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
import Tooltip from "../atoms/Tooltip.vue";

const props = defineProps({
  stroke: { default: "#fff", type: String },
  fill: { default: "#aaa", type: String },
  tooltip: { default: "" },
});
</script>
