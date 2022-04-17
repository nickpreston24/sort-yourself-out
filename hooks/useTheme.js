import { ref, computed, reactive } from "vue";

export const backgrounds = {
  tahiti: "bg-tahiti-400 hover:bg-tahiti-500",
  lobster: "bg-crimson-400 hover:bg-crimson-500",
  sunglo: "bg-sunglo-400 hover:bg-sunglo-500",
};

export const texts = {
  tahiti: "text-tahiti-400 hover:text-tahiti-500",
  lobster: "text-crimson-400 hover:text-crimson-500",
  sunglo: "text-sunglo-400 hover:text-sunglo-500",
};

// const twColor = ref("tahiti");

/**
 * Palletes
 * [60-30-10% Rule](https://youtu.be/UWwNIMHFdW4):
 */

export const themes = reactive({
  // Light
  captainAmerica: {
    60: `cocoa-bean-100`,
    30: `crimson-500`,
    // Actionables
    10: `tahiti-500`,
  },

  // Dark
  hailLobster: {
    60: `regal-900`,
    30: `crimson-500`,
    // Actionables
    10: `tahiti-500`,
  },
  // Reversed
  rockLobster: {
    60: `tahiti-500`,
    30: ``,
    // Actionables
    10: `tahiti-500`,
  },
});

export const lightPallete = computed(() => {
  const bg = themes.hailLobster["30"];
  return `border-tahiti-500 bg-${bg} text-tahiti-300`;
});

const lightPalleteAlt = computed(
  () => `border-tahiti-500 bg-slate-100 text-orange-500`
);

const darkPallete = computed(() => {
  const { hailLobster } = themes;
  return `border-${hailLobster[10]} bg-${hailLobster[30]} text-${hailLobster[60]}`;
});

const darkPalleteAlt = computed(
  () => `border-regal-300 bg-regal-500 text-ocean-300`
);

/**
 * Theme Map
 */
export const themeMap = computed(() => {
  return {
    dark: {
      headers: `${darkPallete.value}`,
      paragraph: `text-ocean-500`,
      buttons: `${darkPallete.value} hover:bg-regal-500 focus:ring-regal-500`,
      sidebar: `${darkPallete.value}`,
      table: `${darkPallete.value}`,
      link: `${darkPallete.value}`,
      card: `bg-slate-200 text-regal-800 rounded-xl border-regal-400`,
      banner: `${darkPallete.value}`,
      breadcrumb: `${darkPallete.value}`,
      footer: `${darkPallete.value}`,
      dashboard: `${darkPallete.value}`,
      page: `${darkPalleteAlt.value} Proxima Nova`,
      tableHeader: `${darkPalleteAlt.value}`,
      chip: `${darkPallete.value} !border-ocean-500 shadow-md shadow-ocean-400/50`,
      lobster: `shadow-lg shadow-red`,
    },
    light: {
      headers: `${lightPallete.value}`,
      paragraph: `text-tahiti-300`,
      buttons: `${lightPallete.value} hover:bg-tahiti-600 focus:ring-tahiti-600`,
      sidebar: `${lightPallete.value}`,
      table: `${lightPallete.value} `,
      link: `${lightPallete.value}`,
      card: `bg-slate-100 text-slate-700 rounded-xl border-orange-600 shadow-ocean-500`,
      banner: `${lightPallete.value}`,
      breadcrumb: `${lightPallete.value}`,
      footer: `${lightPallete.value}`,
      dashboard: `${lightPalleteAlt.value}`,
      page: `${lightPalleteAlt.value}`,
      tableHeader: `${lightPallete.value}`,
      chip: `${lightPallete.value} shadow-md shadow-tahiti-400/50`,
      lobster: `shadow-lg shadow-red`,
    },
  };
});

// TODO: After adding more themes, designate which ones are dark and light, and update this to a computed property.
export const darkMode = ref(true);
export const currentTheme = computed(
  () => themeMap.value[darkMode.value ? "dark" : "light"]
);

// Always compute the classes, here.  They can be referenced by name will filter out button themes without mixiing in header themes.
export const primaryButton = computed(() => currentTheme.value["buttons"]);
export const header = computed(() => currentTheme.value["headers"]);
export const sidebar = computed(() => currentTheme.value["sidebar"]);
export const table = computed(() => currentTheme.value["table"]);
export const link = computed(() => currentTheme.value["link"]);
export const card = computed(() => currentTheme.value["card"]);
export const banner = computed(() => currentTheme.value["banner"]);
export const breadcrumb = computed(() => currentTheme.value["breadcrumb"]);
export const footer = computed(() => currentTheme.value["footer"]);
export const dashboard = computed(() => currentTheme.value["dashboard"]);
export const page = computed(() => currentTheme.value["page"]);
export const tableHeader = computed(() => currentTheme.value["tableHeader"]);
export const chip = computed(() => currentTheme.value["chip"]);
export const paragraph = computed(() => currentTheme.value["paragraph"]);
export const lobster = computed(() => currentTheme.value["lobster"]);

// // Allow theme changes, but hide the current theme value
// export const setTheme = (name = "tahiti") => {
//   twColor.value = name;
// };

// Toggle between dark and light themes
export const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
};
