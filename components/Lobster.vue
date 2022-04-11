<template>
  <div>
    <Stack>
      <img
        src="~/assets/public/hail-lobster.png"
        class="w-32 h-auto rounded-full sm:w-28 sm:h-28 shadow-crimson-500/50"
        alt="lobster"
        :class="lobster"
      />
      <!-- <h1 class="m-8 text-4xl text-orange-700 lobster">Hail Lobster!</h1> -->
    </Stack>
  </div>
</template>

<script setup lang="ts">
import { Right, Stack, Left } from "@mpreston17/flexies";
import { darkMode, lobster } from "../hooks/useTheme";
function toggleTheme() {
  darkMode.value = !darkMode.value;
}
</script>
<style scoped>
.lobster {
  text-shadow: 4px 6px 8px rgba(255, 0, 0, 0.5);
}
</style>
