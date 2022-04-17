<template>
  <button
    class="text-4xl text-white border-2 p-lg hover:text-arctic-300 bg-midnight border-regal-400 hover:shadow-3xl"
  >
    <!-- Top -->
    <Row class="gap-1 p-tiny">
      <div class="w-4/5 h-1 bg-red"></div>
      <div v-for="(item, index) in 5" :key="index" style="font-size: 0.75rem">
        <AtomsStarIcon fill="#A71A23" stroke="#D62338" key="index" />
      </div>
      <div class="w-4/5 h-1 bg-red"></div>
    </Row>
    <slot></slot>
    <Row class="gap-1 p-tiny">
      <div class="w-4/5 h-1 bg-red"></div>
      <div v-for="(item, index) in 5" :key="index" style="font-size: 0.75rem">
        <AtomsStarIcon fill="#A71A23" stroke="#D62338" key="index" />
      </div>
      <div class="w-4/5 h-1 bg-red"></div>
    </Row>
    <!-- Bottom -->
  </button>
</template>
<script setup lang="ts">
import { Row } from "@mpreston17/flexies";
</script>
