<template>
  <NuxtLayout name="custom">
    <!-- <atoms-typography type="h1">Hello There!</atoms-typography> -->
    <div id="i-am-a-spacer" class="h-16 bg-transparent"></div>

    <Stack class="gap-16">
      <atoms-pomodoro class="justify-center w-1/2 ml-8" />

      <pre>showModal? {{ showModal }}</pre>

      <molecules-card class="justify-center w-1/2 bg-regal-700">
        <div class="grid grid-cols-4 gap-4">
          <atoms-typography type="p">
            Credits Available:
            {{ availableCredits }}
          </atoms-typography>

          <atoms-typography type="p">
            Credits Available:
            {{ allPoints }}
          </atoms-typography>

          <atoms-typography type="p">
            Credits Used:
            {{ creditsUsed }}
          </atoms-typography>
          <atoms-typography type="p">
            Total Rewards: {{ filteredRewards.length }}
          </atoms-typography>
        </div>
      </molecules-card>
      <Row>
        <molecules-card class="justify-center ml-8 bg-regal-700">
          <icons-plus-icon
            tooltip="Add a New Reward!"
            class="w-8 h-8 m-4"
            Stack
            stroke="rgba(34 211 238)"
            @click="showModal = true"
          />

          <icons-reload-icon
            class="w-8 h-8 m-4"
            Stack
            stroke="rgba(34 211 238)"
            @click="load(10)"
          />
        </molecules-card>
      </Row>
    </Stack>

    <div id="i-am-a-spacer" class="h-16 bg-transparent"></div>

    <div
      class="grid gap-4 m-4 desktop:grid-cols-4 sm:grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-3 md:grid-cols-2"
    >
      <RewardsCard
        v-for="(reward, index) in filteredRewards"
        :class="
          index === selectedReward
            ? 'border-2 border-tahiti-400'
            : 'border-2 border-transparent'
        "
        :reward="reward"
        :key="index"
        @click="setSelectedReward(index)"
      />
      <plus-icon class="w-8 h-8" fill="transparent" stroke="rgba(34 211 238)" />
    </div>

    <lobster-spinner
      :show="loading"
      id="overlay"
      class="fixed absolute top-0 bottom-0 left-0 right-0 z-10 w-64 h-64 m-auto"
    />
    <FormModal class="bg-white" :model="reward" :onSubmit="onSubmit" title="New Reward" />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { notify } from "~~/components/atoms/useToaster";
import {
  useTasks,
  loading,
  error,
  creditsUsed,
  allPoints,
  availableCredits,
  filteredRewards,
} from "~~/hooks/useTasks";
import { Flex, Row, Stack, Right, Center } from "@mpreston17/flexies";
import { closeModal, showModal } from "~~/components/molecules/useModal";
import RewardsCard from "../tasks/RewardsCard.vue";

const { load } = useTasks(10);

onMounted(() => {
  load(10);
});

const initialReward = {
  Name: "",
  Points: 5,
  Notes: "",
  // Prerequisites: [],
};

const selectedReward = ref(-1);
const reward = ref({ ...initialReward });
const { createReward } = useTasks();

function setSelectedReward(index) {
  selectedReward.value = selectedReward.value !== index ? index : -1;
}

function startNewReward() {
  showModal.value = true;
}

function onSubmit() {
  submitReward();
}

async function submitReward() {
  console.log("current reward", reward);
  if (!reward?.value?.Name) {
    error.value = "Name is a required Field";
    return;
  }

  let newReward = {
    ...reward.value,
    Points: parseInt(reward.value?.Points),
    // Start: DateTime.local().toISO(),
    // Start: now.toISO(),
  };

  const response = await createReward(newReward);

  closeModal();
  notify("Reward Submitted!", "Success!");
}
</script>

<style scoped>
/* .rewards-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.rewards-grid-sm {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.rewards-grid-md {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
} */
</style>
