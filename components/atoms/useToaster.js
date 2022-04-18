import { ref, onMounted } from "vue";
import { RNG } from "~~/helpers/random";
export const toastQ = ref([]);
export const duration = ref(10000);
const nextDuration = computed(() => {
  let previousToast = toastQ.value[count.value - 1];
  console.log("previousToast", previousToast);
  return (previousToast?.duration || duration.value) + duration.value;
});

const count = computed(() => toastQ.value?.length);

export class Notifier {
  constructor() {}

  message(text) {
    this.message = text;
    return this;
  }

  title = (text) => {
    this.title = text;
    return this;
  };

  type = (typeObj) => {
    console.log("typeObj", typeObj);
    this.type = typeObj;
    console.log("this.type", this.type);
    return this;
  };

  id = (id) => {
    this.id = id || `${this.title} ${RNG.Int(100 * count.value)}`;
    return this;
  };

  notify = () => {
    const { title, message, type } = this;
    toastQ.value.push({
      title,
      message,
      type,
      id: `${title} ${RNG.Int(100 * count.value)}`,
      duration: toastType?.duration || duration || duration.value,
      show: true,
    });
  };
}

export function notify(
  message = "",
  title = "",
  duration = 5000,
  type = "success"
) {
  console.log("nextDuration", nextDuration.value);

  toastQ.value.push({
    title,
    message,
    type,
    id: `${title} ${RNG.Int(100 * count.value)}`,
    duration:
      toastType?.[type.toUpperCase()]?.duration || duration || duration.value,
    show: true,
  });
}

export function destroyToast(toast) {
  console.log("toast", toast);
  toastQ.value = toastQ?.value?.filter((t) => t?.id !== toast?.id) || [];
}

export function clearToasts() {
  // toastQ.value = [];
  while (toastQ.value?.length > 0) {
    destroyToast(toastQ.value.pop());
  }
}

// onMounted(() => {
// let max = 10;
// for (let i = max; i > 0; i--) {
//   console.log("i", i);
//   toastQ.value.push({
//     message: "Hello, There!",
//     duration: i * milliseconds.value,
//   });
// }
// });

export const toastType = {
  SUCCESS: {
    type: "success",
    duration: 3000,
    background: "bg-ocean-500/80",
  },
  WARNING: {
    type: "warning",
    duration: 5000,
    background: "bg-yellow-500/80",
  },
  ERROR: {
    type: "error",
    duration: 10000,
    background: "bg-crimson-500/80",
  },
  INDEFINITE: {
    type: "indefinite",
    duration: 999999,
    background: "bg-sunglo-500/80",
  }, // long-running.
  //... achievement?  long?
};
