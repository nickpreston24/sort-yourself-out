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
      <!-- <pre class="text-tiny"> {{ index }}</pre> -->

      <molecules-card
        enableShadow="false"
        class="flex items-center justify-center m-4 rounded-lg opacity-90"
      >
        <atoms-typography class="ml-2 mr-2" type="h4">{{ task?.Name }}</atoms-typography>

        <Stack>
          <input
            class="bg-regal-500"
            v-if="editing"
            v-model="task.Name"
            type="text"
            :id="index"
          />
        </Stack>

        <Stack>
          <Row class="gap-0">
            <div v-for="k in task?.Points || 0" :key="k" style="font-size: 0.75rem">
              <icons-star-icon
                class="w-8 text-red"
                height="10mm"
                stroke="rgba(34 211 238)"
                fill="rgba(34 211 238)"
                @click="updatePoints(index, k)"
              />
            </div>

            <div
              v-for="k in maxPoints - (task?.Points || 5)"
              :key="k"
              style="font-size: 0.75rem"
            >
              <icons-star-icon
                class="w-8 text-red"
                height="10mm"
                stroke="rgba(34 211 238)"
                fill="#777"
                @click="updatePoints(index, k + task?.Points)"
              />
            </div>
          </Row>
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
          <atoms-typography v-if="task?.Points > 0" type="p"
            >Points: {{ completedPoints + "/" + task?.Points }}</atoms-typography
          >
        </Stack>

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
              @click="markTaskComplete"
              >Complete</icons-checkmark-icon
            >
            <icons-edit-icon
              v-if="!editing"
              class="w-8 h-8"
              fill="transparent"
              stroke="rgba(34 211 238)"
              tooltip="Edit this Task"
              @click="editNotes"
            />
            <icons-cross-icon
              tooltip="Cancel Edit"
              v-else-if="editing"
              class="w-8 h-8"
              stroke="rgba(34 211 238)"
              @click="submitNotes"
            />

            <icons-arrow-up
              stroke="rgba(34 211 238)"
              class="w-8 h-8"
              tooltip="Cash In! $_$"
              @click="cashIn"
            >
            </icons-arrow-up>

            <icons-copy-icon
              stroke="rgba(34 211 238)"
              class="w-8 h-8"
              tooltip="Clone this task"
              @click="cloneTask"
            >
            </icons-copy-icon>

            <icons-trash-icon
              class="w-8 h-8"
              stroke="rgba(34 211 238)"
              tooltip="Delete this Task"
              @click="removeTask"
            />
          </Row>

          <!-- <span class="w-1/6"></span> -->
        </Flex>

        <template v-slot:footer>
          <Box v-show="showNotes && !!task.Notes" class="">
            <textarea
              class="m-2 overflow-y-auto rounded-md p-tiny bg-regal-500 max-h-128 sm:w-128 md:w-144 lg:w-144 xl:w-144 laptop:w-144 desktop:w-144 2xl:w-144"
              v-if="editing"
              v-model="task.Notes"
              type="text"
              :id="index"
            />

            <atoms-typography type="p" v-else>
              {{ task?.Notes }}
            </atoms-typography>
          </Box>
        </template>
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

          
        </div>

        <template v-slot:footer>
          
        </template>
      </molecules-card> -->
    </div>
  </transition>
</template>

<script setup>
import { Row, Stack } from "@mpreston17/flexies";
import { useTasks } from "~~/hooks/useTasks";
import Card from "~/components/molecules/Card.vue";
import RadialProgressBar from "vue3-radial-progress";
const props = defineProps({
  task: { type: Object },
  active: { default: false },
  index: { default: -1 },
});

let { task } = props;
let { id } = task;

const { error, patchTask, cloneTask } = useTasks();
const maxPoints = 5;
const editing = ref(false);
const buttonsActive = ref(false);
const showNotes = ref(true);

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

const percentCompleted = computed(() => {
  return ((completedPoints.value * 1.0) / task.Points) * 100;
});

const subtasks = computed(() => {
  return task?.SubTasks?.length || 0;
});

async function submitNotes() {
  let updatedTask = task;
  console.log("submitted notes", updatedTask?.Notes);

  console.log("updatedTask", updatedTask);
  let records = Array.from([{ ...updatedTask }]);
  console.log("records", records);
}

async function markTaskComplete() {
  let updatedTask = task;
  const status = updatedTask?.Status;

  const nextStatus = () => {
    if (status === "Done") return "Todo";
    if (status === "In progress") return "Done";
    if (status === "Todo") return "In progress";
  };
  console.log("nextStatus", nextStatus());
  updatedTask.Status = nextStatus;
  console.log("updatedTask", updatedTask);

  let records = Array.from([{ ...updatedTask }]);

  // notify("Task Completed! :D", "Completed!");
}

async function updatePoints(stars) {
  let updatedTask = task;
  updatedTask.Points = stars;

  console.log("updatedTask", updatedTask);
  let records = Array.from([{ ...updatedTask }]);
  console.log("records", records);
}

async function editNotes() {}

function onMouseEnter() {
  buttonsActive.value = true;
  showNotes.value = true;
}

function onMouseLeave() {
  buttonsActive.value = false;
  showNotes.value = false;
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
/* Fade */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
}
</style>
