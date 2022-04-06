import { ref, onMounted, computed, toRefs } from "vue";
import {
  searchTable,
  getRecords,
  create,
  patch,
  deleteRecord,
} from "./airtable";

export function useTasks() {
  const tasks = ref([]);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    loading.value = true;

    tasks.value = await getRecords("Tasks").catch(console.error);

    loading.value = false;
  });

  const createTask = async (props) => {
    return create("Tasks", props);
  };

  const patchTask = async (props) => patch("Tasks", props);

  const deleteTask = async (id) => deleteRecord("Tasks", id);

  return {
    tasks,
    loading,
    error,
    //api

    createTask,
    patchTask,
    deleteTask,
  };
}

export default useTasks;
