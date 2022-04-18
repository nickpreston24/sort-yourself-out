/**
 * Singleton pattern from here: https://stackoverflow.com/questions/70465618/is-there-a-way-to-share-reactive-data-between-random-components-in-vue-3-composi

* Shared store pattern here: https://www.smashingmagazine.com/2021/06/managing-shared-state-vue3/

* Fancy pattern for making Excel-like behavior: https://www.toptal.com/vue-js/on-demand-reactivity-vue-3
*/

import { ref, onMounted } from "vue";
import { notify, toastType } from "~~/components/atoms/useToaster";
import { getRecords, create, patch, deleteRecord } from "../airtable/airtable";

const devmode = (() => import.meta.env.NODE_ENV !== "production")();
export const editIndex = ref(-1); // time to do some sketchy shit. do daah, doo daaah. hope I get away with it, do-de-do-ah-eyy

const tasks = ref([]);
const taskFilters = [() => true];

const rewards = ref([]);
const rewardFilters = [() => true];

const loading = ref(true);
const error = ref(null);
const toastsEnabled = ref(devmode);
const debug = ref(devmode);

/** If there are more records, the response will contain an offset. To fetch the next page of records, include offset in the next request's parameters. -- airtable docs */
const offset = ref(0);

export function useTasks(take = 10, pageSize = 10) {
  const filteredTasks = computed(() => {
    return tasks.value
      .sort(
        (a, b) => a?.Status < b?.Status || a?.Status?.Length < b?.Status?.Length
      )
      .slice(0, take);
    //.filter((t) => t.Status !== "Done");
  });

  const filteredRewards = computed(() => {
    return rewards.value
      .sort(
        (a, b) => a?.Status < b?.Status || a?.Status?.Length < b?.Status?.Length
      )
      .slice(0, take);
  });

  // onMounted(async () => {
  //   await load(maxRecords);
  // });

  const createTask = async (props) =>
    create("Tasks", props).catch((err) => {
      console.log(err);
      error.value = err;
    });

  const patchTask = async (props) =>
    patch("Tasks", props).catch((err) => {
      console.error(err);
      error.value = err;
      toastsEnabled.value && notify(err, "ERROR", 7000);
    });

  const deleteTask = async (id) =>
    deleteRecord("Tasks", id).catch((err) => {
      console.error(err);
      error.value = err;
      toastsEnabled.value && notify(err, "ERROR", 7000);
    });

  const createReward = async (props) =>
    create("Rewards", props).catch((err) => {
      console.log(err);
      error.value = err;
      toastsEnabled.value && notify(err, "ERROR", 7000);
    });

  const patchReward = async (props) =>
    patch("Rewards", props).catch((err) => {
      console.error(err);
      error.value = err;
      toastsEnabled.value && notify(err, "ERROR", 7000);
    });

  const deleteReward = async (id) =>
    deleteRecord("Rewards", id).catch((err) => {
      console.error(err);
      error.value = err;
      toastsEnabled.value && notify(err, "ERROR", 7000, toastType.ERROR);
    });

  async function load(max = 10) {
    loading.value = true;

    const byStatus =
      "sort%5B0%5D%5Bfield%5D=Name?sort%5B0%5D%5Bdirection%5D=desc";

    tasks.value = await getRecords("Tasks", max, pageSize, byStatus).catch(
      (err) => {
        error.value = err;
        toastsEnabled.value && notify(err, "ERROR", 7000);
      }
    );
    rewards.value = await getRecords("Rewards", 10, pageSize, byStatus).catch(
      (err) => {
        error.value = err;
        toastsEnabled.value && notify(err, "ERROR", 7000);
      }
    );

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
    filteredTasks,

    // rewards api

    createReward,
    deleteReward,
    patchReward,
    filteredRewards,
  };
}

export default useTasks;
