// A quick and dirty toast...since I can't find anything that runs properly in Nuxt3
atm... // help?: https://github.com/acidjazz/tv-toast/blob/master/src/utils.js
<template>
  <transition name="fade">
    <div
      v-if="active"
      class="relative z-20 inline-block w-auto transition-opacity duration-1000 ease-in-out sm:w-64 md:w-128 lg:w-148 bg-ocean-500/80 tranistion-delay-1000 bottom-100 left-1/2"
    >
      <div class="flex flex-row justify-end gap-2">
        <pre v-if="props?.debug">id? {{ id }}</pre>

        <h1 class="w-5/6 text-2xl font-bold text-center p-base">{{ toast.title }}</h1>
        <span class="w-1/6 mt-2 mr-2">
          <icons-cross-icon
            @click="active = false"
            tooltip="Dismiss"
            class="w-8"
            fill="rgb(6 182 212)"
          />
        </span>
      </div>
      <!-- <p>{{ secondsRemaining }}s...</p> -->
      <!-- <pre>duration? {{ duration }}</pre> -->

      <Stack class="">
        <div class="m-4 text-white">
          <span class="text font-extra-bold pl-md">
            {{ message }}
          </span>

          <img
            v-if="props.debug"
            src="https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif"
          />
        </div>
      </Stack>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Row, Stack } from "@mpreston17/flexies";
import { defineProps, ref, computed, getCurrentInstance } from "vue";
import { destroyToast } from "./useToaster";
const props = defineProps({
  toast: {
    default: {
      message: "Ping!",
      title: "Notification",
      show: { default: true },
      id: -1,
      duration: { default: 7500 },
    },
  },
});
// console.log("props", props);
const { message, title, id, show, duration } = props?.toast;

// console.log("show", show);
// console.log("id", id);
// console.log("message", message);
// console.log("title", title);
// console.log("duration.value", duration.value);

// console.log("toast", props?.toast);
const active = ref(show);
// const secondsRemaining = computed(() => duration.value);
// const instance = getCurrentInstance();

function removeElement(el) {
  if (typeof el.remove !== "undefined") el.remove();
  else el.parentNode.removeChild(el);
}

let interval;
onMounted(() => {
  interval = setInterval(async () => {
    await destroy();
  }, duration);
});

async function destroy() {
  // console.log("el", instance);
  active.value = false;
  clearInterval(interval);
  // setTimeout(() => {
  //   // $destroy();
  //   // destroy();
  //   // removeElement(instance);
  destroyToast(id);
  // }, duration.value);
}

/** TODO: Start and stop a timer
 * 1. Pause on hover (mousenter)
 * 2. Resume on mouse leave
 * https://codepen.io/psnoonan/pen/KKgPXMp
 */
// start() {
//       clearInterval(interval);
//       timer = timer > 0 ? timer : INTERVAL / 1000;
//       timerId = setInterval(() => {
//         timer -= 1;
//       }, 1000);
//     },
//     pause() {
//       clearInterval(timerId);
//       status = 'Paused';
//     },
</script>

<style scoped>
/* Fade */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
