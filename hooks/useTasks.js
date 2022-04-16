import { ref, onMounted } from "vue";
import { getRecords, create, patch, deleteRecord } from "./airtable/airtable";

export const devmode = (() => import.meta.env.NODE_ENV !== "production")();

export function useTasks(maxRecords = 10, pageSize = 10) {
  const tasks = ref([]);
  const rewards = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const _pageSize = ref(pageSize);
  /** If there are more records, the response will contain an offset. To fetch the next page of records, include offset in the next request's parameters. -- airtable docs */
  const offset = ref(0);

  onMounted(async () => {
    await load(maxRecords);
  });

  const createTask = async (props) =>
    create("Tasks", props).catch((err) => {
      console.log(err);
      error.value = err;
    });

  const patchTask = async (props) =>
    patch("Tasks", props).catch((err) => {
      console.error(err);
      error.value = err;
    });

  const deleteTask = async (id) =>
    deleteRecord("Tasks", id).catch((err) => {
      console.error(err);
      error.value = err;
    });

  const createReward = async (props) =>
    create("Rewards", props).catch((err) => {
      console.log(err);
      error.value = err;
      // console.log("props", props);
    });

  const patchReward = async (props) =>
    patch("Rewards", props).catch((err) => {
      console.error(err);
      error.value = err;
    });

  const deleteReward = async (id) =>
    deleteRecord("Rewards", id).catch((err) => {
      console.error(err);
      error.value = err;
    });

  async function load(max = 10) {
    loading.value = true;

    const byStatus =
      "sort%5B0%5D%5Bfield%5D=Name?sort%5B0%5D%5Bdirection%5D=desc";

    tasks.value = await getRecords(
      "Tasks",
      max,
      _pageSize.value,
      byStatus
    ).catch((err) => {
      error.value = err;
    });
    rewards.value = await getRecords(
      "Rewards",
      10,
      _pageSize.value,
      byStatus
    ).catch((err) => {
      error.value = err;
    });

    loading.value = false;
  }

  return {
    tasks,
    rewards,
    loading,
    error,
    load,

    //tasks api

    createTask,
    patchTask,
    deleteTask,

    // rewards api

    createReward,
    deleteReward,
    patchReward,
  };
}

export default useTasks;
