<template>
  <div class="absolute bottom-0 right-0 mr-52 top-100">
    <!-- <h1 v-if="debug" class="mr-16">I'm running this on a toaster...</h1> -->
    <!-- absolute bottom-0 right-0 mr-52 top-100 -->
    <atoms-tooltip v-show="false" text="Make a Toast">
      <atoms-button @click="notify" class="w-8 h-8 bg-tahiti-500">
        <icons-plus-icon />
      </atoms-button>
   </atoms-tooltip>

    <Stack>
      <div v-for="(toast, index) in toastQ">
        <DirtyToast :debug="props.debug" :show="true" :toast="toast" :key="index">
        </DirtyToast>
      </div>

      <Row v-if="debug">
        <button @click="clear">Clear</button>
        <pre v-show="debug">count? {{ count }}</pre>
      </Row>
    </Stack>
  </div>
</template>
<script setup lang="ts">
import DirtyToast from "./DirtyToast.vue";
import { ref, onMounted, defineProps, computed } from "vue";
import { Flex, Row, Stack, Right, Center } from "@mpreston17/flexies";;
import Tooltip from "./Tooltip.vue";
import { toastQ, notify, clearToasts } from "./useToaster";

const props = defineProps({
  debug: { default: false },
});

const count = computed(() => toastQ?.value?.length || 0);
</script>
<style scoped>
.bottomright {
  position: fixed;
  right: 0px;
  bottom: 0px;
  width: 200px;
  height: 40px;
  background-color: lightblue;
  padding: 5px;
}
</style>
