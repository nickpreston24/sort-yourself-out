<template>
  <atoms-tooltip :text="props.tooltip">
    <svg
      viewBox="0 0 40 40"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <g>
        <g
          style="stroke-width: 1.5 stroke-dasharray: none"
          transform="matrix(1.1513046,0,0,1.1513046,-3.0839301,-3.0968308)"
        >
          <path
            style="
            stroke-width: 1.5
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
            d="M 17.353578,14.467375 Z"
            :stroke="props.stroke"
            :fill="props.fill"
          />
          <path
            style="
            stroke-width: 1.5
            stroke-linecap: butt;
            stroke-linejoin: miter;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
            :stroke="props.stroke"
            :fill="props.fill"
            d="m 17.02554,36.035143 7.135689,-0.01555 c 0,0 -2.713159,-10.19272 -2.007172,-17.011082 0.215146,-2.077852 1.349263,-3.713908 1.586383,-4.579376 0.925326,-3.37737 1.389881,0.190035 2.211951,0.302441 0.822069,0.112398 2.002506,0.273807 2.720458,0.37197 0.717953,0.09817 1.070588,0.146378 1.587259,0.217026 0.516668,0.07065 -0.266828,2.316978 1.51276,0.206841 0.944013,-1.119354 -6.088743,-5.159468 -8.040967,-6.9728202 -1.952224,-1.8133522 -3.348908,-3.9673416 -3.348908,-3.9673416 0,0 -1.638594,2.3405003 -3.604915,4.170126 -1.966322,1.8296258 -8.536942,5.1785448 -7.8503414,6.8671428 0.6866002,1.688597 1.0916164,-0.108908 1.9050224,-0.220619 0.813407,-0.111714 2.235119,-0.347953 2.975411,-0.449622 0.740292,-0.101665 1.2771,-0.175386 1.868,-0.256539 0.590902,-0.08116 0.746692,-4.696803 1.677409,-0.230362 0.200385,0.961627 0.746783,2.562281 0.978179,4.471271 0.84049,6.933953 -1.306218,17.096495 -1.306218,17.096494 z"
          />
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
