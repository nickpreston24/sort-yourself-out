<template>
  <Modal class="bg-white text-crimson-500">
    <template #header>
      <atoms-typography class="bg-white" type="h1">{{ props.title }}</atoms-typography>
    </template>
    <ul>
      <li class="p-2" v-for="(value, key, index) in props.model" :key="index">
        <label class="m-2">{{ key }}:</label>
        <input
          class="p-2 m-2 bg-white rounded-xl"
          :type="inputType(value)"
          v-bind:placeholder="key"
          v-model="props.model[key]"
        />
      </li>
    </ul>
    <template #footer>
      <Row>
        <atoms-button @click="onSubmit">Submit</atoms-button>
        <atoms-button @click="closeModal" class="m-2"> Cancel </atoms-button>
      </Row>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { Flex, Row, Stack, Right, Center } from "@mpreston17/flexies";
import { closeModal, showModal } from "../molecules/useModal";
import Modal from "../molecules/Modal.vue";
import { isDate } from "~~/helpers";

const props = defineProps({
  model: { default: {} },
  title: { default: null },
  onSubmit: { default: () => {} },
  debug: { default: false },
});

onMounted(() => {
  console.log("props.model", props.model);
});

function inputType(value) {
  console.log("value", value);
  switch (value) {
    case isDate(value):
      return "date";
    default:
      return "text";
  }
}

// console.log("showModal", showModal);

// const model = ref({});
// const modelName = ref("");

// watch(
//   () => props.show,
//   (show) => {
//     showModal.value = show;
//     // console.log("showModal", showModal);
//   }
// );

// function onSubmit() {
//   props?.submit(model);
//   closeModal();
// }
</script>
