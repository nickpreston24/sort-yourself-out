<template>
  <NuxtLayout name="custom">
    <div>
      <!-- Rewards Cards -->

      <!-- <pre>loading? {{ loading }}</pre> -->
      <!-- <pre>selectedReward? {{ rewards[selectedReward] }}</pre> -->
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
        <atoms-button class="w-16 h-16 bg-transparent border-2 border-tahiti-500">
          <plus-icon fill="#A71A23" stroke="#D62338" @click="startNewModel('reward')" />
        </atoms-button>
      </div>
      <!-- Tasks Grid -->
      <div class="m-4 task-grid">
        <div
          class="gap-4 overflow-auto display-block"
          v-for="(task, index) in filteredTasks"
          :key="index"
        >
          <transition
            name="fade"
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform scale-75 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="transform scale-75 opacity-0"
          >
            <div class="bg-regal-800 hover:bg-regal-600">
              <Card
                v-show="index >= timer / delay"
                class="gap-2 shadow-md shadow-regal-400/90 opacity-90"
              >
                <pre class="text-tiny"> {{ index }}</pre>
                <div class="flex flex-row items-center justify-evenly">
                  <!-- Left Column -->

                  <div class="m-2 sm:w-8 md:w-16 lg:w-24 xl:w-32">
                    <img
                      class="h-auto rounded-full shadow-lg max-wbutton-full shadow-regal-300/50 hover:scale-110"
                      src="~/assets/public/lobster-sticker.png"
                      alt="hierarchy"
                    />
                  </div>

                  <!-- Right column -->
                  <Stack>
                    <input
                      class="bg-regal-500 text-crimson-600"
                      v-if="editing == index"
                      v-model="task.Name"
                      type="text"
                      :id="index"
                    />
                    <typography v-else type="h3">{{ task?.Name }}</typography>

                    <!-- Notes -->
                    <span
                      class="h-24 m-2 overflow-y-auto rounded-md p-tiny text-crimson-600 bg-regal-500 sm:w-56 md:w-64 max-h-128"
                    >
                      <textarea
                        class="h-64 bg-regal-500 w-128 max-h-128"
                        v-if="editing == index"
                        v-model="task.Notes"
                        type="text"
                        :id="index"
                      />

                      <typography type="p" v-else>
                        {{ task?.Notes }}
                      </typography>
                    </span>

                    <Row class="gap-0">
                      <div
                        v-for="k in task?.Points || 0"
                        :key="k"
                        style="font-size: 0.75rem"
                      >
                        <star-icon
                          class="text-red"
                          height="10mm"
                          fill="#A71A23"
                          stroke="#D62338"
                          @click="updatePoints(index, k)"
                        />
                      </div>

                      <div
                        v-for="k in 5 - (task?.Points || 5)"
                        :key="k"
                        style="font-size: 0.75rem"
                      >
                        <star-icon
                          class="text-red"
                          height="10mm"
                          fill="#777"
                          stroke="#D62338"
                          @click="updatePoints(index, k + task?.Points)"
                        />
                      </div>
                    </Row>
                  </Stack>
                </div>
                <!-- </template> -->

                <template v-slot:footer>
                  <Flex class="flex justify-wrap">
                    <!-- Left -->
                    <Row class="w-2/5">
                      <AtomsChip :status="task?.Status">{{ task?.Status }}</AtomsChip>

                      <div
                        class="flex items-center justify-center w-6 h-6 p-0 text-sm text-white rounded-full"
                      >
                        <plus-icon fill="#A71A23" stroke="#D62338" />
                        <!-- <p>
                        {{ task?.["Subtasks"]?.Length || 0 }}
                      </p> -->
                      </div>
                    </Row>

                    <!-- Right -->
                    <div class="flex flex-row justify-evenly">
                      <atoms-button
                        v-if="editing != index"
                        class="m-2"
                        @click="editNotes(index)"
                        >Edit</atoms-button
                      >
                      <atoms-button
                        v-else-if="editing == index"
                        class="m-2"
                        @click="submitNotes(index)"
                        >Submit</atoms-button
                      >

                      <atoms-button class="m-2" @click="complete(index)"
                        >Complete</atoms-button
                      >
                      <atoms-button @click="remove(index)" class="m-2">
                        Delete
                      </atoms-button>

                      <atoms-button @click="cashIn(index)" class="m-2">
                        $$$
                      </atoms-button>
                    </div>
                    <span class="w-1/6"></span>
                  </Flex>
                </template>
              </Card>
            </div>
          </transition>
        </div>
        <atoms-button class="w-16 h-16 bg-transparent border-2 border-tahiti-500">
          <plus-icon fill="#A71A23" stroke="#D62338" @click="startNewModel('task')" />
        </atoms-button>
      </div>
    </div>

    <transition name="fade">
      <lobster-spinner
        v-if="loading"
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
import { Row, Stack, Center } from "@mpreston17/flexies";
import Typography from "~~/components/atoms/Typography.vue";
import StarIcon from "~~/components/icons/StarIcon.vue";
import PlusIcon from "~~/components/icons/PlusIcon.vue";
import Card from "~~/components/molecules/Card.vue";
import RewardsCard from "./RewardsCard.vue";
// import Modal from "~~/components/molecules/Modal.vue";
import FormModal from "~~/components/organisms/FormModal.vue";

