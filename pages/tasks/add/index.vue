<template>
  <NuxtLayout name="custom">
    <Stack class="h-screen gap-4 bg-regal-800">
      <atoms-typography type="h1"> Add a new Task </atoms-typography>
      <atoms-typography v-if="error" type="b">{{ error }}</atoms-typography>
      <ul class="text-sunglo-500 bg-regal-700">
        <li class="p-2" v-for="(value, key, index) in task" :key="index">
          <label class="m-2">{{ key }}:</label>
          <input
            class="p-2 m-2 bg-regal-600 rounded-xl"
            type="text"
            v-bind:placeholder="key"
            v-model="task[key]"
          />
        </li>
      </ul>

      <Stack>
        <pre>selectedReward? {{ selectedReward?.["Cashed-In"] }}</pre>
        <select
          v-model="selectedReward"
          v-if="availableRewards"
          class="bg-regal-800 text-sunglo-400"
        >
          <option disabled value="">Please select one</option>

          <option v-for="reward in availableRewards" :value="reward" :key="reward.id">
            {{ reward.Name }}
          </option>
        </select>
      </Stack>

      <Row>
        <atoms-button @click="submitTask(task)"> Submit </atoms-button>
        <router-link to="/tasks">
          <atoms-button> Go Back </atoms-button>
        </router-link>
      </Row>
    </Stack>
  </NuxtLayout>
</template>
<script setup>
import { Center, Stack, Row, Right, Left, Flex } from "@mpreston17/flexies";
import { useTasks, rewards, tasks, error } from "~~/hooks/useTasks";
import { collapsed } from "~~/components/organisms/sidebar/useSidebar";

const now = new Date();
const { createTask, load } = useTasks(0, 50);
const selectedReward = ref(null);

onMounted(() => {
  collapsed.value = true;
  load(50);
});

const task = ref({
  Name: "",
  Points: 5,
  Notes: "",
});

const availableRewards = computed(() => {
  const available = rewards.value.filter((rw) => rw.PercentEarned != 100);

  console.log("rewardIds", available);

  return available;
});

const getTaskCollisions = computed(() => {
  const taskIds = tasks.value.map((t) => t.id);

  const rewardIds = rewards.value
    .filter((r) => r["Cashed-In"])
    .map((ci) => ci.id)
    .filter((ri) => !taskIds.includes(ri));

  return rewardIds;
});

function submitTask() {
  console.log("current task", task.value);
  if (!task.value?.Name) {
    error.value = "Name is a required Field";
    return;
  }
  createTask(task.value, selectedReward.value);
}
</script>
