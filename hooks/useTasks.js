import { ref, onMounted, computed, toRefs } from "vue";
import { countEmpty, devmode, groupBy, isArray } from "../helpers";
import { searchTable, getRecords } from "./airtable";
import axios from "axios";

export function useTasks() {
  const tasks = ref([]);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    loading.value = true;

    tasks.value = await getRecords("Tasks").catch(console.error);

    devmode && console.log("tasks found", tasks);
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
