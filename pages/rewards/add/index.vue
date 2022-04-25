<template>
  <NuxtLayout name="custom">
    <Stack class="h-screen bg-regal-800">
      <atoms-typography type="h1"> Add a new Reward </atoms-typography>

      <ul class="text-sunglo-500 bg-regal-700">
        <li class="p-2" v-for="(value, key, index) in reward" :key="index">
          <label class="m-2">{{ key }}:</label>
          <input
            class="p-2 m-2 bg-regal-600 rounded-xl"
            type="text"
            v-bind:placeholder="key"
            v-model="reward[key]"
          />
        </li>
      </ul>

      <atoms-button @click="submitReward"> Submit </atoms-button>
      <router-link to="/rewards">
        <atoms-button> Go Back </atoms-button>
      </router-link>
    </Stack>
  </NuxtLayout>
</template>
<script setup>
import { Center, Stack, Row, Right, Left, Flex } from "@mpreston17/flexies";
import { useTasks, rewards } from "~~/hooks/useTasks";

const now = new Date();
const { createReward } = useTasks();

const reward = ref({
  Name: "",
  Points: 5,
  Notes: "",
  //   Points: 0,
  //   "Cashed-In": [],
});

async function submitReward() {
  console.log("current reward", reward);
  if (!reward?.value?.Name) {
    error.value = "Name is a required Field";
    return;
  }

  let newReward = {
    ...reward.value,
    Points: parseInt(reward.value?.Points),
  };

  const response = await createReward(newReward);
}
</script>
