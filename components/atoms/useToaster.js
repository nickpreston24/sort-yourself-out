import { ref, onMounted } from "vue";
export const toastQ = ref([]);
export const duration = ref(5000);
const nextDuration = computed(() => {
  let previousToast = toastQ.value[count.value - 1];
  console.log("previousToast", previousToast);
  return (previousToast?.duration || duration.value) + duration.value;
});

const count = computed(() => toastQ.value?.length);
export function notify(message = "", title = "[!]") {
  // console.log("hello from notify!");
  console.log("nextDuration", nextDuration.value);
  toastQ.value.push({
    title,
    message,
    type: "success",
    id: count.value + 1,
    duration: duration.value,
    show: true,
  });
}

export function destroyToast(id) {
  toastQ.value = toastQ.value?.filter((t) => t.id !== id);
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
