<template>
  <!-- <?xml version="1.0" encoding="UTF-8" standalone="no"?> -->
  <!-- Created with Inkscape (http://www.inkscape.org/) -->

  <svg
    viewBox="0 0 40 40"
    version="1.1"
    id="svg5"
    sodipodi:docname="star.svg"
    inkscape:version="1.1.2 (0a00cf5339, 2022-02-04, custom)"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
  >
    <sodipodi:namedview
      id="namedview7"
      borderopacity="1.0"
      inkscape:pageshadow="2"
      inkscape:pageopacity="0.0"
      inkscape:pagecheckerboard="true"
      inkscape:document-units="mm"
      showgrid="false"
      inkscape:zoom="0.77058782"
      inkscape:cx="79.160348"
      inkscape:cy="338.70247"
      inkscape:window-width="1920"
      inkscape:window-height="1051"
      inkscape:window-x="0"
      inkscape:window-y="0"
      inkscape:window-maximized="1"
      inkscape:current-layer="layer1"
      inkscape:snap-path-clip="false"
    />
    <defs id="defs2" />
    <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1">
      <path
        id="path846"
        style="stroke-width: 0.355176; stroke-linejoin: round"
        :stroke="props.stroke"
        :fill="props.fill"
        inkscape:transform-center-x="0.00048317498"
        inkscape:transform-center-y="-1.5723636"
        d="M 29.25946,33.951739 19.577733,28.862917 9.8969661,33.95356 11.744906,23.173163 3.9118971,15.5393 14.735706,13.965468 l 4.839701,-9.808627 4.841547,9.807716 10.824111,1.571796 -7.831573,7.635336 z"
      />
    </g>
  </svg>
</template>
<script setup lang="ts">
import { ref, computed, defineProps } from "vue";

const props = defineProps({
  stroke: { default: "#fff", type: String },
  fill: { default: "#aaa", type: String },
});
</script>
