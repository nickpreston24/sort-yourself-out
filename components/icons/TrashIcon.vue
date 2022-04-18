<template>
  <Tooltip :text="props.tooltip">
    <svg viewBox="0 0 40 40" version="1.1" xmlns:svg="http://www.w3.org/2000/svg">
      <g>
        <path
          style="
            stroke-width: 1.93269;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          :stroke="props.stroke"
          :fill="props.fill"
          d="M 12.245234,35.244904 9.0334892,11.869763 32.400771,11.995799 29.323961,35.235138 Z"
        />
        <ellipse
          style="
            stroke-width: 1.5645;
            stroke-linejoin: round;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
          "
          cx="11.969104"
          cy="28.123055"
          rx="0.23110102"
          ry="8.6534271"
          transform="matrix(0.935249,-0.35399055,0.14494176,0.98944019,0,0)"
          :stroke="props.stroke"
          :fill="props.fill"
        />
        <ellipse
          style="
            stroke-width: 1.5645;
            stroke-linejoin: round;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
          "
          cx="-30.378166"
          cy="13.223783"
          rx="0.23110102"
          ry="8.6534271"
          transform="matrix(-0.935249,-0.35399055,-0.14494176,0.98944019,0,0)"
          :stroke="props.stroke"
          :fill="props.fill"
        />
        <ellipse
          style="
            stroke-width: 1.5645;
            stroke-linejoin: round;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
          "
          :stroke="props.stroke"
          :fill="props.fill"
          cx="21.407017"
          cy="28.242477"
          rx="0.23110102"
          ry="8.6534271"
          transform="matrix(0.97668096,-0.21469584,0,1,0,0)"
        />
        <ellipse
          style="
            fill-opacity: 1;
            stroke-width: 1.10708;
            stroke-linejoin: round;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
          "
          :stroke="props.stroke"
          :fill="props.fill"
          cx="20.81917"
          cy="8.3245554"
          rx="13.091656"
          ry="0.91003436"
        />
        <path
          style="
            stroke-width: 1.28846;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          :stroke="props.stroke"
          :fill="props.fill"
          d="m 16.668608,7.1900187 -0.434779,-2.8998506 1.143966,-0.8464418 7.612237,0.1430692 1.115972,0.8366657 -0.653649,2.6634014 z"
        />
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
