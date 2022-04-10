<template>
  <NuxtLayout name="custom">
    <Stack class="flex items-center justify-center w-auto">
      <div class="flex items-center justify-center w-1/2">
        <Stack v-if="true">
          <typography type="h2">Add a Task</typography>
          <ul>
            <li class="p-2" v-for="(value, key, index) in task" :key="index">
              <label class="m-2">{{ key }}:</label>
              <input
                class="p-2 m-2 bg-transparent rounded-xl"
                type="text"
                v-bind:placeholder="key"
                @input="onChange"
              />
            </li>
          </ul>
          <atoms-button color="bg-tahiti-500" @click="submitTask">Submit</atoms-button>
          <atoms-button color="bg-tahiti-500" @click="reload">Reload</atoms-button>
          <typography type="b" v-if="error">{{ error }}</typography>
        </Stack>
      </div>

      <!-- Tasks List -->
      <!-- <pre>tasks? {{ tasks?.length }}</pre> -->
      <!-- <pre>tasks shown? {{ filteredTasks?.length }}</pre> -->
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
          <Card
            v-show="index >= timer / delay"
            class="gap-2 rounded-lg shadow-md shadow-regal-400/90 bg-regal-900/60 border-tahiti-200"
          >
            <!-- <pre>task?.id? {{ task?.id }}</pre> -->
            <pre>{{ index }}</pre>
            <Row class="gap-12">
              <!-- Left Column -->
              <div
                class="flex items-center justify-center m-2 bg-white rounded-full shadow-lg w-36 h-36 shadow-regal-300/50"
              >
                <img
                  class="w-20 hover:scale-110"
                  src="~/assets/public/lobster-sticker.png"
                  alt="hierarchy"
                />
              </div>

              <!-- Right column -->
              <Stack>
                <typography type="h3">{{ task?.Name }}</typography>

                <!-- Notes -->
                <span
                  class="h-24 m-2 overflow-y-auto rounded-md p-tiny text-crimson-600 bg-regal-500 w-120 w-128 max-h-128"
                >
                  <!-- <pre>editing? {{ editing }}</pre> -->
                  <textarea
                    class="bg-regal-500 w-120 w-128 max-h-128"
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
                  <div v-for="k in task?.Points || 0" :key="k" style="font-size: 0.75rem">
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
            </Row>
            <!-- </template> -->

            <template v-slot:footer>
              <Row>
                <!-- Left -->
                <Row class="w-2/5">
                  <AtomsChip :status="task?.Status">{{ task?.Status }}</AtomsChip>

                  <div
                    class="flex items-center justify-center w-8 h-8 p-0 text-sm text-white border-2 rounded-full"
                  >
                    <p>
                      {{ task?.["Subtasks"]?.Length || 0 }}
                    </p>
                  </div>
                </Row>

                <!-- Right -->
                <div>
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
                  <atoms-button
                    @click="remove(index)"
                    class="m-2 text-white rounded-md shadow-sm bg-tahititi bg-red shadow-red"
                  >
                    Delete
                  </atoms-button>
                </div>
                <span class="w-1/6"></span>
              </Row>
            </template>
          </Card>
        </transition>
      </div>
    </Stack>

    <transition name="fade">
      <lobster-spinner
        v-if="loading"
        id="overlay"
        class="fixed absolute top-0 bottom-0 left-0 right-0 z-10 w-64 h-64 m-auto"
      />
    </transition>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import useTasks from "../../hooks/useTasks";
import { Row, Stack, Center } from "@mpreston17/flexies";
import Typography from "~~/components/atoms/Typography.vue";
import StarIcon from "../../components/atoms/StarIcon.vue";
import Card from "~~/components/molecules/Card.vue";

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

const { tasks, createTask, patchTask, deleteTask, load, error, loading } = useTasks(
  maxTasks
);

const initial = {
  Name: "",
  Notes: "",
  Status: "Todo",
  Points: 1,
  // Frequency: null,
};

const task = ref({ ...initial });
const filteredTasks = computed(() => {
  return tasks.value.filter((t) => !!t?.Name);
});

// const error = ref("");

const picked = ref("");

const visible = ref(false);
const editing = ref(-1);

const reload = () => load(maxTasks);
async function submitTask() {
  if (!task?.value?.Name) {
    error.value = "Name is a required Field";
    return;
  }

  if (filteredTasks?.value.find((t) => t.Name === task?.value?.Name)) {
    error.value = "Rats... this was already created";
    return;
  }

  const newTask = { ...task.value };

  const response = await createTask(newTask);
  console.log("response", response);

  let record = response?.data?.records?.[0];

  tasks.value.unshift({
    ...record.fields,
    id: record.id,
  });

  Object.assign(tasks.value, initial);
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

  patchTask(records).then((response) => {
    console.log("response", response);
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

  const response = await patchTask(records);
}

async function remove(index) {
  let current = filteredTasks.value[index];
  console.log("current", current);
  deleteTask(current.id).then((response) => {
    console.log("response", response);
    // alert("Update complete!");
    if (response.status === 200)
      tasks.value = tasks.value.filter((x) => x.id !== current.id);
  });
}

async function onChange(e) {
  const target = e.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  const name = target.placeholder;
  task.value[name] = value;
}

// async function onTextChanged(e) {
//   // console.log("e", e);
//   const index = e.target.id;
//   // console.log("index", index);
//   const target = e.target;
//   const value = target.type === "checkbox" ? target.checked : target.value;
//   const name = target.placeholder;

//   const editedTask = filteredTasks.value[index]; //[name] = value;
// }

async function updatePoints(index, value) {
  let updatedTask = filteredTasks.value[index];
  updatedTask.Points = value;

  console.log("updatedTask", updatedTask);
  let records = Array.from([{ ...updatedTask }]);
  console.log("records", records);

  patchTask(records).then((response) => {
    console.log("response", response);
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
