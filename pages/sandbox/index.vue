<template>
  <Stack>
    <atoms-typography type="h1">Regexer</atoms-typography>
    <input type="text" v-model="pattern" />
    <textarea v-model="text"> </textarea>
    <div type="p" v-html="html"></div>

    <!-- <p>{{ matches.groups.year }}</p> -->

    <!-- <pre>extract? {{ extract(re, text) }}</pre> -->
    <!-- <ul>
      <li v-for="(match, index) in matches">
      </li>
    </ul> -->
  </Stack>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Stack } from "@mpreston17/flexies";

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
  color: #000;
}
div >>> a {
  text-decoration: none;
  font-weight: bold;
}
</style>
