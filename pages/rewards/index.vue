<template>
  <NuxtLayout name="custom">
    <organisms-search-header :items="filteredRewards" />

    <Stack class="gap-16">
      <RewardStats />

      <molecules-card class="justify-center m-4 ml-8 bg-regal-700">
        <Row class="gap-2">
          <router-link to="/rewards/add">
            <icons-plus-icon
              tooltip="Add a New Reward!"
              class="w-8 h-8"
              Stack
              stroke="rgba(34 211 238)"
              @click="showModal = true"
            />
          </router-link>

          <icons-reload-icon
            class="w-8 h-8"
            Stack
            stroke="rgba(34 211 238)"
            @click="reload"
          />
        </Row>
      </molecules-card>
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

    <!-- TODO: 8.  Fix the FormModal not working with Rewards
 -->
    <!-- <FormModal class="bg-white" :model="reward" :onSubmit="onSubmit" title="New Reward" /> -->
  </NuxtLayout>
</template>
<script setup lang="ts">
import { notify } from "~~/components/atoms/useToaster";
import { useTasks, loading, error, filteredRewards, rewards } from "~~/hooks/useTasks";
import { Row, Stack } from "@mpreston17/flexies";
import { closeModal, showModal } from "~~/components/molecules/useModal";
import RewardsCard from "../tasks/RewardsCard.vue";
import RewardStats from "./RewardStats.vue";

const { load } = useTasks(10);

onMounted(() => {
  load(10);
});

const initialReward = {
  Name: "",
  Points: 5,
  Notes: "",
};

const selectedReward = ref(-1);
const reward = ref({ ...initialReward });
const { createReward } = useTasks();

const reload = () => load(25);

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
