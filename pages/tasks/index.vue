<template>
  <NuxtLayout name="custom" class="">
    <Stack class="flex items-center justify-center w-auto m-8">
      <div class="flex items-center justify-center w-1/2 border-2">
        <Stack>
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
          <p v-show="error">{{ error }}</p>
        </Stack>
      </div>

      <Row
        class="flex flex-row-reverse items-center w-1/2 gap-2 border-2 justify-right display-block"
      >
        <molecules-card
          v-for="(task, index) in tasks"
          class="max-w-xl gap-2 min-w-32 min-h-16"
        >
          <template v-slot:header>
            <atoms-typography type="h4">{{ task?.Name }}</atoms-typography>
          </template>
          <Row>
            <img
              class="w-8"
              src="../../assets/public/lobster-sticker.png"
              alt="hierarchy"
            />
            <input type="checkbox" @change="toggleDone(index)" value="Todo" />
          </Row>

          <button
            @click="remove(index)"
            class="text-white rounded-md shadow-sm bg-tahititi bg-red shadow-red"
          >
            Delete
          </button>

          <Stack v-if="task?.Notes" class="">
            <!-- <p>{{ task?.Notes }}</p> -->
            <atoms-typography type="h4">{{ task?.Notes }} </atoms-typography>
            <atoms-typography type="b">{{ task?.Notes }} </atoms-typography>

            <atoms-chip v-if="task?.Status" class="text-white border-red">
              {{ task?.Status || "n/a" }}</atoms-chip
            >
          </Stack>
          <atoms-chip v-if="task?.Points" class="">{{ task?.Points }}</atoms-chip>
        </molecules-card>
      </Row>
    </Stack>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import useTasks from "../../hooks/useTasks";
import { Row, Stack, Center } from "@mpreston17/flexies";
import { paragraph, currentTheme, lightPallete } from "../../hooks/useTheme";
import Typography from "~~/components/atoms/Typography.vue";

const { tasks, createTask, patchTask, deleteTask } = useTasks();

const initial = {
  Name: "",
  Notes: "",
  Status: "Todo",
  // Points: 1,
  // Frequency: null,
};

const task = ref({ ...initial });

const error = ref("");

const picked = ref("");

async function submitTask() {
  if (tasks?.value.find((t) => t.Name === task?.value?.Name))
    throw new Error("Rats... this was already created");

  await createTask(task.value)
    .then((response) => {
      console.log("response", response);
      tasks.value.push(task.value);
      // task.value = { ...initial };
      task.value = {
        Name: "",
        Notes: "",
        Status: "Todo",
      };
    })
    .catch((err) => (error.value = err));
}

async function toggleDone(index) {
  // console.log("index", index);
  let current = tasks.value[index];
  current.Status = current?.Status !== "Todo" ? "Done" : "Todo";
  console.log("current", current);
  patchTask(current)
    .then((response) => {
      console.log("response", response);
      // alert("Update complete!");
    })
    .catch((err) => (error.value = err));
}

async function remove(index) {
  let current = tasks.value[index];
  console.log("current", current);
  deleteTask(current.id)
    .then((response) => {
      console.log("response", response);
      // alert("Update complete!");
      if (response.status === 200)
        tasks.value = tasks.value.filter((x) => x.id !== current.id);
    })
    .catch((err) => (error.value = err));
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
</script>

<!-- <select v-model="selected">
              <option @select="onSelect(index)" disabled value="">
                Please select one
              </option>
              <option>Todo</option>
              <option>Done</option>
              <option>In Progress</option>
            </select> -->
