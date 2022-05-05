<template>
  <!-- <img
    v-if="show"
    src="~/assets/public/hail-lobster.png"
    class="w-32 h-auto rounded-full sm:w-28 sm:h-28 shadow-crimson-500/50 animate-spin-slow"
    alt="lobster"
  /> -->

  <transition name="fade">
    <img
      v-if="show"
      src="~/assets/public/hail-lobster.png"
      alt="lobster"
      id="overlay"
      class="fixed absolute top-0 bottom-0 left-0 right-0 z-10 w-32 w-64 h-64 h-auto m-auto rounded-full sm:w-28 sm:h-28 shadow-crimson-500/50 animate-spin-slow"
    />
  </transition>
</template>
<script setup>
const props = defineProps({
  show: { default: true },
  debug: { default: false },
  seconds: { default: 3 },
});

const duration = ref(`${props.seconds}s`);
</script>
<style scoped>
/* var seconds : v-bind(duration) */
/* Fade */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity v-bind(duration) ease;
}
</style>
