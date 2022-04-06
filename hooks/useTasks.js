import { ref, onMounted, computed, toRefs } from "vue";
import { searchTable, getRecords } from "./airtable";

export function useTasks() {
  const tasks = ref([]);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    loading.value = true;

    tasks.value = await getRecords("Tasks").catch(console.error);

    loading.value = false;
  });

  return {
    tasks,
    loading,
    error,
    //api
  };
}

export default useTasks;
