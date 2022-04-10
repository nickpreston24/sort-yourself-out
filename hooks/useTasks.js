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
    create("Tasks", props)
      .then((_) => (error.value = ""))
      .catch((err) => {
        console.log(err);
        error.value = err;
        // console.log("props", props);
      });

  const patchTask = async (props) =>
    patch("Tasks", props)
      .then((_) => (error.value = ""))
      .catch((err) => {
        console.error(err);
        error.value = err;
      });

  const deleteTask = async (id) =>
    deleteRecord("Tasks", id)
      .then((_) => (error.value = ""))
      .catch((err) => {
        console.error(err);
        error.value = err;
      });

  const createReward = async (props) =>
    create("Rewards", props)
      .then((_) => (error.value = ""))
      .catch((err) => {
        console.log(err);
        error.value = err;
        // console.log("props", props);
      });

  const patchReward = async (props) =>
    patch("Rewards", props)
      .then((_) => (error.value = ""))
      .catch((err) => {
        console.error(err);
        error.value = err;
      });

  const deleteReward = async (id) =>
    deleteRecord("Rewards", id)
      .then((_) => (error.value = ""))
      .catch((err) => {
        console.error(err);
        error.value = err;
      });

  return {
    tasks,
    loading,
    error,
    load,

    //tasks api

    createTask,
    patchTask,
    deleteTask,

    // rewards api

    createReward,
    deleteRecord,
    patchReward,
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
