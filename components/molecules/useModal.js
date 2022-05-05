import { ref, computed } from "vue";

export const showModal = ref(false);

export const closeModal = () => {
  showModal.value = false;
};
