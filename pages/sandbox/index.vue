<template>
  <NuxtLayout name="custom" class="h-screen">
    <div class="sandbox-grid">
      <Box size="md" class="">
        <atoms-typography type="h4">Toasts Test</atoms-typography>

        <pre>Toasts? {{ toastCount }}</pre>
        <pre>duration? {{ duration }}</pre>
        <input class="text-white bg-regal-500" v-model="duration" placeholder="1500" />
        <input
          class="mt-2 text-white bg-regal-500"
          v-model="toastTitle"
          :placeholder="toastTitle!"
        />

        <input
          class="mt-2 text-white bg-regal-500"
          v-model="toastText"
          :placeholder="toastText!"
        />

        <atoms-tooltip text="Click for Toast!">
          <atoms-button @click="makeToast">Button of Awesome</atoms-button>
          <atoms-button @click="clearToasts">Clear Toasts</atoms-button>
       </atoms-tooltip>
      </Box>

      <Box size="md" class="">
        <atoms-typography type="h4">Airtable Forms</atoms-typography>
      </Box>

      <Box size="md" class="">
        <atoms-typography type="h4">Randomizer</atoms-typography>
        <span>
          {{ RNG.Lorem() }}
        </span>
      </Box>

      <Box size="xl" class="border-2 bg-regal-500">
        <atoms-typography type="h4">SVG Icons</atoms-typography>

        <Row>
          <icons-star-icon
            class="w-16 h-16 border-2"
            fill="#faf"
            stroke="#fae"
            tooltip="sparkles!"
          />
          <icons-plus-icon
            tooltip="ADD something AWESOME"
            class="w-16 h-16 border-2"
            fill="#A71A23"
            stroke="#D62338"
          />
          <icons-trash-icon
            tooltip="PANDA"
            class="w-16 h-16 border-2"
            fill="transparent"
            stroke="#faf"
          />
          <icons-edit-icon
            tooltip="Alcohol, it's a hell of a drug"
            class="w-16 h-16 border-2"
            fill="transparent"
            stroke="#5fa"
          />
          <icons-arrow-up
            tooltip="Assign to Reward"
            class="w-16 h-16 border-2"
            fill="transparent"
            stroke="#aaf"
          />
          <icons-reload-icon
            tooltip="I'm reloading !!!"
            class="w-16 h-16 border-2"
            fill="transparent"
            stroke="#afa"
          />
          <icons-calendar-icon
            tooltip="Make a Schedule"
            class="w-16 h-16 border-2"
            fill="transparent"
            stroke="#5fa"
          />
        </Row>
      </Box>

      <Box size="md" class="">
        <atoms-typography type="h4">Tooltip Test</atoms-typography>
        <Row>
          <atoms-tooltip text="Yo ho ho! this be a tooltip!">
            <p class="!text-sunglo-300 text-tiny">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
         </atoms-tooltip>

          <atoms-tooltip
            background="bg-[rgb(6,250,11)]"
            text="Ho ho ho! I've got a machine gun!"
          >
            <atoms-button @click="toggleDarkMode">{{
              darkMode ? "Light Mode" : "Dark Mode"
            }}</atoms-button>
         </atoms-tooltip>
        </Row>
      </Box>

      <!-- TODO: Complains of CommonJS modlues or something -->
      <!-- <div class="h-128">
        <atoms-typography type="h4">Pomodoro Test</atoms-typography>
        <Pomodoro />
      </div> -->
    </div>

    <Row v-if="false" class="text-white">
      <div class="w-64 h-64 bg-transparent border-2">
        <atoms-typography type="h1">Regexer</atoms-typography>
        <input type="text" class="bg-regal-800" v-model="pattern" />
        <textarea class="bg-regal-800 text-tahiti-500" v-model="rawText"> </textarea>
        <div type="p" class="bg-regal-800" v-html="html"></div>
        <!-- <p>{{ matches.groups.year }}</p> -->
        <!-- <pre>extract? {{ extract(re, text) }}</pre> -->
        <!-- <ul>
          <li v-for="(match, index) in matches">
          </li>
        </ul> -->
      </div>

      <div class="flex flex-col items-center w-auto border-2 bg-regal-100 min-h-64">
        <input class="bg-regal-500" v-model="headerValue" />

        <atoms-shadow textShadow="#47a">
          <h1 class="text-3xl">
            {{ headerValue }}
          </h1>
        </atoms-shadow>
        <atoms-shadow type="inset">
          <h1 class="text-3xl">
            {{ headerValue }}
          </h1>
        </atoms-shadow>

        <atoms-shadow type="letterpress" textShadow="#754">
          <h1 class="text-3xl">
            {{ headerValue }}
          </h1>
        </atoms-shadow>
        <atoms-shadow type="hard">
          <h1 class="text-3xl">
            {{ headerValue }}
          </h1>
        </atoms-shadow>
        <atoms-shadow type="double">
          <h1 class="text-3xl">
            {{ headerValue }}
          </h1>
        </atoms-shadow>
        <atoms-shadow class="bg-[#e6d7ab]" type="distant" textShadow="#b2a98f">
          <h1 class="text-3xl">
            {{ headerValue }}
          </h1>
        </atoms-shadow>
        <atoms-shadow type="pop">
          <h1 class="text-3xl">
            {{ headerValue }}
          </h1>
        </atoms-shadow>
        <atoms-shadow type="glowing">
          <h1 class="text-3xl">
            {{ headerValue }}
          </h1>
        </atoms-shadow>
      </div>
    </Row>
    <div v-if="false" class="bg-green-400">
      <div class="flex items-center justify-center min-h-screen">
        <div class="sandbox-grid">
          <div
            v-for="i in 15"
            class="flex flex-col justify-center p-10 text-lg font-bold text-center text-green-500 bg-green-100 rounded-lg"
            :key="i"
          >
            {{ i }}
          </div>

          <div
            class="flex flex-col justify-center col-span-2 p-10 text-lg font-bold text-center text-green-500 bg-green-100 rounded-lg"
          >
            hi
          </div>

          <div
            class="flex flex-col justify-center col-span-2 row-span-3 p-10 text-lg font-bold text-center text-green-500 bg-green-100 rounded-lg"
          >
            hi
          </div>
          <div
            class="flex flex-col justify-center p-10 text-lg font-bold text-center text-green-500 bg-green-100 rounded-lg"
          >
            hi
          </div>
        </div>
      </div>

      <!-- tw -->

      <pre>randomInt? {{ randomInt }}</pre>

      <!-- <div class="grid grid-cols-3 gap-4 p-5">
        <div
          class="row-span-2 p-10 text-lg font-bold text-center text-green-500 bg-green-100 rounded-lg shadow-lg"
        >
          1
        </div>
        <div
          class="p-10 text-lg font-bold text-center text-green-500 bg-green-100 rounded-lg shadow-lg"
        >
          2
        </div>
        <div
          class="row-span-2 p-10 text-lg font-bold text-center text-green-500 bg-green-100 rounded-lg shadow-lg"
        >
          3
        </div>
        <div
          class="p-10 text-lg font-bold text-center text-green-500 bg-green-100 rounded-lg shadow-lg"
        >
          4
        </div>
        <div
          class="col-span-3 p-10 text-lg font-bold text-center text-green-500 bg-green-100 rounded-lg shadow-lg"
        >
          5
        </div>
      </div> -->

      <Toaster :debug="true" />
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Flex, Row, Stack, Right, Center } from "@mpreston17/flexies";;
import { RNG } from "~~/helpers/random";
import Typography from "~~/components/atoms/Typography.vue";
import Pomodoro from "~~/components/atoms/Pomodoro.vue";
import Tooltip from "~~/components/atoms/Tooltip.vue";
import { darkMode, toggleDarkMode } from "~~/hooks";
import DirtyToast from "~~/components/atoms/DirtyToast.vue";
import Toaster from "~~/components/atoms/Toaster.vue";
import {
  notify,
  Notifier,
  toastType,
  toastQ,
  duration,
  clearToasts,
} from "~~/components/atoms/useToaster";

