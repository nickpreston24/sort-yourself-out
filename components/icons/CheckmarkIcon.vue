<template>
  <Tooltip :text="props.tooltip">
    <svg
      viewBox="0 0 40 40"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs33537">
        <inkscape:path-effect
          effect="skeletal"
          id="path-effect33833"
          is_visible="true"
          lpeversion="1"
          pattern="M 0,4.9921382 C 0,2.2364779 2.2364779,0 4.9921382,0 c 2.7556603,0 4.9921383,2.2364779 4.9921383,4.9921382 0,2.7556603 -2.236478,4.9921383 -4.9921383,4.9921383 C 2.2364779,9.9842765 0,7.7477985 0,4.9921382 Z"
          copytype="single_stretched"
          prop_scale="1"
          scale_y_rel="false"
          spacing="0"
          normal_offset="0"
          tang_offset="0"
          prop_units="false"
          vertical_pattern="false"
          hide_knot="false"
          fuse_tolerance="0"
        />
        <inkscape:path-effect
          effect="skeletal"
          id="path-effect33744"
          is_visible="true"
          lpeversion="1"
          pattern="M 0,4.9921382 C 0,2.2364779 2.2364779,0 4.9921382,0 c 2.7556603,0 4.9921383,2.2364779 4.9921383,4.9921382 0,2.7556603 -2.236478,4.9921383 -4.9921383,4.9921383 C 2.2364779,9.9842765 0,7.7477985 0,4.9921382 Z"
          copytype="single_stretched"
          prop_scale="1"
          scale_y_rel="false"
          spacing="0"
          normal_offset="0"
          tang_offset="0"
          prop_units="false"
          vertical_pattern="false"
          hide_knot="false"
          fuse_tolerance="0"
        />
      </defs>
      <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1">
        <path
          style="
            stroke-width: 2.5px;
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-opacity: 1;
          "
          d="m 3.8432749,25.093056 c 3.7954937,3.85405 7.5909881,7.708105 11.3864841,11.562155 L 36.914135,9.0379638 30.730714,3.156836 C 25.476785,10.445862 20.395398,17.111578 15.14147,24.400605 l -5.097229,-7.08627 C 7.9772514,19.907241 5.9102632,22.50015 3.8432749,25.093056 Z"
          :stroke="props.stroke"
          :fill="props.fill"
        />
      </g>
    </svg>
  </Tooltip>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  stroke: { default: "#fff", type: String },
  fill: { default: "transparent", type: String },
  tooltip: { default: "Check" },
});
</script>
