<template>
  <div>
    <NuxtLayout name="custom">
      <h1 class="text-4xl">Home</h1>

      <Center>
        <div class="gap-6">
          <MoleculesCard class="rounded-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti officia
            facilis amet esse architecto praesentium asperiores nihil eos neque quam
            maiores molestias sunt, et odio sapiente laborum ipsa commodi perferendis.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reprehenderit
            excepturi recusandae a quibusdam. Facilis, autem! Dolor, veniam nulla nisi
            nihil quas numquam provident beatae distinctio, quia ex possimus
            necessitatibus? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Vitae explicabo, quos doloribus perspiciatis soluta dolorem facilis possimus
            dolores? Consequuntur eos, eius repellat itaque enim vitae suscipit ullam quas
            ad impedit!
          </MoleculesCard>

          <MoleculesCard class="rounded-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti officia
            facilis amet esse architecto praesentium asperiores nihil eos neque quam
            maiores molestias sunt, et odio sapiente laborum ipsa commodi perferendis.
          </MoleculesCard>

          <MoleculesCard class="rounded-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti officia
            facilis amet esse architecto praesentium asperiores nihil eos neque quam
            maiores molestias sunt, et odio sapiente laborum ipsa commodi perferendis.
          </MoleculesCard>
        </div>
      </Center>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { Flex, Row, Stack, Right, Center } from "@mpreston17/flexies";;
</script>
