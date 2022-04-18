<template>
  <transition
    name="fade"
    enter-active-class="duration-300 ease-out"
    enter-from-class="transform scale-75 opacity-0"
    enter-to-class="scale-100 opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="scale-100 opacity-100"
    leave-to-class="transform scale-75 opacity-0"
  >
    <div
      @mouseleave="onMouseLeave"
      @mouseenter="onMouseEnter"
      v-if="active"
      class="bg-regal-500 hover:bg-regal-600"
    >
      <pre class="text-tiny"> {{ index }}</pre>

      <molecules-card class="flex items-center justify-center opacity-90 roundex-lg">
        <atoms-typography type="h4">{{ task?.Name }}</atoms-typography>

        <atoms-atoms-typography type="p">{{ task?.Notes }}</atoms-atoms-typography>

        <Row>
          <atoms-typography v-if="task?.Points > 0" type="p"
            >Points: {{ completedPoints + "/" + task?.Points }}</atoms-typography
          >
          <atoms-typography type="p" v-if="subtasks?.length > 0"
            >Subtasks: {{ completedSubtasks + "/" + subtasks?.length }}</atoms-typography
          >
          <radial-progress-bar
            v-if="task?.Points > 0"
            :diameter="85"
            :completed-steps="completedPoints"
            :total-steps="totalSteps"
          >
            <atoms-typography type="b"
              >{{ percentCompleted.toFixed() }}%</atoms-typography
            >
          </radial-progress-bar>
        </Row>

        <!-- Buttons Action Bar -->
        <Flex class="flex justify-wrap">
          <Row class="w-2/5">
            <atoms-chip :status="task?.Status">{{ task?.Status }}</atoms-chip>

            <div
              class="flex items-center justify-center w-6 h-6 p-0 text-sm text-white rounded-full"
            >
              <plus-icon stroke="rgba(34 211 238)" />
            </div>
          </Row>

          <Row class="flex flex-row justify-evenly">
            <icons-checkmark-icon
              tooltip="Mark Task Completed"
              class="w-8 h-8"
              fill="transparent"
              stroke="rgba(34 211 238)"
              @click="markTaskComplete(index)"
              >Complete</icons-checkmark-icon
            >
            <icons-edit-icon
              v-if="editing != index"
              class="w-8 h-8"
              fill="transparent"
              stroke="rgba(34 211 238)"
              tooltip="Edit this Task"
              @click="editNotes(index)"
            />
            <icons-cross-icon
              v-else-if="editing == index"
              class="w-8 h-8"
              stroke="rgba(34 211 238)"
              @click="submitNotes(index)"
            />

            <icons-arrow-up
              stroke="rgba(34 211 238)"
              class="w-8 h-8"
              tooltip="Cash In! $_$"
              @click="cashIn(index)"
            >
            </icons-arrow-up>
            <icons-trash-icon
              class="w-8 h-8"
              stroke="rgba(34 211 238)"
              tooltip="Delete this Task"
              @click="removeTask(index)"
            />
          </Row>
          <span class="w-1/6"></span>
        </Flex>
        <!-- <molecules-modal>
        <template.header>
          <h1>Delete this for real?</h1>
        </template.header>
      </molecules-modal> -->
      </molecules-card>

      <!-- <molecules-card
        class="gap-2 shadow-md from-regal-800 to-regal-700 shadow-regal-400/90 opacity-90 bg-gradient-to-l hover:bg-gradient-to-r"
      >
        <div class="flex flex-row items-center justify-evenly">

          <div class="m-2 sm:w-8 md:w-16 lg:w-24 xl:w-32">
            <img
              class="h-auto rounded-full shadow-lg max-wbutton-full shadow-regal-300/50 hover:scale-110"
              src="~/assets/public/lobster-sticker.png"
              alt="hierarchy"
            />
          </div>

          <Stack>
            <input
              class="bg-regal-500 text-crimson-600"
              v-if="editing == index"
              v-model="task.Name"
              type="text"
              :id="index"
            />
            <atoms-typography v-else type="h3">{{ task?.Name }}</atoms-typography>

            <span
              class="h-24 m-2 overflow-y-auto rounded-md p-tiny text-crimson-600 bg-regal-500 sm:w-56 md:w-64 max-h-128"
            >
              <textarea
                class="h-64 bg-regal-500 sm:w-128 md:w-144 lg:w-144 xl:w-144"
                v-if="editing == index"
                v-model="task.Notes"
                type="text"
                :id="index"
              />

              <atoms-typography type="p" v-else>
                {{ task?.Notes }}
              </atoms-typography>
            </span>

            <Row class="gap-0">
              <div v-for="k in task?.Points || 0" :key="k" style="font-size: 0.75rem">
                <star-icon
                  class="w-8 text-red"
                  height="10mm"
                  stroke="rgba(34 211 238)"
                  @click="updatePoints(index, k)"
                />
              </div>

              <div
                v-for="k in 5 - (task?.Points || 5)"
                :key="k"
                style="font-size: 0.75rem"
              >
                <star-icon
                  class="w-8 text-red"
                  height="10mm"
                  stroke="rgba(34 211 238)"
                  @click="updatePoints(index, k + task?.Points)"
                />
              </div>
            </Row>
          </Stack>
        </div>

        <template v-slot:footer>
          
        </template>
      </molecules-card> -->
    </div>
  </transition>
</template>

<script setup>
import { Row, Stack } from "@mpreston17/flexies";
import { useTasks } from "~~/hooks";
import Card from "~/components/molecules/Card.vue";
import RadialProgressBar from "vue3-radial-progress";
const props = defineProps({
  task: { type: Object },
  active: { default: false },
  index: { default: -1 },
});

let { task } = props;
let { id } = task;

const { loading } = useTasks();

const buttonsActive = ref(false);

// % completion of all Prerequisites
const completedSubtasks = computed(() => {
  // return subtasks.value.filter((t) => t.Status === "Done")?.length || 0;
  return 0;
});

// % completion of the points required for this Task
const completedPoints = computed(() => {
  // return cashedIn.value
  //   .filter((t) => t.Status === "Done")
  //   .reduce((total, next) => total + next.Points, 0);
  return 0;
});

// Gets the nested Points from all subtasks, recursively and adds them.
const cumulativePoints = computed(() => {
  return 0;
});

const percentCompleted = computed(() => {
  return ((completedPoints.value * 1.0) / task.Points) * 100;
});

const subtasks = computed(() => {
  return task.SubTasks?.length || 0;
});

// function editTask(index) {
//   editIndex.value = index;
// }

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

async function markTaskComplete(index) {
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

  notify("Task Completed! :D", "Completed!");
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

function onMouseEnter() {
  buttonsActive.value = true;
}

function onMouseLeave() {
  buttonsActive.value = false;
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
