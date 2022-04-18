<template>
  <NuxtLayout name="custom">
    <Row class="w-full">
      <!-- Rewards Cards -->

      <div class="w-1/2 mb-10 ml-4 mr-4 bg-transparent rewards-grid">
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
          @click="startNewModel('reward')"
        />
      </div>

      <!-- Tasks Grid -->
      <div class="w-1/2 m-4 task-grid">
        <!-- <pre>tasks? {{ filteredTasks.length }}</pre> -->
        <div
          class="gap-4 overflow-auto display-block"
          v-for="(task, index) in filteredTasks"
          :key="index"
        >
          <TaskCard
            :class="
              index === selectedTask
                ? 'border-2 border-tahiti-400'
                : 'border-2 border-transparent'
            "
            :active="index >= timer / delay"
            :task="task"
            :index="index"
            @click="setSelectedTask(index)"
          />
        </div>
        <plus-icon
          class="w-8 h-8"
          stroke="rgba(34 211 238)"
          @click="startNewModel('task')"
        />
      </div>
    </Row>

    <transition name="fade">
      <lobster-spinner
        v-if="loading"
        :show="loading"
        id="overlay"
        class="fixed absolute top-0 bottom-0 left-0 right-0 z-10 w-64 h-64 m-auto"
      />
    </transition>
    <pre>modelName? {{ modelName }}</pre>
    <FormModal
      class="bg-white"
      :model="currentModel.value"
      :onSubmit="onSubmit"
      :title="modelName"
    />
  </NuxtLayout>
</template>
<script lang="ts" setup>
import useTasks from "~/hooks/useTasks";
import { notify } from "~/components/atoms/useToaster";
import { Row, Stack, Center } from "@mpreston17/flexies";
import Typography from "~~/components/atoms/Typography.vue";
import StarIcon from "~~/components/icons/StarIcon.vue";
import PlusIcon from "~~/components/icons/PlusIcon.vue";
import Card from "~~/components/molecules/Card.vue";
import RewardsCard from "./RewardsCard.vue";
import FormModal from "~~/components/organisms/FormModal.vue";

import { closeModal, showModal } from "~~/components/molecules/useModal";
import TaskCard from "./TaskCard.vue";
import { collapsed } from "~~/components/organisms/sidebar/useSidebar";
import { sleep } from "~~/helpers/timers";

const delay = 175;
const maxTasks = ref(100);
const duration = maxTasks.value * delay;

const timer = ref(duration);

let timerId = setInterval(() => {
  timer.value -= delay;
}, delay);

setTimeout(() => {
  clearInterval(timerId);
}, duration + delay);

const {
  tasks,
  rewards,
  createTask,
  patchTask,
  deleteTask,
  load,
  error,
  loading,
  createReward,
  patchReward,

  filteredTasks,
} = useTasks(maxTasks.value);

const initialTask = {
  Name: "",
  Notes: "",
  Status: "Todo",
  Points: 1,
  // Frequency: null,
};

const initialReward = {
  Name: "",
  Points: 5,
  Notes: "",
  // Prerequisites: [],
};

// const filters = new Map {
//   'Show Done' : () => t=> t.Status === 'Done'
// ...
// }

const task = ref({ ...initialTask });
const reward = ref({ ...initialReward });

const picked = ref("");
const visible = ref(false);
const modelName = ref("task");
const currentModel = computed(() => {
  if (modelName.value === "task") return task;
  else if (modelName.value === "reward") return reward;
});

const selectedReward = ref(-1);
const selectedTask = ref(-1);

const reload = () => load(maxTasks.value);

onMounted(() => {
  collapsed.value = true;
  load(maxTasks.value);
});

function startNewModel(model = "task") {
  modelName.value = model;
  showModal.value = true;
}

function setSelectedReward(index) {
  selectedReward.value = selectedReward.value !== index ? index : -1;
}

function setSelectedTask(index) {
  selectedTask.value = selectedTask.value !== index ? index : -1;
}

function onSubmit() {
  if (modelName.value === "task") submitTask();
  else if (modelName.value === "reward") submitReward();
}

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

  closeModal();
  notify("Reward Submitted!", "Success!");
}
async function submitTask() {
  if (!task?.value?.Name) {
    error.value = "Name is a required Field";
    return;
  }

  // if (filteredTasks?.value.find((t) => t.Name)) {
  //   error.value = "Rats... this was already created";
  //   return;
  // }

  let newTask = {
    ...task.value,
    Points: parseInt(task.value?.Points),
    // Start: DateTime.local().toISO(),
    // Start: now.toISO(),
  };

  const response = await createTask(newTask);
  let record = response?.data?.records?.[0];

  if (record) {
    tasks.value.push({
      ...record.fields,
      id: record.id,
    });
  }

  notify("Task created successfully!", "Success!");
  closeModal();
  // clear();
  // Object.assign(task.value, initialTask);
}

// async function submitNotes(index) {
//   let updatedTask = filteredTasks.value[index];
//   console.log("submitted notes", updatedTask?.Notes);

//   console.log("updatedTask", updatedTask);
//   let records = Array.from([{ ...updatedTask }]);
//   console.log("records", records);

//   const response = await patchTask(records).then((_) => {
//     error.value = "";
//   });

//   editNotes(-1); //reset to nothing.
// }

// async function markTaskComplete(index) {
//   // console.log("index", index);
//   let updatedTask = filteredTasks.value[index];
//   updatedTask.Status = updatedTask?.Status === "Todo" ? "Done" : "Todo";
//   console.log("current", updatedTask);

//   console.log("updatedTask", updatedTask);
//   let records = Array.from([{ ...updatedTask }]);
//   console.log("records", records);

//   const response = await patchTask(records).then((_) => {
//     error.value = "";
//   });

//   notify("Task Completed! :D", "Completed!");
// }

async function removeTask(index) {
  let current = filteredTasks.value[index];
  console.log("current", current);
  deleteTask(current.id)
    .then((response) => {
      console.log("response", response);
      notify("Successfully removed task", "Success!");
      if (response.status === 200)
        tasks.value = tasks.value.filter((x) => x.id !== current.id);
    })
    .then((_) => {
      error.value = "";
    });
}

async function cashIn(index) {
  let updatedReward = rewards.value[selectedReward.value];
  let task = filteredTasks.value[index];

  const points = updatedReward.Points;
  if (!updatedReward?.["Cashed-In"]) updatedReward["Cashed-In"] = [];
  updatedReward?.["Cashed-In"].push(task.id);

  const total = updatedReward?.["Cashed-In"]?.length + 1;

  console.log("total", total);
  console.log("points", points);
  if (total > points) {
    // Notify("You can't add more Tasks to this Reward")
    return;
  }

  // TODO: check all other rewards to make sure I'm not cheating and using the same Tasks for multipe Rewards...

  let records = Array.from([
    { id: updatedReward.id, "Cashed-In": [...updatedReward?.["Cashed-In"]] },
  ]);

  await patchReward(records);
}

// async function updatePoints(index, value) {
//   let updatedTask = filteredTasks.value[index];
//   updatedTask.Points = value;

//   console.log("updatedTask", updatedTask);
//   let records = Array.from([{ ...updatedTask }]);
//   console.log("records", records);

//   const response = await patchTask(records).then((_) => {
//     error.value = "";
//   });
// }
</script>

<style scoped>
.task-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 1em;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 1em;
}

/* Fade */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
}

/* Bounce */
.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
