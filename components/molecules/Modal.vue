// From: https://vuejs.org/examples/#modal //
https://vuejs.org/guide/built-ins/teleport.html#basic-usage

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50 modal-mask"
      >
        <div
          class="flex items-start justify-center min-h-screen pt-24 text-center modal-wrapper"
        >
          <div
            class="w-1/2 p-8 overflow-hidden text-left rounded-lg shadow-xl modal-container"
            role="dialog"
            ref="modal"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <slot name="header"></slot>
            </div>

            <div class="modal-body">
              <slot></slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <atoms-button @click="showModal = false">OK</atoms-button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import { showModal } from "./useModal";

// const showModal = ref("false");
const modal = ref(null);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.show,
  (show) => {
    showModal.value = show;
  }
);

onClickOutside(modal, () => {
  if (showModal.value === true) {
    showModal.value = false;
  }
});
</script>

<style scoped>
/* .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;  // <== KEEP
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
} 

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;  // <== KEEP
}
*/

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
