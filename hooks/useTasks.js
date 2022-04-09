import { ref, onMounted } from "vue";
import { getRecords, create, patch, deleteRecord } from "./airtable/airtable";

export function useTasks(max = 10) {
  const tasks = ref([]);
  const rewards = ref([]);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    await load(max);
  });

  const createTask = async (props) =>
    create("Tasks", props).catch((err) => {
      console.err(err);
      error.value = err;
    });

  const patchTask = async (props) =>
    patch("Tasks", props).catch((err) => {
      console.err(err);
      error.value = err;
    });

  const deleteTask = async (id) =>
    deleteRecord("Tasks", id).catch((err) => {
      console.err(err);
      error.value = err;
    });

  return {
    tasks,
    loading,
    error,
    load,
    //api

    createTask,
    patchTask,
    deleteTask,
  };

  async function load(max = 10) {
    loading.value = true;

    tasks.value = await getRecords("Tasks", max).catch((err) => {
      error.value = err;
    });
    rewards.value = await getRecords("Rewards", 10).catch((err) => {
      error.value = err;
    });

    loading.value = false;
  }
}

export default useTasks;
