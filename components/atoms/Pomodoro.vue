/** help:
https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
*/

<template>
  <div class="bg-sunglo-700">
    <Stack class="h-32">
      <div class="p-2 border-4 rounded-full border-red">
        <p class="text-2xl !text-sunglo-200 border-2 border-white rounded-full">
          {{ currentTime.format("hh:mm:ss") }}
        </p>
      </div>
      <Row>
        <button class="border-2 border-sunglo-400">start</button>
        <button class="border-2 border-sunglo-400">pause</button>
        <button class="border-2 border-sunglo-400">stop</button>
      </Row>
    </Stack>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import { TaskTimer } from "tasktimer";
import { Row, Stack } from "@mpreston17/flexies";
const now = dayjs();

const tomorrow = now.add(1, "day");
const time = ref(now);

const settingsInfo = reactive({
  workMinutes: 30,
  breakMinutes: 10,
});

const secondsLeft = ref(0);
const isPausedRef = ref(true);
const mode = ref("work"); // work/break/null

function tick() {
  secondsLeft.value--;
}

onMounted(() => {
  function switchMode() {
    const nextMode = mode.value === "work" ? "break" : "work";
    const nextSeconds =
      (nextMode === "work" ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

    mode.value = nextMode;
    secondsLeft.value = nextSeconds;
  }

  secondsLeft.value = settingsInfo.workMinutes * 60;

  const interval = setInterval(() => {
    if (isPausedRef.value) {
      return;
    }
    if (secondsLeft.value === 0) {
      return switchMode();
    }

    tick();
  }, 1000);

  return () => clearInterval(interval);
});

const totalSeconds = computed(() => {
  return mode.value === "work"
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
});

const percentage = computed(() =>
  Math.round((secondsLeft.value / totalSeconds.value) * 100)
);

const minutes = computed(() => Math.floor(secondsLeft.value / 60));
let seconds = computed(() => secondsLeft.value % 60);

const currentTime = computed({
  get: () => {
    return time.value;
  },
  set: (s) => {
    let adjustedTime = time.value.add(s, "second");
    time.value = adjustedTime;
  },
});

onMounted(() => {
  const timer = new TaskTimer(1000);
  // You can also execute some code on each tick... (every 1000 ms)
  timer.on("tick", () => {
    // console.log("tick count: " + timer.tickCount);
    // console.log("elapsed time: " + timer.time.elapsed + " ms.");
    // stop timer (and all tasks) after 1 hour
    if (timer.tickCount >= 3600000) timer.stop();

    currentTime.value = 1;
  });

  // Start the timer
  timer.start();
});
</script>
