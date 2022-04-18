<template>
  <div
    class="bg-regal-800 hover:bg-regal-600 from-regal-800 to-regal-700 shadow-regal-400/90 opacity-90 bg-gradient-to-l hover:bg-gradient-to-r"
  >
    <molecules-card class="flex items-center justify-center opacity-90 roundex-lg">
      <Typography type="h4">{{ reward?.Name }}</Typography>

      <!-- Buttons Action Bar -->
      <Row>
        <icons-plus-icon
          tooltip="ADD something AWESOME"
          class="w-8 h-8"
          fill="transparent"
          stroke="#faf"
        />
        <icons-trash-icon
          tooltip="PANDA"
          class="w-8 h-8"
          fill="transparent"
          stroke="#faf"
        />
        <icons-edit-icon
          tooltip="Alcohol, it's a hell of a drug"
          class="w-8 h-8"
          fill="transparent"
          stroke="#faf"
        />
        <icons-arrow-up
          tooltip="Assign to Reward"
          class="w-8 h-8"
          fill="transparent"
          stroke="#faf"
        />
        <icons-reload-icon
          tooltip="I'm reloading !!!"
          class="w-8 h-8"
          fill="transparent"
          stroke="#faf"
        />
        <icons-calendar-icon
          tooltip="Make a Schedule"
          class="w-8 h-8"
          fill="transparent"
          stroke="#faf"
        />
        <icons-copy-icon
          tooltip="Copy"
          class="w-8 h-8"
          fill="transparent"
          stroke="#faf"
        />
        <icons-cross-icon
          tooltip="Cancel"
          class="w-8 h-8"
          fill="transparent"
          stroke="#faf"
        />

        <icons-checkmark-icon
          tooltip="Cancel"
          class="w-8 h-8"
          fill="transparent"
          stroke="#faf"
        />
      </Row>

      <Row>
        <Typography type="p"
          >Points: {{ completedPoints + "/" + reward?.Points }}</Typography
        >

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
      <!-- <pre>Matching Prerequisites? {{ requirements?.length }}<buttonsActive/pre> -->

      <!-- <ul class="h-32 overflow-y-auto">
        <li v-for="(req, index) in requirements">
          <pre>{{ req.Name }} - {{ req.Points }} - {{ req.Status }}</pre>
        </li>
      </ul> -->
      <!-- <pre>totalSteps? {{ totalSteps }}</pre>
      <pre>completedPrereqs? {{ completedPrereqs }}</pre>
      <pre>completedPoints? {{ completedPoints }}</pre> -->
    </molecules-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
import RadialProgressBar from "vue3-radial-progress";
import Typography from "~~/components/atoms/Typography.vue";
import { Row, Stack } from "@mpreston17/flexies";
import { useTasks } from "~~/hooks";
import Tooltip from "~~/components/atoms/Tooltip.vue";
const props = defineProps({
  reward: { type: Object },
});

const { tasks } = useTasks();
const { reward } = props;

const buttonsActive = ref(false);
function toggleButtonsActive() {
  buttonsActive.value = !buttonsActive.value;
}

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
</script>
