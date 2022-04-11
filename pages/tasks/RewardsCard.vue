<template>
  <div class="bg-regal-800 hover:bg-regal-600">
    <molecules-card class="flex items-center justify-center opacity-90 roundex-lg">
      <Typography type="h4">{{ reward?.Name }}</Typography>
      <Row>
        <Typography type="p"
          >Points: {{ completedPoints + "/" + reward?.Points }}</Typography
        >

        <Typography type="p"
          >Requirements: {{ completedPrereqs + "/" + requirements?.length }}</Typography
        >

        <radial-progress-bar
          :diameter="75"
          :completed-steps="completedPrereqs"
          :total-steps="totalEntries"
        >
          <Typography type="b">{{ percentCompleted.toFixed() }}%</Typography>
        </radial-progress-bar>
      </Row>
      <!-- <pre>Matching Prerequisites? {{ requirements?.length }}</pre> -->

      <!-- <ul>
        <li v-for="(req, index) in requirements">
          <pre>{{ req.Name }} - {{ req.Points }} - {{ req.Status }}</pre>
        </li>
      </ul>

      <pre>totalEntries? {{ totalEntries }}</pre>
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
  return requirements.value
    .filter((t) => t.Status === "Done")
    .reduce((total, next) => total + next.Points, 0);
});

const totalEntries = computed(() => requirements.value.length);

const percentCompleted = computed(() => {
  return 0;
});

const requirements = computed(() => {
  return tasks.value.filter((task) => reward?.Prerequisites?.includes(task.id));
});
</script>
