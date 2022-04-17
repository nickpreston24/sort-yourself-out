// A quick and dirty toast...since I can't find anything that runs properly in Nuxt3
atm... // help?: https://github.com/acidjazz/tv-toast/blob/master/src/utils.js
<template>
  <transition name="fade">
    <div
      v-if="active"
      class="relative z-20 inline-block w-auto transition-opacity duration-1000 ease-in-out sm:w-64 md:w-128 lg:w-148 bg-ocean-500/80 tranistion-delay-1000 bottom-100 left-1/2"
    >
      <div class="flex flex-row justify-end gap-2">
        <!-- <pre>show? {{ show }}</pre> -->
        <pre>id? {{ id }}</pre>
        <h1 class="!text-cocoa-bean-100 text-2xl font-bold w-1/3">{{ toast.title }}</h1>
        <button class="sm:w-3/6 md:w-1/3 lg:w-1/3">
          <atoms-tooltip @click="active = false" text="Dismiss">
            <p>X</p>
          </atoms-tooltip>
        </button>
      </div>
      <!-- <slot /> -->
      <!-- <p>{{ secondsRemaining }}s...</p> -->
      <pre>duration? {{ duration }}</pre>

      <Stack class="">
        <div class="text-center text-white bg-cocoa-bean-800">
          <span class="text">
            {{ message }}
          </span>
          <img src="https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif" />
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
      duration: { default: 5000 },
    },
  },
});
// console.log("props", props);
const { message, title, id, show, duration } = props?.toast;

console.log("show", show);
// console.log("id", id);
// console.log("message", message);
// console.log("title", title);
// console.log("duration.value", duration.value);

console.log("toast", props?.toast);
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
  //   // this.$destroy();
  //   // destroy();
  //   // removeElement(instance);
  destroyToast(id);
  // }, duration.value);
}
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
