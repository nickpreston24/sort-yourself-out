<template>
  <NuxtLayout name="custom">
    <h1>Main</h1>
    <pre>tasks? {{ tasks?.length }}</pre>

    <ul v-for="(task, index) in tasks">
      <li>
        <Row>
          <img class="w-8" src="../assets/public/lobster-sticker.png" alt="hierarchy" />
          <h2>{{ task?.Name }}</h2>
        </Row>
      </li>
    </ul>
  </NuxtLayout>
</template>
<script setup lang="ts">
import useTasks from "../hooks/useTasks";
import { Row, Stack } from "@mpreston17/flexies";

const { tasks } = useTasks();
</script>

<!-- <ul>
      <li class="p-2" v-for="(value, key, index) in part" :key="index">
        <Label>{{ key }}:</Label>
        <input
          class="bullet-border"
          type="text"
          v-bind:placeholder="key"
          @input="onChange"
        />
      </li>
    </ul> -->
