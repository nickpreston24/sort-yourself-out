<template>
  <NuxtLayout name="custom">
    <!-- <pre>tasks? {{ tasks?.length }}</pre> -->

    <div>
      <div>
        <!-- <pre>tasks? {{ tasks }}</pre> -->
        <ul v-for="(task, index) in tasks">
          <li>
            <Row class="gap-2">
              <img
                class="w-8"
                src="../assets/public/lobster-sticker.png"
                alt="hierarchy"
              />
              <h2>{{ task?.Name }}</h2>
              <input
                type="checkbox"
                @change="toggleDone(index)"
                v-model="toggle"
                value="Todo"
              />

              <button
                @click="remove(index)"
                class="text-white rounded-md shadow-sm bg-red shadow-red"
              >
                Delete
              </button>
            </Row>

            <Stack v-if="task?.Notes" class="border-2 border-dotted border-red">
              <p>{{ task?.Notes }}</p>
              <atoms-chip class="text-white bg-black border-red">
                {{ task?.Status || "n/a" }}</atoms-chip
              >

              <!-- <select v-model="selected">
              <option @select="onSelect(index)" disabled value="">
                Please select one
              </option>
              <option>Todo</option>
              <option>Done</option>
              <option>In Progress</option>
            </select> -->
            </Stack>
          </li>
        </ul>

        <pre>task? {{ task }}</pre>
        <ul>
          <li class="p-2" v-for="(value, key, index) in task" :key="index">
            <Label>{{ key }}:</Label>
            <input
              class="bullet-border"
              type="text"
              v-bind:placeholder="key"
              @input="onChange"
            />
          </li>
        </ul>
        <atoms-button @click="submitTask">Submit</atoms-button>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import useTasks from "../hooks/useTasks";
import { Row, Stack, Center } from "@mpreston17/flexies";

const { tasks, createTask, patchTask, deleteTask } = useTasks();

const task = ref({
  Name: "",
  Notes: "",
  Status: "Todo",
  // Frequency: null,
});

const picked = ref("");

async function submitTask() {
  await createTask(task.value).then((response) => {
    console.log("response", response);
    tasks.value.push(task.value);
    alert("task created!");
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

async function toggleDone(index) {
  console.log("index", index);
  let current = tasks.value[index];
  current.Status = current?.Status !== "Todo" ? "Done" : "Todo";
  console.log("current", current);
  patchTask(current).then((response) => {
    console.log("response", response);
    // alert("Update complete!");
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
</script>
