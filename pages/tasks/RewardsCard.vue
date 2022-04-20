<template>
  <transition name="slide-fade">
    <div
      @mouseleave="onMouseLeave"
      @mouseenter="onMouseEnter"
      class="shadow-sm bg-regal-800 hover:bg-regal-600 from-regal-800 to-regal-700 shadow-regal-400/90 opacity-90 bg-gradient-to-l hover:bg-gradient-to-r"
    >
      <molecules-card class="flex items-center justify-center opacity-90 roundex-lg">
        <Typography type="h4">{{ reward?.Name }}</Typography>

        <Row>
          <Typography type="p"
            >Points: {{ completedPoints + "/" + reward?.Points }}</Typography
          >
          <!-- <pre>props.active? {{ props.active }}</pre> -->
          <Typography type="p" v-if="requirements?.length > 0"
            >Requirements: {{ completedPrereqs + "/" + requirements?.length }}</Typography
          >
          <radial-progress-bar
            :diameter="85"
            :completed-steps="completedPoints"
            :total-steps="totalSteps"
          >
            <Typography type="b">{{ percentCompleted.toFixed() }}%</Typography>
          </radial-progress-bar>
        </Row>

        <!-- Buttons Action Bar -->
        <Row v-if="buttonsActive">
          <icons-plus-icon
            tooltip="ADD something AWESOME"
            class="w-8 h-8"
            fill="transparent"
            stroke="rgba(34 211 238)"
          />
          <icons-trash-icon
            tooltip="Delete this!"
            class="w-8 h-8"
            fill="transparent"
            stroke="rgba(34 211 238)"
            @click="deleteReward(reward?.id)"
          />
          <icons-edit-icon
            tooltip="Alcohol, it's a hell of a drug"
            class="w-8 h-8"
            fill="transparent"
            stroke="rgba(34 211 238)"
          />

          <icons-calendar-icon
            tooltip="Make a Schedule"
            class="w-8 h-8"
            fill="transparent"
            stroke="rgba(34 211 238)"
          />

          <!-- <icons-cross-icon
          tooltip="Cancel"
          class="w-8 h-8"
          fill="transparent"
          stroke="rgba(34 211 238)"
        /> -->

          <icons-checkmark-icon
            tooltip="Mark as Concluded"
            class="w-8 h-8"
            fill="transparent"
            stroke="rgba(34 211 238)"
            @click="concludeReward"
          />
        </Row>
        <!-- <molecules-modal>
        <template.header>
          <h1>Delete this for real?</h1>
        </template.header>
      </molecules-modal> -->
      </molecules-card>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
import RadialProgressBar from "vue3-radial-progress";
import Typography from "~~/components/atoms/Typography.vue";
import { Row, Stack } from "@mpreston17/flexies";
import { useTasks } from "~~/hooks";
import { notify } from "~~/components/atoms/useToaster";
import { showModal } from "~~/components/molecules/useModal";
const props = defineProps({
  reward: { type: Object },
  active: { default: false },
});

const { tasks, rewards, deleteReward } = useTasks();
const { reward } = props;

const buttonsActive = ref(false);

// % completion of all Prerequisites
const completedPrereqs = computed(() => {
  return requirements.value.filter((t) => t.Status === "Done")?.length || 0;
});

// % completion of the points required for this Reward
const completedPoints = computed(() => {
  return cashedIn.value
    .filter((t) => t.Status === "Done")
    .reduce((total, next) => total + next.Points, 0);
});

const totalSteps = computed(() => reward.Points);

const percentCompleted = computed(() => {
  return ((completedPoints.value * 1.0) / reward.Points) * 100;
});

const requirements = computed(() => {
  return tasks.value.filter((task) => reward?.Prerequisites?.includes(task.id));
});

const cashedIn = computed(() => {
  return tasks.value.filter((task) => reward?.["Cashed-In"]?.includes(task.id));
});

function onMouseEnter() {
  buttonsActive.value = true;
}

function onMouseLeave() {
  buttonsActive.value = false;
}

/* API */

async function submitReward() {
  console.log("reward", reward);
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

  // closeModal();
  showModal.value = false;
  notify("Reward Submitted!", "Success!");
}

function concludeReward() {
  console.log("reward to conclude", reward);
  notify("concludeReward() Not implemented yet...", "Warning!", 100000);
}
</script>
