import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  css: ["~/assets/css/tailwind.css"],
  title: "Sort Yourself Out!",
  //https://reactgo.com/nuxt-change-favicon/
  // head: {
  //   title: process.env.npm_package_name || "",
  //   meta: [
  //     { charset: "utf-8" },
  //     { name: "viewport", content: "width=device-width, initial-scale=1" },
  //     {
  //       hid: "description",
  //       name: "description",
  //       content: process.env.npm_package_description || "",
  //     },
  //   ],
  //   link: [
  //     {
  //       rel: "icon",
  //       type: "image/x-icon",
  //       href: "~/assets/public/hail-lobster.png",
  //     },
  //   ],
  // },
});