import { closeModal, showModal } from "~~/components/molecules/useModal";

const delay = 250;
const maxTasks = 20;
const duration = maxTasks * delay;

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
} = useTasks(maxTasks);

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
const filteredTasks = computed(() => {
  return tasks.value;
  //.filter((t) => t.Status !== "Done");
});

const picked = ref("");
const visible = ref(false);
const editing = ref(-1);
const modelName = ref("task");
const currentModel = computed(() => {
  if (modelName.value === "task") return task;
  else if (modelName.value === "reward") return reward;
});

const selectedReward = ref(-1);

const reload = () => load(maxTasks);

function startNewModel(model = "task") {
  modelName.value = model;
  showModal.value = true;
}

function setSelectedReward(index) {
  selectedReward.value = selectedReward.value !== index ? index : -1;
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

  closeModal();
  // clear();
  // Object.assign(task.value, initialTask);
}

function editNotes(index) {
  editing.value = index;
}

async function submitNotes(index) {
  let updatedTask = filteredTasks.value[index];
  console.log("submitted notes", updatedTask?.Notes);

  console.log("updatedTask", updatedTask);
  let records = Array.from([{ ...updatedTask }]);
  console.log("records", records);

  const response = await patchTask(records).then((_) => {
    error.value = "";
  });

  editNotes(-1); //reset to nothing.
}

async function complete(index) {
  // console.log("index", index);
  let updatedTask = filteredTasks.value[index];
  updatedTask.Status = updatedTask?.Status === "Todo" ? "Done" : "Todo";
  console.log("current", updatedTask);

  console.log("updatedTask", updatedTask);
  let records = Array.from([{ ...updatedTask }]);
  console.log("records", records);

  const response = await patchTask(records).then((_) => {
    error.value = "";
  });
}

async function remove(index) {
  let current = filteredTasks.value[index];
  console.log("current", current);
  deleteTask(current.id)
    .then((response) => {
      console.log("response", response);
      // alert("Update complete!");
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

  const total = updatedReward?.["Cashed-In"]?.Length + 1;

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

async function updatePoints(index, value) {
  let updatedTask = filteredTasks.value[index];
  updatedTask.Points = value;

  console.log("updatedTask", updatedTask);
  let records = Array.from([{ ...updatedTask }]);
  console.log("records", records);

  const response = await patchTask(records).then((_) => {
    error.value = "";
  });
}
</script>

<!-- <select v-model="selected">
  <option @select="onSelect(index)" disabled value="">
    Please select one
  </option>
  <option>Todo</option>
  <option>Done</option>
  <option>In Progress</option>
</select> -->

<style scoped>
.task-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 1em;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
