<template>
  <NuxtLayout name="custom">
    <Stack class="h-screen">
      <atoms-typography type="h1">Bulk Add Tasks</atoms-typography>
      <!-- <pre>text? {{ text.split("\n") }}</pre> -->
      <!-- <pre>state.value? {{ state.value }}</pre> -->
      <!-- <pre>tabs? {{ text.split("\n").filter((t) => t.match(/^\t.*/)) }}</pre> -->
      <atoms-button @click="onSubmit" tooltip="Save!">Save</atoms-button>
      <textarea
        class="w-5/6 m-10 font-medium h-5/6 bg-regal-600 text-tahiti-400"
        v-model="text"
        placeholder="Start typing a list, in outline format"
        @input="debouncedFn"
      ></textarea>
    </Stack>
  </NuxtLayout>
</template>
<script setup>
import { useStorage, useDebounceFn } from "@vueuse/core";
import { Center, Stack, Row, Right, Left, Flex } from "@mpreston17/flexies";
import { notifySuccess } from "~~/components/atoms/useToaster";
import { useTasks } from "~~/hooks/useTasks";
const { createTask } = useTasks();

const text = ref("");

const store = useStorage("my-store", { text });

const debouncedFn = useDebounceFn(() => {
  store.value = { text: text.value };
}, 250);

onMounted(() => {
  // console.log("store", store.value);
  text.value = store.value?.text;
});

function onSubmit() {
  const lines = text.value.split("\n");
  // conts tabs = lines.filter((t) => !!t && t.match(/^[\s\t]+.*$/i));

  let tasks = lines.map((line) => {
    // let now = new Date();
    // let tomorrow = new Date(now);
    // tomorrow.setDate(tomorrow.getDate() + 1);
    return {
      Name: line,
      Points: 1,
      // Start: now,
      // End: tomorrow,
    };
  });

  // TODO: Change this from promise-based to using Airtable's support for the Creation of multiple records:

  let promises = tasks.map((t) => createTask(t));
  Promise.all(promises).then((records) => notifySuccess(records?.length));
}
</script>
