<template>
  <molecules-card class="justify-center bg-regal-700">
    <div class="grid grid-cols-2 gap-2">
      <div v-for="reward in rewardStats" :key="reward.id">
        <Row v-for="(value, key) in reward" :key="value.id">
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
import { rewardStats } from "~~/hooks/useTasks";
</script>
