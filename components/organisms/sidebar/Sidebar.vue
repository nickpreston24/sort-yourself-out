<template>
  <div
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    v-show="!hidden"
    class="text-2xl duration-300 bg-regal-900/50 hover:bg-regal-900 p-25 text-regal-100 z-1"
    :class="className"
    :style="{ width: sidebarWidth }"
  >
    <h1 class="mx-auto">
      <span v-if="collapsed">
        <div>S</div>
        <div>Y</div>
        <div>O</div>
      </span>
      <span v-else>
        <lobster />
      </span>
    </h1>

    <span class="mx-auto">
      <SidebarLink to="/">Home</SidebarLink>
      <SidebarLink to="/tasks">Tasks</SidebarLink>
      <SidebarLink to="/rewards">Rewards</SidebarLink>
      <SidebarLink to="/journal">Journal</SidebarLink>
      <SidebarLink to="/about">About</SidebarLink>
      <SidebarLink to="/schedule">Schedule</SidebarLink>
      <SidebarLink v-if="true" to="/sandbox">Sandbox</SidebarLink>
    </span>

    <!-- <pre>interval? {{ interval }}</pre> -->
    <!-- <pre>duration? {{ duration }}</pre> -->
    <span
      class="absolute bottom-0 p-2 mb-4 ml-0 mr-1 text-white transition duration-200 opacity-70"
      @click="toggleSidebar"
      :class="{ 'rotate-90': collapsed }"
    >
      <!-- <button @click="toggleSidebar">
        <i v-if="mode === 'RIGHT'" class="text-xl">
          <icons-arrow-up
            class="w-8 shadow-3xl shadow-tahiti-400/50"
            fill="rgb(6 182 212)"
            stroke="#fff"
          />
        </i>
        <span v-else class="text-xl">
          <icons-arrow-up class="w-8" fill="rgb(6 182 212)" stroke="#fff" />
        </span>
      </button> -->
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import SidebarLink from "./SidebarLink.vue";
import { collapsed, toggleSidebar, sidebarWidth, className, hidden } from "./useSidebar";
import Toaster from "~~/components/atoms/Toaster.vue";
import { sleep } from "~~/helpers/timers";
import { notify, toastType } from "~~/components/atoms/useToaster";
const props = defineProps({
  mode: { type: String, default: "LEFT" },
});

// const duration = ref(3000);

// onMounted(() => {
//   // setInterval(() => {
//   //   // console.log("Interval completed");
//   //   collapsed.value = true;
//   // }, duration.value);

//   // timer(() => {
//   //   collapsed.value = true;
//   // }, duration.value);
// });

function onMouseLeave() {
  // console.log("leave");
  sleep(250).then(() => {
    collapsed.value = true;
    // notify(
    //   "Hello, I just timed out...thought you ought to know",
    //   collapsed.value.toString(),
    //   500,
    //   "warning"
    // );
  });
}

function onMouseOver() {
  // console.log("over");
  sleep(250).then(() => {
    collapsed.value = false;
    // notify(
    //   "Hello, I just timed out...thought you ought to know",
    //   collapsed.value.toString(),
    //   500,
    //   "warning"
    // );
  });

  // collapsed.value = false;
}
</script>
<style scoped></style>
