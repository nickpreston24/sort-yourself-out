<template>
  <Tooltip :text="props.tooltip">
    <svg
      viewBox="0 0 40 40"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          style="
            stroke-width: 1.53932;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          :fill="props.fill"
          :stroke="props.stroke"
          d="m 6.9445149,25.407436 7.1299801,-0.04491 v 0 l -0.180864,0.90261"
        />
        <path
          style="
            stroke-width: 1.73677;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          :fill="props.fill"
          :stroke="props.stroke"
          d="m 7.0186606,29.896725 21.7204674,-0.0188 v 0 l -0.550979,0.37718"
        />
        <g
          transform="matrix(0.3168765,-0.28841572,0.2884271,0.31686399,-44.70985,36.830527)"
        >
          <rect
            style="
              stroke-width: 4;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
            "
            width="36.930672"
            height="12.86821"
            x="136.93073"
            y="64.607346"
            :fill="props.fill"
            :stroke="props.stroke"
          />
          <path
            style="
              stroke-width: 16.4358;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
            "
            transform="matrix(0.18252845,0,0,0.18252845,65.433122,33.813289)"
            :fill="props.fill"
            :stroke="props.stroke"
            d="m 366.73053,242.10394 -33.31545,-18.59072 -33.31545,-18.59072 32.75776,-19.55667 32.75776,-19.55667 0.55769,38.14739 z"
          />
        </g>
        <rect
          style="
            fill-opacity: 1;

            stroke-width: 1.5;
            stroke-linejoin: round;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
          "
          :fill="props.fill"
          :stroke="props.stroke"
          width="30.051456"
          height="30.050272"
          x="4.4742718"
          y="4.4742708"
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
  fill: { default: "transparent", type: String },
  tooltip: { default: "" },
});
</script>
