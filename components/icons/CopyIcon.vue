<template>
  <Tooltip :text="props.tooltip">
    <svg
      viewBox="0 0 40 40"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <g>
        <g transform="matrix(1.1071763,0,0,0.99677972,0.25808477,-2.3988062)">
          <path
            style="
              fill-opacity: 0.435294;
              stroke-width: 2;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
            "
            d="M 5.2829313,6.4162483 H 24.491849 l 0.01363,5.5638957 -13.233476,0.01594 -0.0037,20.201736 -5.9854067,0.02034 z"
            sodipodi:nodetypes="ccccccc"
            :stroke="props.stroke"
            :fill="props.fill"
          />
          <rect
            style="
              fill-opacity: 0.435294;
              stroke-width: 2;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
            "
            width="19.208918"
            height="25.801922"
            x="11.271997"
            y="11.996085"
            :stroke="props.stroke"
            :fill="props.fill"
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
