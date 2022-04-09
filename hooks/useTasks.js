import { ref, onMounted } from "vue";
import { getRecords, create, patch, deleteRecord } from "./airtable/airtable";

export function useTasks() {
  const tasks = ref([]);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    loading.value = true;

    tasks.value = await getRecords("Tasks").catch(console.error);

    loading.value = false;
  });

  const createTask = async (props) => create("Tasks", props);

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
