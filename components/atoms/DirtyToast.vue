// A quick and dirty toast...since I can't find anything that runs properly in Nuxt3
atm... // help?: https://github.com/acidjazz/tv-toast/blob/master/src/utils.js
<template>
  <transition name="fade">
    <box
      v-if="active"
      class="relative z-20 inline-block w-auto transition-opacity duration-1000 ease-in-out sm:w-48 md:w-64 lg:w-128 tranistion-delay-1000 bottom-100 left-1/2"
      :class="background"
    >
      <div class="flex flex-row justify-end gap-2">
        <h1 class="w-5/6 text-2xl font-bold text-center p-base">{{ toast.title }}</h1>
        <span class="w-1/6 mt-2 mr-2">
          <icons-cross-icon
            @click="destroyToast(props.toast)"
            tooltip="Dismiss"
            class="w-8"
            fill="rgb(6 182 212)"
            stroke="#fff"
          />
        </span>
      </div>

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
    </box>
  </transition>
</template>

<script setup lang="ts">
import { Flex, Row, Stack, Right, Center } from "@mpreston17/flexies";
import { defineProps, ref, computed, getCurrentInstance } from "vue";
import { sleep } from "~~/helpers/timers";
import { destroyToast, toastType } from "./useToaster";
const props = defineProps({
  toast: {
    default: {
      message: "Ping!",
      title: "Notification",
      show: true,
      id: -1,
      duration: 5000,
      type: "success",
    },
  },
});
const { message, title, id, show, duration, type } = props?.toast;

console.log("toast", props.toast);
const active = ref(true);
const background = computed(() => {
  return toastType?.background || "bg-ocean-500/75";
});

onMounted(() => {
  sleep(2500).then(() => {
    destroy();
  });
});

function destroy() {
  destroyToast(props.toast);
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
