<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  size: { default: "sm" },
  step: { type: Number, default: 12 },
  start: { type: Number, default: 16 },
  debug: { default: false },
});

const sizes = ["sm", "tablet", "md", "lg", "laptop", "desktop", "xl"];
const next = (m, x, b) => m * x + b;
const widths = makeWidthMap();
props?.debug && console.log("widths", widths);

function makeWidthMap() {
  let map = {};
  for (let index = 0; index < sizes.length; index++) {
    const sizeName = sizes[index];
    let value = next(props.step, index, props?.start);
    const str = makeWidthStep(value);
    map[sizeName] = str;
  }

  return map;
}

function makeWidthStep(start) {
  let index = 0;

  const sizeString = sizes.reduce((result, sizeName) => {
    let value = next(props.step, index++, start);
    result += `${sizeName}:w-${value} `;
    return result;
  }, "");

  return sizeString;
}

const className = computed(() => {
  return widths[props.size].trim();
  // switch (props.size) {
  //   case "xl":
  //     return `sm:w-48 tablet:w-64 md:w-72 lg:w-96 laptop:w-128 desktop:w-144 xl:w-172`;
  //   case "lg":
  //     return `sm:w-32 tablet:w-48 md:w-64 lg:w-72 laptop:w-96 desktop:w-128 xl:w-144`;
  //   case "md":
  //     return `sm:w-24 tablet:w-32 md:w-48 lg:w-64 laptop:w-72 desktop:w-96 xl:w-128`;
  //   case "sm":
  //   default:
  //     return `sm:w-16 tablet:w-24 md:w-32 lg:w-48 laptop:w-64 desktop:w-72 xl:w-96`;
  // }
});
</script>
