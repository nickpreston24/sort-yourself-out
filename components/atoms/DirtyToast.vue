// A quick and dirty toast...since I can't find anything that runs properly in Nuxt3
atm...

<template>
  <div class="opacity-75 z-9999 bg-sunglo-500">
    <h1>{{ message }}</h1>
    <p>leaving in {{ secondsRemaining }}s...</p>
  </div>
</template>

<script setup lang="ts">
import { TaskTimer } from "tasktimer";
const props = defineProps({
  message: { default: "Ping!" },
  duration: { default: 2500 },
});

const { message, duration } = props;
const secondsRemaining = ref(duration);

onMounted(() => {
  const timer = new TaskTimer(1000);
  timer.on("tick", () => {
    secondsRemaining.value -= 1;
    if (timer.tickCount >= duration) timer.stop();
  });

  // Start the timer
  timer.start();
});
</script>

<style></style>
