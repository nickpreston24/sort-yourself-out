/**
 * Singleton pattern from here: https://stackoverflow.com/questions/70465618/is-there-a-way-to-share-reactive-data-between-random-components-in-vue-3-composi

* Shared store pattern here: https://www.smashingmagazine.com/2021/06/managing-shared-state-vue3/

* Fancy pattern for making Excel-like behavior: https://www.toptal.com/vue-js/on-demand-reactivity-vue-3
*/

import { ref } from "vue";
import { notifyError, notifySuccess } from "~~/components/atoms/useToaster";
import { getRecords, create, patch, deleteRecord } from "../airtable/airtable";

const devmode = (() => import.meta.env.NODE_ENV !== "production")();
export const editIndex = ref(-1); // time to do some sketchy shit. do daah, doo daaah. hope I get away with it, do-de-do-ah-eyy

export const tasks = ref([]);
const taskFilters = [() => true];

// const filters = new Map {
//   'Show Done' : () => t=> t.Status === 'Done'
// ...
// }

export const rewards = ref([]);
const rewardFilters = [() => true];

export const loading = ref(true);
export const error = ref(null);
const toastsEnabled = ref(devmode);
const debug = ref(devmode);

/** If there are more records, the response will contain an offset. To fetch the next page of records, include offset in the next request's parameters. -- airtable docs */
const offset = ref(0);

export function useTasks(take = 10, pageSize = 10) {
  // onMounted(async () => {
  //   await load(maxRecords);
  // });

  const createTask = async (props) => {
    // TODO: Add the Start and End dates to a newly created task - default to today if null
    // TODO: Append the Date of a Task to the end of the name in ()
    // TODO: Enforce 1 and only 1 Task to a Reward
    // TODO: Make a Clone button for Tasks

    let now = new Date();
    console.log("now", now);
    let myTask = {
      ...props,
      Name: props.Name + now.getDate(),
    };

    console.log("myTask", myTask.Name);

    return create("Tasks", myTask).catch((err) => {
      console.log(err);
      error.value = err;
    });
  };

  // Clone this task and increment the Date, Blank out the AssociatedRewards
  const clone = (props) => {
    let date = Date.parse(props?.Created) || new Date();
    console.log("date", date);
    let tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log("tomorrow", tomorrow);
    let day = tomorrow.getDate();
    let month = tomorrow.getMonth() + 1;
    let year = tomorrow.getFullYear();

    let fullDate = `${month}-${day}-${year}.`;

    // TODO: Clone all subtasks, or this won't work.
    let parentTask = {
      ...props,
      // id: null,
      // Created: null,
      // Start: tomorrow,
      // "Last Modified": null,
      Status: "Todo",
      Name: `${props.Name} ${fullDate}`,
      // AssociatedRewards: [],
    };

    let subTasks = props?.Subtasks?.map((t) => clone(t));
    if (subTasks?.length > 0) parentTask.Subtasks = subTasks;

    console.log("parentTask", parentTask);
    console.log("subTasks", subTasks);

    return parentTask;
  };

  const cloneTask = async (props) => {
    console.log("clone props", props);

    let sheep = clone(props);

    console.log("clonedTask", sheep);

    return create("Tasks", sheep)
      .then((response) => {
        notifySuccess("Clone complete!", "Baah");
        console.log("response.data", response.data?.records?.[0]);
      })
      .catch((err) => {
        console.log(err);
        error.value = err;
        notifyError("Cloning failed..." + err.message, "Baaad news...");
      });
  };

  const patchTask = async (props) =>
    patch("Tasks", props).catch((err) => {
      console.error(err);
      error.value = err;
      notifyError("Patch failed...");
    });

  const deleteTask = async (task) => {
    let id = task.id;
    if (!id)
      notifyError(
        `No Id Could be found for task${task?.Name}`,
        "I have no ID!"
      );
    return deleteRecord("Tasks", id)
      .then(() => {
        tasks.value = tasks.value.filter((t) => t.id !== id);
      })
      .catch((err) => {
        console.error(err);
        error.value = err;
        notifyError("Task Delete failed...");
      });
  };

  const createReward = async (props) =>
    create("Rewards", props).catch((err) => {
      console.log(err);
      error.value = err;
      notifyError("Creation of task failed...");
    });

  const patchReward = async (props) =>
    patch("Rewards", props).catch((err) => {
      console.error(err);
      error.value = err;
      notifyError("Patching the task failed...");
    });

  const deleteReward = async (id) =>
    deleteRecord("Rewards", id).catch((err) => {
      console.error(err);
      error.value = err;
      notifyError("Deleting this reward failed...");
    });

  async function load(max = 10) {
    loading.value = true;

    const byStatus =
      "sort%5B0%5D%5Bfield%5D=Name?sort%5B0%5D%5Bdirection%5D=desc";

    tasks.value = await getRecords("Tasks", max, pageSize, byStatus).catch(
      (err) => {
        error.value = err;
        notifyError("Loading of Tasks failed...");
      }
    );
    rewards.value = await getRecords("Rewards", 10, pageSize, byStatus).catch(
      (err) => {
        error.value = err;
        notifyError("Loading of Rewards failed...");
      }
    );

    loading.value = false;
  }

  // onMounted(async () => {
  //   await load(maxRecords);
  // });

  // /** SCHEDULER FUNCTIONS */

  async function assignTaskToReward(task, reward) {
    // TODO:  When assigning a Task to a Reward, if the reward already has more points than available, throw an error and notify user
  }

  async function scheduleTask(task, date) {}

  return {
    tasks,
    rewards,
    loading,
    error,
    load,

    //tasks api

    createTask,
    cloneTask,
    patchTask,
    deleteTask,

    // rewards api

    createReward,
    deleteReward,
    patchReward,
  };
}

export default useTasks;

/* Public Computed values */

export const filteredTasks = computed(() => {
  return tasks.value.sort(
    (a, b) => a?.Status < b?.Status || a?.Status?.length < b?.Status?.length
  );
  // .slice(0, take);
  //.filter((t) => t.Status !== "Done");
});

export const filteredRewards = computed(() => {
  return rewards.value.sort(
    (a, b) => a?.Status < b?.Status || a?.Status?.length < b?.Status?.length
  );
  // .slice(0, take);
});

export const lateTasks = computed(() => {
  let now = new Date();
  tasks.value.filter((t) => t?.Start > now);
});

// Gets the nested Points from all subtasks, recursively and adds them.
export const allPoints = computed(() => {
  let allPoints = filteredTasks.value
    .filter((task) => task?.Status.toString() === "Done")
    .reduce((total, task) => {
      console.log("task", task);
      let subTasks = task?.Subtasks || [];
      console.log("subTasks", subTasks);
      let subTotal = subTasks
        .filter((t) => t.Points)
        .reduce((total, next) => (total += next), 0);

      total += subTotal;
    }, 0);
  console.log("allPoints", allPoints);
  return allPoints;
});

export const creditsUsed = computed(() => {
  return -1;
});

// <!-- TODO:
// 1. Available Credits (Rewards points available)
// 2. Credits used (Total of all cashed in Credits/Points from all Tasks associated to Rewards)
//  -->

export const availableCredits = computed(() => {
  return allPoints.value || 0 - creditsUsed.value || 0;
});
