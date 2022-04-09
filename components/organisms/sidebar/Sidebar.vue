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
      <span v-else>Sort Yourself Out</span>
    </h1>

    <span class="mx-auto">
      <SidebarLink to="/home" icon="fas fa-home">Home</SidebarLink>
      <!-- <SidebarLink to="" icon="fas fa-image"
        >Scribe</SidebarLink
      > -->
      <SidebarLink to="/tasks" icon="fas fa-gear">Tasks</SidebarLink>
      <SidebarLink to="/journal" icon="fas fa-beer">Journal</SidebarLink>
      <SidebarLink to="/about" icon="fas fa-image">About</SidebarLink>
      <!-- <SidebarLink v-if="true" to="/sandbox" icon="fas fa-image">Sandbox</SidebarLink> -->
    </span>
    <span
      class="absolute bottom-0 p-2 mb-4 ml-4 text-white transition duration-200 opacity-70"
      @click="toggleSidebar"
      :class="{ 'rotate-180': collapsed }"
    >
      <!-- <icon class="fas fa-angle-double-left" /> -->
      <icon v-if="mode === 'RIGHT'" class="text-xl"> {{ ">>" }} </icon>
      <icon v-else class="text-xl"> {{ "<<" }} </icon>
    </span>
  </div>
</template>
<script setup>
// import { devmode } from "../../../helpers";
import SidebarLink from "./SidebarLink.vue";
import { collapsed, toggleSidebar, sidebarWidth, className, hidden } from "./useSidebar";
const props = defineProps({
  mode: { type: String, default: "LEFT" },
});

function onMouseLeave() {
  collapsed.value = true;
  // setTimeout(() => {
  // }, 1500);s
}

function onMouseOver() {
  // setTimeout(() => {
  collapsed.value = false;
  // }, 500);
}
</script>
<style scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
