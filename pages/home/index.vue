<template>
  <head>
    <h1>Home</h1>
  </head>
  <body>
    <p>Welcome home</p>
  </body>
  <atoms-button>
    <nuxt-link to="/about">about</nuxt-link>
  </atoms-button>

  <div>
    <h1 class="text-4xl text-orange-500">Hail Lobster!</h1>
    <img src="./assets/public/hail-lobster.png" class="w-32" alt="lobster" />

    <!-- <Row class="bg-black">
      <div class="w-32 h-32 border-2 bg-ocean-500">1</div>
      <div class="w-32 h-32 border-2 bg-ocean-500">2</div>
      <div class="w-32 h-32 border-2 bg-ocean-500">3</div>
      <div class="w-32 h-32 border-2 bg-ocean-500">4</div>
    </Row> -->
  </div>
</template>
<script setup lang="ts">
import { Flex, Row, Stack } from "@mpreston17/flexies";
</script>
