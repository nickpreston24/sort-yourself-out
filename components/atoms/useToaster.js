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
export function notify(message = "", title = "", timeout = 6000) {
  console.log("nextDuration", nextDuration.value);
  toastQ.value.push({
    title,
    message,
    type: "success",
    id: `${title} ${RNG.Int(100 * count.value)}`,
    duration: duration.value,
    show: true,
  });
}

export function destroyToast(toast) {
  console.log("toast", toast);
  toastQ.value = toastQ?.value?.filter((t) => t?.id !== toast?.id);
}

export function clearToasts() {
  toastQ.value = [];
}

onMounted(() => {
  // let max = 10;
  // for (let i = max; i > 0; i--) {
  //   console.log("i", i);
  //   toastQ.value.push({
  //     message: "Hello, There!",
  //     duration: i * milliseconds.value,
  //   });
  // }
});
