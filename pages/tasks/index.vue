<template>
  <NuxtLayout name="custom">
    <div id="i-am-a-spacer" class="h-16 bg-transparent"></div>

    <!-- TODO: 1. Searchbar for tasks filtering -->
    <organisms-header :model="filteredTasks" />

    <!-- <div class="w-1/2">
      <div
        class="grid grid-rows-1 gap-4 m-4 desktop:grid-cols-4 sm:grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-3 md:grid-cols-2 border-tahiti-500"
        v-for="i in 10"
        :key="i"
      >
        <div class="w-32 h-32 font-bold text-white border-2 bg-tahiti-500">
          {{ i }}
        </div>
      </div>
    </div> -->

    <Stack class="gap-4">
      <atoms-pomodoro class="justify-center w-1/2" />

      <TaskStats />

      <Row>
        <molecules-card class="justify-center ml-8 bg-regal-700">
          <!-- 
        TODO: 6. Button for 'Perfect Day' spawning
        TODO:    1. This will automatically include the 'Essentials' Template 
        
        TODO:  11. Show Today's Perfect Day prominently
        TODO:  12. Show Tasks completeded today :)
        -->

          <router-link to="/tasks/add">
            <icons-plus-icon
              tooltip="Add a New Task!"
              class="w-8 h-8 m-4"
              Stack
              stroke="rgba(34 211 238)"
            />
          </router-link>

          <icons-reload-icon
            tooltip="Reload Tasks"
            class="w-8 h-8 m-4"
            Stack
            stroke="rgba(34 211 238)"
            @click="load(10)"
          />

          <icons-copy-icon
            tooltip="Spawn a new Perfect Day"
            class="w-8 h-8 m-4"
            Stack
            stroke="rgba(34 211 238)"
            @click="createPerfectDay"
          />

          <router-link to="/tasks/bulk">
            <icons-star-icon
              tooltip="Bulk Add Tasks"
              class="w-8 h-8 m-4"
              Stack
              stroke="rgba(34 211 238)"
            />
          </router-link>
        </molecules-card>
      </Row>
    </Stack>

    <Row class="w-full">
      <div
        class="grid gap-4 m-4 desktop:grid-cols-4 sm:grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-3 md:grid-cols-2"
      >
        <TaskCard
          v-for="(task, index) in filteredTasks"
          :key="index"
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
    </Row>

    <lobster-spinner
      :show="loading"
      :seconds="maxTasks / 10"
      id="overlay"
      class="fixed absolute top-0 bottom-0 left-0 right-0 z-10 w-64 h-64 m-auto"
    />
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { useTasks, filteredTasks } from "~/hooks/useTasks";
import { notify, notifyError } from "~/components/atoms/useToaster";
import { Row, Stack } from "@mpreston17/flexies";
import TaskCard from "./TaskCard.vue";
import { collapsed } from "~~/components/organisms/sidebar/useSidebar";
import TaskStats from "./TaskStats.vue";

const delay = 175;
const maxTasks = ref(50);
const pageSize = ref(25);
const duration = maxTasks.value * delay;
const timer = ref(duration);
const showStats = ref(false);

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

  // Scheduling
  createPerfectDay,
  assignTaskToReward,
  assignSubtaskToTask,
  scheduleTask,
} = useTasks(maxTasks.value, pageSize.value);

const initialTask = {
  Name: "",
  Notes: "",
  Status: "Todo",
  Points: 1,
  Start: new Date(),
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
// const store = useStorage("tasks-store", { maxTasks: maxTasks.value });

onMounted(() => {
  collapsed.value = true;

  load(maxTasks.value);
});

// function saveSettings() {
//   maxTasks.value = store.value?.maxTasks;
//   console.log("store.value", store.value?.maxTasks);
// }

function setSelectedTask(index) {
  selectedTask.value = selectedTask.value !== index ? index : -1;
}

function onSubmit() {
  submitTask();
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

  createTask(newTask);
  // let record = response?.data?.records?.[0];

  // if (record) {
  //   tasks.value.push({
  //     ...record.fields,
  //     id: record.id,
  //   });
  // }

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
    notifyError("You can't add more Tasks to this Reward");
    return;
  }

  // TODO: check all other rewards to make sure I'm not cheating and using the same Tasks for multipe Rewards...

  let records = Array.from([
    { id: updatedReward.id, "Cashed-In": [...updatedReward?.["Cashed-In"]] },
  ]);

  await patchReward(records);
}

async function updatePoints(value = 1) {
  let updatedTask = task;
  updatedTask.Points = value;

  console.log("updatedTask", updatedTask);
  let records = Array.from([{ ...updatedTask }]);
  console.log("records", records);

  const response = await patchTask(records).then((_) => {
    error.value = "";
  });
}
</script>

<style scoped>
.task-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 1em;
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
</style>
