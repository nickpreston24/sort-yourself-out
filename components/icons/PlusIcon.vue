<template>
  <!-- <?xml version="1.0" encoding="UTF-8" standalone="no"?> -->
  <!-- Created with Inkscape (http://www.inkscape.org/) -->
  <Tooltip :text="props.tooltip">
    <svg viewBox="0 0 40 40" version="1.1">
      <g>
        <g
          style="font-size: 10.5833px; line-height: 1.25; stroke-width: 0.264583"
          transform="matrix(6.5036702,0,0,6.5036702,-556.337,-456.13516)"
        >
          <path
            style="stroke-width: 0.355176; stroke-linejoin: round"
            :stroke="props.stroke"
            :fill="props.fill"
            d="m 89.034606,72.895259 h 2.106077 v 0.751414 h -2.106077 v 2.18016 h -0.761997 v -2.18016 h -2.106077 v -0.751414 h 2.106077 v -2.190743 h 0.761997 z"
            id="path12733"
          />
        </g>
      </g>
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
