<template>
  <atoms-tooltip :text="props.tooltip">
    <svg
      viewBox="0 0 40 40"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <g inkscape:label="Layer 1" inkscape:groupmode="layer">
        <g>
          <rect
            style="
              fill-opacity: 0.435294;
              stroke-width: 2.61179;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
              paint-order: stroke markers fill;
            "
            width="32.38821"
            height="28.835236"
            x="4.3058949"
            y="6.8588715"
            :stroke="props.stroke"
            :fill="props.fill"
          />
          <path
            style="
              stroke-width: 2.8718;
              stroke-linecap: butt;
              stroke-linejoin: miter;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
            "
            :stroke="props.stroke"
            :fill="props.fill"
            d="M 4.4392881,13.179647 C 36.413933,13.329389 36.413933,13.329389 36.413933,13.329389"
          />
          <rect
            style="
              fill-opacity: 0.435294;
              stroke-width: 2.61179;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
              paint-order: stroke markers fill;
            "
            :stroke="props.stroke"
            :fill="props.fill"
            width="5.4323006"
            height="5.0266728"
            x="8.6730843"
            y="25.784901"
          />
          <rect
            style="
              fill-opacity: 1;
              stroke-width: 2.61179;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
              paint-order: stroke markers fill;
            "
            width="5.4323006"
            height="5.0266728"
            x="18.41564"
            y="25.784901"
            :stroke="props.stroke"
            :fill="props.fill"
          />
          <rect
            style="
              fill-opacity: 0.435294;
              stroke-width: 2.61179;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
              paint-order: stroke markers fill;
            "
            width="5.4323006"
            height="5.0266728"
            x="18.354258"
            y="17.535425"
            :stroke="props.stroke"
            :fill="props.fill"
          />
          <rect
            style="
              fill-opacity: 0.435294;
              stroke-width: 2.61179;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
              paint-order: stroke markers fill;
            "
            :stroke="props.stroke"
            :fill="props.fill"
            width="5.4323006"
            height="5.0266728"
            x="28.060486"
            y="17.66061"
          />
          <rect
            style="
              fill-opacity: 1;
              stroke-width: 2.61179;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
              paint-order: stroke markers fill;
            "
            width="5.4323006"
            height="5.0266728"
            x="28.065338"
            y="25.873217"
            :stroke="props.stroke"
            :fill="props.fill"
          />
          <ellipse
            style="
              fill-opacity: 1;
              stroke-width: 2.61179;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
              paint-order: stroke markers fill;
            "
            :stroke="props.stroke"
            :fill="props.fill"
            cx="27.436428"
            cy="6.6113939"
            rx="0.092417389"
            ry="3.2144489"
          />
          <ellipse
            style="
              fill-opacity: 1;
              stroke-width: 2.61179;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
              paint-order: stroke markers fill;
            "
            cx="14.215027"
            cy="6.5203438"
            rx="0.092417389"
            ry="3.2144489"
            :stroke="props.stroke"
            :fill="props.fill"
          />
        </g>
      </g>
    </svg>
  </atoms-tooltip>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import Tooltip from "../atoms/Tooltip.vue";

const props = defineProps({
  stroke: { default: "#fff", type: String },
  fill: { default: "transparent", type: String },
  tooltip: { default: "Date" },
});
</script>
