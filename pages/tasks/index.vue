<template>
  <NuxtLayout name="custom" class="">
    <Stack class="flex items-center justify-center w-auto m-8">
      <div class="flex items-center justify-center w-1/2">
        <Stack v-if="false">
          <!-- <pre>tasks?.length? {{ tasks?.length }}</pre> -->

          <typography type="h2">Add a Task</typography>
          <ul>
            <li class="p-2" v-for="(value, key, index) in task" :key="index">
              <Label class="m-2">{{ key }}:</Label>
              <input
                class="p-2 m-2 bg-transparent rounded-xl"
                type="text"
                v-bind:placeholder="key"
                @input="onChange"
              />
            </li>
          </ul>
          <atoms-button color="bg-tahiti-500" @click="submitTask">Submit</atoms-button>
          <typography type="b" v-show="error">{{ error }}</typography>
        </Stack>
      </div>

      <!-- Tasks List -->
      <!-- <pre>timer? {{ timer }}</pre> -->
      <!-- <pre>delay? {{ delay }}</pre> -->
      <div class="gap-4 overflow-auto display-block" v-for="(task, index) in tasks">
        <transition name="fade">
          <Card
            v-show="index >= timer / delay"
            class="gap-2 rounded-lg shadow-md shadow-regal-400/90 bg-regal-900/60 border-tahiti-200"
          >
            <!-- <template v-slot:header> -->
            <Row class="gap-12">
              <!-- Left Column -->
              <div
                class="flex items-center justify-center m-2 bg-white rounded-full shadow-lg w-36 h-36 shadow-regal-300/50"
              >
                <img
                  class="w-20 hover:scale-110"
                  src="../../assets/public/lobster-sticker.png"
                  alt="hierarchy"
                />
              </div>

              <!-- Right column -->
              <Stack>
                <typography v-if="task?.Name" type="h3">{{ task?.Name }}</typography>
                <typography v-else-if="!task?.id" class="" type="b">{{
                  "(no id!)"
                }}</typography>

                <!-- Notes -->
                <span class="overflow-y-auto w-120 w-128 max-h-128">
                  <typography v-if="task?.Notes" class="">
                    {{ task?.Notes }}
                  </typography>

                  <typography v-else class="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
                    minus ipsa impedit. Accusantium enim modi voluptatum iure at vel
                    placeat voluptatibus est, blanditiis dolores iste voluptatem esse
                    deserunt non neque?
                  </typography>
                </span>

                <Row class="gap-0">
                  <!-- <div class="w-4/5 h-1 bg-red"></div> -->
                  <div
                    v-for="(item, index) in task?.Points"
                    :key="index"
                    style="font-size: 0.75rem"
                  >
                    <star-icon
                      class="text-red"
                      height="10mm"
                      fill="#A71A23"
                      stroke="#D62338"
                    />
                  </div>
                  <div
                    v-for="(item, index) in 5 - task?.Points"
                    :key="index"
                    style="font-size: 0.75rem"
                  >
                    <star-icon
                      class="text-red"
                      height="10mm"
                      fill="#777"
                      stroke="#D62338"
                    />
                  </div>
                </Row>
              </Stack>
            </Row>
            <!-- </template> -->

            <template v-slot:footer>
              <Row>
                <span class="w-1/2"></span>

                <!-- Right -->
                <div>
                  <atoms-button class="m-2" @change="toggleDone(index)"
                    >Toggle {{ task?.Status }}</atoms-button
                  >
                  <atoms-button
                    @click="remove(index)"
                    class="m-2 text-white rounded-md shadow-sm bg-tahititi bg-red shadow-red"
                  >
                    Delete
                  </atoms-button>
                  <!-- <atoms-chip v-if="task?.Points" class="m-2">{{
                  task?.Points
                }}</atoms-chip> -->
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
// import { paragraph, currentTheme, lightPallete } from "../../hooks/useTheme";
import Typography from "~~/components/atoms/Typography.vue";
import StarIcon from "../../components/atoms/StarIcon.vue";
import Card from "~~/components/molecules/Card.vue";

const delay = 500;
const maxTasks = 10;
const duration = maxTasks * delay;

const timer = ref(duration);

let timerId = setInterval(() => {
  timer.value -= delay;
}, delay);

setTimeout(() => {
  clearInterval(timerId);
}, duration + delay);

const { tasks, createTask, patchTask, deleteTask, error, loading } = useTasks(maxTasks);

const initial = {
  Name: "",
  Notes:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. In distinctio earum labore a, veniam laborum tenetur delectus animi consequatur molestiae dolores vitae aperiam nulla ab fugit deserunt veritatis natus eos! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis quos quibusdam culpa necessitatibus nam, accusamus dignissimos eum error. Esse sed quae aspernatur porro inventore, enim suscipit voluptas modi aperiam consequatur.",
  Status: "Todo",
  Points: 1,
  // Frequency: null,
};

const task = ref({ ...initial });

// const error = ref("");

const picked = ref("");

const visible = ref(false);

async function submitTask() {
  if (tasks?.value.find((t) => t.Name === task?.value?.Name))
    throw new Error("Rats... this was already created");

  await createTask(task.value).then((response) => {
    console.log("response", response);
    tasks.value.push({ ...task.value });

    Object.assign(tasks.value, initial);
    // task.value = {
    //   Name: "",
    //   Notes: "",
    //   Status: "Todo",
    // };
    // task.value.Name = "";
  });
}

async function toggleDone(index) {
  // console.log("index", index);
  let current = tasks.value[index];
  current.Status = current?.Status !== "Todo" ? "Done" : "Todo";
  console.log("current", current);

  let fields = {
    ...current,
  };
  patchTask(fields).then((response) => {
    console.log("response", response);
  });
}

async function remove(index) {
  let current = tasks.value[index];
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

async function onSelect(index) {
  tasks.value[index].Status = "Todo";
}

async function updatePoints(index, value) {
  let currentTask = tasks.value[index];
  currentTask.Points = value;
  patchTask(currentTask);
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
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
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
