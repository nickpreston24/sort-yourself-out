<template>
  <div>
    <!-- <atoms-typography type="h1">
      <atoms-shadow type="basic"> Schedule </atoms-shadow>
    </atoms-typography> -->

    <Flex class="grid grid-cols-2">
      <Stack>
        <atoms-shadow class="text-4xl" type="double">
          <atoms-typography type="h1"> Tasks </atoms-typography>
        </atoms-shadow>

        <iframe
          class="airtable-embed bg-regal-800"
          src="https://airtable.com/embed/shrwKPki5zNB7S7Zl?backgroundColor=gray&viewControls=on"
          frameborder="0"
          onmousewheel=""
          width="100%"
          height="533"
          style="background: transparent; border: 1px solid #ccc"
        ></iframe>
      </Stack>

      <Stack>
        <atoms-shadow class="text-4xl text-crimson-500" type="double">
          Rewards
        </atoms-shadow>

        <iframe
          class="airtable-embed"
          src="https://airtable.com/embed/shrOUDqfvPs0jKfUM?backgroundColor=gray&viewControls=on"
          frameborder="0"
          onmousewheel=""
          width="100%"
          height="533"
          style="background: transparent; border: 1px solid #ccc"
        ></iframe>
      </Stack>
    </Flex>
  </div>
</template>

<script setup lang="ts">
import { Flex, Row, Stack, Right, Center } from "@mpreston17/flexies";;
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1em;
}
</style>
