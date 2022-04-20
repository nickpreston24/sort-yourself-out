<template>
  <NuxtLayout name="custom">
    <atoms-typography type="h1">Hello There!</atoms-typography>

    <Row>
      <molecules-card>
        <Typography type="p">
          Credits Available:
          {{ availableCredits }}
        </Typography>
      </molecules-card>
    </Row>
    <pre>rewards.length? {{ rewards.length }}</pre>
    <div class="mb-10 ml-4 mr-4 bg-transparent rewards-grid">
      <div v-for="(reward, index) in rewards">
        <RewardsCard
          :class="
            index === selectedReward
              ? 'border-2 border-tahiti-400'
              : 'border-2 border-transparent'
          "
          :reward="reward"
          :key="index"
          @click="setSelectedReward(index)"
        />
      </div>
      <plus-icon
        class="w-8 h-8"
        fill="transparent"
        stroke="rgba(34 211 238)"
        @click="submitReward"
      />
    </div>

    <lobster-spinner
      :show="loading"
      id="overlay"
      class="fixed absolute top-0 bottom-0 left-0 right-0 z-10 w-64 h-64 m-auto"
    />
    <FormModal
      class="bg-white"
      :model="reward"
      :onSubmit="submitReward"
      title="Add a Reward"
    />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { notify } from "~~/components/atoms/useToaster";
import { useTasks, rewards, loading, availableCredits } from "~~/hooks/useTasks";
import { Center, Stack, Row, Right, Left, Flex } from "@mpreston17/flexies";
import { closeModal } from "~~/components/molecules/useModal";
import RewardsCard from "../tasks/RewardsCard.vue";

const { load } = useTasks(10);

onMounted(() => {
  load(10);
  notify("Hello There!", "Hello");
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

  let record = response?.data?.records?.[0];

  if (record) {
    rewards.value.push({
      ...record.fields,
      id: record.id,
    });
  }

  closeModal();
  notify("Reward Submitted!", "Success!");
}
</script>

<style scoped>
.rewards-grid {
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
}
</style>
