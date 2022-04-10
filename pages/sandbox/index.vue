<template>
  <NuxtLayout name="custom">
    <Row class="text-white">
      <div class="w-64 h-64 bg-transparent border-2">
        <atoms-typography type="h1">Regexer</atoms-typography>
        <input type="text" class="bg-regal-800" v-model="pattern" />
        <textarea class="bg-regal-800 text-tahiti-500" v-model="text"> </textarea>
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

      <div class="w-64 h-64 bg-transparent border-2"></div>
      <div class="w-64 h-64 bg-transparent border-2"></div>
      <div class="w-64 h-64 bg-transparent border-2"></div>
    </Row>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Stack, Row } from "@mpreston17/flexies";

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

const text = ref("Hello, there! \n32 nugs found");
const html = computed(() => {
  //   const re = new RegExp(pattern.value, "i");
  //   const re = new RegExp("(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})", "i");
  const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
  const matches = re.exec("2020-03-04");
  const year = matches?.groups?.year;

  return `
    <p class="text-red" color="red">
          ${text.value} year: <b>${year}</b>
    </p>
    `;
});
</script>

<style scoped>
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