const randomInt = ref(RNG.Int(3));
const headerValue = ref("");

type Person = {
  first: String;
  last: String;
  ssn: Number;
};

const pattern = ref(`(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})`);

const extract = (regex, text): Person => {
  return {
    first: " blah",
    last: " blah",
    ssn: 123457896,
  };
};

const rawText = ref("");
const html = computed(() => {
  //   const re = new RegExp(pattern.value, "i");
  //   const re = new RegExp("(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})", "i");
  const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
  const matches = re.exec("2020-03-04");
  const year = matches?.groups?.year;

  return `
    <p class="text-red" color="red">
          ${rawText.value} year: <b>${year}</b>
    </p>
    `;
});

/** Toasts */

const toastTitle = ref("Yer Eternal Reward");
const toastText = ref("Oi! that stings!");
const toastCount = computed(() => toastQ?.value?.length);
function makeToast() {
  // RNG.Int;
  const notifier = new Notifier()
    .message("Hello, there!")
    .title("Eat My shorts!")
    .type(toastType.WARNING)
    .notify();
  // notify(RNG.Lorem(), toastTitle.value, 5000, "indefinite");

  // notify(toastText.value, toastTitle.value);
}
</script>

<style scoped>
.sandbox-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;

  margin-inline: auto;
  width: min(95%, 70rem);
}
/* 
.span-2 {
  grid-column: span 2;
}

.span-3 {
  grid-column: span 3;
} */

div >>> p {
  font-size: 24px;
  font-weight: 300;
  /* color: #fff; */
  color: rgb(214 35 56 / var(--tw-text-opacity));
}
div >>> a {
  text-decoration: none;
  font-weight: bold;
}
</style>
