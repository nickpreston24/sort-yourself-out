<template>
  <NuxtLayout name="custom" class="text-white">
    <Stack>
      <h1 class="text-4xl">My journal</h1>
      <pre>journal entries? {{ entries?.length }}</pre>

      <Stack class="max-w-xl max-h-md min-w-md">
        <molecules-card
          class="card rounded-xl bg-regal-800 p-tiny"
          v-for="(entry, index) in entries"
        >
          <template v-slot:header>
            <h3 v-if="entry?.Created" class="m-2 font-bold text-tahiti-500">
              On {{ entry?.Created }}:
            </h3>
          </template>
          <p class="m-4 text-regal-200" :key="index">{{ entry.Entry }}</p>

          <template v-slot:footer>
            <div>
              <!-- <p class="font-bold text-red">footer</p> -->
            </div>
          </template>
        </molecules-card>
      </Stack>
    </Stack>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Center, Right, Stack } from "@mpreston17/flexies";
import { useJournal } from "../../hooks/useJournal";

const { entries } = useJournal();
</script>
