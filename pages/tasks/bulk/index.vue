<template>
  <NuxtLayout name="custom">
    <Stack class="h-screen">
      <atoms-typography type="h1">Bulk Add Tasks</atoms-typography>

      <TaskStats />

      <!-- <pre>tasks? {{ tasks.value.length }}</pre> -->
      <input class="bg-regal-600 text-sunglo-600" v-model="parentTask.Name" />
      <textarea
        class="w-5/6 m-10 font-medium h-3/6 bg-regal-600 text-tahiti-400"
        v-model="text"
        placeholder="Start typing a list, in outline format"
        @input="debouncedFn"
      ></textarea>
      <atoms-button @click="onSubmit" tooltip="Save!">Save</atoms-button>
    </Stack>
  </NuxtLayout>
</template>
<script setup>
import { useStorage, useDebounceFn } from "@vueuse/core";
import { Center, Stack, Row, Right, Left, Flex } from "@mpreston17/flexies";
import { notifySuccess } from "~~/components/atoms/useToaster";
import { useTasks, tasks } from "~~/hooks/useTasks";
import TaskStats from "../TaskStats.vue";
const { bulkCreateTasks } = useTasks();

const text = ref("");
const now = new Date();
const parentTask = ref({
  Name: "",
  Start: now,
});

const store = useStorage("bulk-store", { text });

const debouncedFn = useDebounceFn(() => {
  store.value = { text: text.value };
}, 250);

onMounted(() => {
  text.value = store.value?.text;
  console.log("store.value", store.value);
  parentTask.value.Name = store.value?.name;
});

async function onSubmit() {
  const parent = parentTask.value;
  const lines = text.value.split("\n");
  // conts tabs = lines.filter((t) => !!t && t.match(/^[\s\t]+.*$/i));

  let tasks = lines.map((line) => {
    // let now = new Date();
    // let tomorrow = new Date(now);
    // tomorrow.setDate(tomorrow.getDate() + 1);
    return {
      Name: line,
      Points: 1,
      Status: "Todo",
      // Start: now,
      // End: tomorrow,
    };
  });

  bulkCreateTasks(parent, tasks);
}
</script>
