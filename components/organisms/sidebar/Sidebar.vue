<template>
  <div
    @mouseover.native="onMouseOver"
    @mouseleave.native="onMouseLeave"
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
      <SidebarLink to="/journal">Journal</SidebarLink>
      <SidebarLink to="/about">About</SidebarLink>
      <SidebarLink to="/schedule">Schedule</SidebarLink>
      <SidebarLink v-if="true" to="/sandbox">Sandbox</SidebarLink>
    </span>
    <span
      class="absolute bottom-0 p-2 mb-4 ml-4 text-white transition duration-200 opacity-70"
      @click="toggleSidebar"
      :class="{ 'rotate-180': collapsed }"
    >
      <i v-if="mode === 'RIGHT'" class="text-xl"> {{ ">>" }} </i>
      <i v-else class="text-xl"> {{ "<<" }} </i>
    </span>
    <!-- <span class="absolute bottom-0 p-2 mb-4 ml-4">
      <Toaster :debug="true" />
    </span> -->
  </div>
</template>
<script setup lang="ts">
import SidebarLink from "./SidebarLink.vue";
import { collapsed, toggleSidebar, sidebarWidth, className, hidden } from "./useSidebar";
import Toaster from "~~/components/atoms/Toaster.vue";
const props = defineProps({
  mode: { type: String, default: "LEFT" },
});

function onMouseLeave() {
  collapsed.value = true;
}

function onMouseOver() {
  collapsed.value = false;
}
</script>
<style scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
