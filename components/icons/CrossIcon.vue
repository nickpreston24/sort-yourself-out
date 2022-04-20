<template>
  <atoms-tooltip :text="props.tooltip">
    <svg
      viewBox="0 0 40 40"
      version="1.1"
      id="svg11426"
      inkscape:version="1.1.2 (0a00cf5339, 2022-02-04, custom)"
      sodipodi:docname="cross.svg"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1">
        <g>
          <g
            transform="matrix(1.3000519,0,0,0.91986871,-1.6630101,-1.783698)"
            style="
              font-size: 50px;
              line-height: 2.25;
              storke-width: 4.5
              stroke-miterlimit: 4;
              stroke-dasharray: none;
              stroke-opacity: 1;
            "
            :stroke="props.stroke"
            :fill="props.fill"
          >
            <path
              d="M 30.066469,39.948738 H 25.339157 L 16.579725,25.581416 7.6812553,39.948738 H 3.2783664 L 14.262416,22.707952 3.9735594,6.857552 H 8.6081793 L 16.718764,19.834488 24.875695,6.857552 h 4.402889 L 19.036074,22.61526 Z"
              id="path17098"
              style="
                storke-width: 4.5
                stroke-miterlimit: 4;
                stroke-dasharray: none;
                stroke-opacity: 1;
              "
              :stroke="props.stroke"
              :fill="props.fill"
            />
          </g>
        </g>
      </g>
    </svg>
  </atoms-tooltip>
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
