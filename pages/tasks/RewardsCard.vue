<template>
  <div class="bg-regal-800 hover:bg-regal-600">
    <molecules-card class="flex items-center justify-center opacity-90 roundex-lg">
      <Typography type="h4">{{ reward?.Name }}</Typography>
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
      <!-- <pre>Matching Prerequisites? {{ requirements?.length }}</pre> -->

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
const props = defineProps({
  reward: { type: Object },
});

const { tasks } = useTasks();
const { reward } = props;

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
