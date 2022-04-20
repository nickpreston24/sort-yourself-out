<template>
  <NuxtLayout name="custom" class="text-white">
    <Stack>
      <h1 class="text-4xl">My journal</h1>
      <pre>journal entries? {{ store.entries?.length }}</pre>
      <pre>count? {{ store.count }}</pre>

      <typography type="h2">Add an Entry</typography>

      <ul>
        <li class="p-2" v-for="(value, key, index) in entry" :key="index">
          <label class="m-2">{{ key }}:</label>
          <textarea
            class="p-2 m-2 bg-transparent rounded-xl"
            type="text"
            v-model="entry[key]"
            v-bind:placeholder="key"
          />
        </li>
      </ul>
      <atoms-typography
        v-if="store.error"
        class="text-crimson-500"
        type="b"
      ></atoms-typography>
      <Button @click="submitEntry">Submit</Button>

      <div id="journal-grid-container" class="journal-grid">
        <Box
          size="xl"
          :start="16"
          :step="12"
          class="gap-4 overflow-auto display-block"
          :key="index"
          v-for="(entry, index) in store.entries"
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
            <molecules-card class="card rounded-xl bg-regal-800 p-tiny">
              <template v-slot:header>
                <h3
                  v-if="entry?.['Created Time']"
                  class="m-2 overflow-hidden font-bold text-tahiti-500"
                >
                  On {{ entry?.["Created Time"] }}:
                </h3>
              </template>
              <p class="m-4 text-regal-200" :key="index">{{ entry.Text }}</p>
            </molecules-card>
          </transition>
        </Box>
      </div>
      <transition name="fade">
        <lobster-spinner
          v-if="store.loading"
          id="overlay"
          class="fixed absolute top-0 bottom-0 left-0 right-0 z-10 w-64 h-64 m-auto"
        />
      </transition>
    </Stack>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Flex, Row, Stack, Right, Center } from "@mpreston17/flexies";;
// import { useJournal } from "../../hooks/useJournal";
import store from "~~/hooks/useJournal";

// const { entries, loading, createJournalEntry, patchEntry, error, count } = store;

const entry = ref({
  Text: "",
});

onMounted(async () => {
  await store.load(10);
});

function submitEntry() {
  const response = store.createJournalEntry(entry.value).then((_) => {
    store.error.value = "";
    // entry.value.Text = "";
    entry.value = {
      Text: "",
    };
  });
}
</script>

<style scoped>
.journal-grid {
  display: grid;
  /* grid-auto-columns: 1fr; */
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
</style>
