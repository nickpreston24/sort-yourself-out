<template>
  <!-- <p>
    foo<transition name="fade"><slot></slot></transition>
  </p> -->

  <transition
    mode="out-in"
    name="fade"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    appear
  >
    <slot></slot>
  </transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 2s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
/* 
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
} */
/* 
.committee-enter-from {
  opacity: 0;
  transform: translateX(-3rem);
}
.committee-enter-active {
  transition: all 1s ease-in;
}
.committee-enter-to {
  opacity: 1;
  transform: translateX(0);
} */
</style>
