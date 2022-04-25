<template>
  <molecules-card class="rounded-sm bg-regal-700 p-xl">
    <div class="grid grid-cols-2 gap-2">
      <div v-for="(item, index) in taskStats" :key="index">
        <Row v-for="(value, key, subIndex) in item" :key="subIndex">
          <atoms-typography type="h4"
            >{{ key }}
            <atoms-typography type="b">{{ value }}</atoms-typography>
          </atoms-typography>
        </Row>
      </div>
    </div>
  </molecules-card>
</template>
<script setup>
import { Center, Stack, Row, Right, Left, Flex } from "@mpreston17/flexies";
import { taskStats } from "~~/hooks/useTasks";
</script>
