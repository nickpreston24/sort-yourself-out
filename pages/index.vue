<template>
  <NuxtLayout name="custom">
    <div class="h-screen">
      <Center>
        <Stack>
          <atoms-shadow
            class="w-128"
            v-if="true"
            textShadow="rgb(214 35 56)"
            type="basic"
          >
            <atoms-typography type="h1">{{ subject }}</atoms-typography>
          </atoms-shadow>
          <img class="w-auto max-h-64" src="~/assets/public/jordan-speaking.png" />

          <atoms-shadow type="basic">
            <atoms-typography type="p">{{ predicate }}</atoms-typography>
          </atoms-shadow>
        </Stack>
      </Center>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { Center, Stack, Right, Left } from "@mpreston17/flexies";
import { RNG } from "../helpers/random";
import { preference } from "vue-preferences";

const isDarkMode = computed(() => {
  return preference("isDarkModeEnabled", { defaultValue: false, reactive: false });
});

const subjects = [
  "Sort yourself out!",
  "You're a chipmanzee full of snakes!",
  "Clean your room young man!",
  "Make a 5 year plan!",
  "Oh, look who just put himself on the top of the dominance hierarchy!",
  "Pet a cat when you're on the street",
  "Let me lead you out of chaos",
];

const predicates = [
  "... or something approximating that...",
  "... in my estimation...",
  "... Bucko!",
  "... or you'll get sent to the gulags!!",
  "... Eh? ",
  ".. Gotcha!",
  ".. And into order!",
  "... so let's...go.",
  "... perhaps even you could manage that...",
];

const subject = ref("");
const predicate = ref("");
const sub = ref(RNG.Int(subjects.length) - 1);
const pred = ref(RNG.Int(predicates.length) - 1);

onMounted(() => {
  subject.value = subjects[sub.value];
  predicate.value = predicates[pred.value];
  return `${subject} ${predicate}`;
});
</script>
