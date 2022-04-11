import VuePreferences from "vue-preferences";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VuePreferences);
});
