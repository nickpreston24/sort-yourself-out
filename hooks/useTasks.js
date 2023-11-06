/**
 * Singleton pattern from here: https://stackoverflow.com/questions/70465618/is-there-a-way-to-share-reactive-data-between-random-components-in-vue-3-composi

* Shared store pattern here: https://www.smashingmagazine.com/2021/06/managing-shared-state-vue3/

* Fancy pattern for making Excel-like behavior: https://www.toptal.com/vue-js/on-demand-reactivity-vue-3
*/

import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
import {
  notify,
  notifyError,
  notifySuccess,
  notifyWarn,
} from "~~/components/atoms/useToaster";
import {
  getRecords,
  create,
  patch,
  deleteRecord,
  getById,
} from "../airtable/airtable";

const devmode = (() => import.meta.env.NODE_ENV !== "production")();
const preferencesStore = useLocalStorage("preferences", {
  showDates: false,
  showTodaysTasks: false,
  enableToasts: false,
});

// export const preferences = reactive({
//   // ...preferencesStore.value,
// });

export const preferences = reactive([
  computed(() => 5), // 5
  computed(() => preferences[0].value * preferences[0].value), // 25
  { squared: computed(() => preferences[1].value * preferences[1].value) }, // 625
]);

// export const stats = reactive({ totalTasks: () => tasks.value.length });

export const tasks = ref([]);
export const loading = ref(true);
export const error = ref(null);
const toastsEnabled = ref(devmode);
const debug = reactive(devmode);
export const rewards = ref([]);

/** Filters */

// TODO: 3. Save your searches as toggleable filters[]
// TODO: 4. Start on a filters computed() for tasks
const taskFilters = [() => true];
const storedSearches = ["Nugs Research"];

// const filters = new Map {
//   'Show Done' : () => t=> t.Status === 'Done'
// ...
// }

const rewardFilters = [() => true];

/** If there are more records, the response will contain an offset. To fetch the next page of records, include offset in the next request's parameters. -- airtable docs */
const offset = ref(0);

export function useTasks(take = 10, pageSize = 10) {
  onMounted(async () => {
    // console.log("preferencesStore.value", preferencesStore.value);
    // preferences = { ...preferencesStore.value };
  });

  const createTask = async (task, reward = null) => {
    // TODO: Enforce 1 and only 1 Task to a Reward
    // TODO: Make a Clone button for Tasks
    console.log("reward", reward);
    let now = new Date();
    // console.log("now", now);
    const startDate = Date.parse(task?.Start);
    let tomorrow = new Date(startDate || now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // let day = tomorrow.getDate();
    // let month = tomorrow.getMonth() + 1;
    // let year = tomorrow.getFullYear();

    // let fullDate = `${month}-${day}-${year}`;
    console.log("props", task);
    let myTask = {
      // ...task,
      //  Append the Date of a Task to the end of the name in ()
      Name: `${task.Name}`,
      //  Add the Start and End dates to a newly created task - default to today if null
      Start: task?.Start || now,
      End: tomorrow,
      Status: "Todo",
    };

    console.log("myTask", myTask.Name);

    return create("Tasks", myTask)
      .then((records) => {
        console.log("records after create", records);

        const record = records?.[0];
        console.log("record", record);
        tasks.value.push(record);
        notifySuccess("Task created successfully!");

        if (reward) {
          // Update any assigned rewards:
          // let newlyCashedIn = [].concat(...(reward["Cashed-In"] || [])); //.concat(record?.id);
          const currentlyCashedIn = reward?.["Cashed-In"] || [];
          console.log("currentlyCashedIn", currentlyCashedIn);
          let newlyCashedIn = [...currentlyCashedIn, ...[record.id]];
          // newlyCashedIn?.push(record.id);

          console.log("newlyCashedIn", newlyCashedIn);
          let updatedReward = {
            // ...reward,
            id: reward.id,
            Name: reward?.Name,
            Points: reward?.Points,
            "Cashed-In": newlyCashedIn,
          };

          console.log("updatedReward", updatedReward);

          patchReward(updatedReward).then((response) => {
            // reward = { ...reward, ...updatedReward };
            console.log("response", response);
            let found = rewards.value.find((rw) => rw.id === response[0].id);
            found = {
              ...updatedReward,
            };
            console.log("found", found);

            notifySuccess("Added task to Reward!");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        error.value = err;
      });
  };

  const bulkCreateTasks = async (parent = null, subTasks = []) => {
    console.log("subTasks", subTasks);
    return create("Tasks", subTasks)
      .then((records) => {
        console.log("records", records);
        tasks.value.push(records);

        notifySuccess(`Created ${records?.length} subtasks`);

        const ids = records.map((r) => r.id);
        console.log("subtask ids", ids);

        parent.Subtasks = ids;

        if (parent) {
          create("Tasks", parent)
            .then(() => {
              notifySuccess("Created parent task");
            })
            .catch((err) => {
              console.log(err);
              error.value = err;
              notifyError("Failed to create parent task");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        error.value = err;

        notifyError("Failed to create subtasks");
      });
  };

  // Clone this task and increment the Date, Blank out the AssociatedRewards
  const cloneMyTask = async (props) => {
    // console.log("props", props);
    let date = Date.parse(props?.Created) || new Date();
    let tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // console.log("tomorrow", tomorrow);
    let day = tomorrow.getDate();
    let month = tomorrow.getMonth() + 1;
    let year = tomorrow.getFullYear();

    let fullDate = `${month}-${day}-${year}`;

    // TODO: Clone all subtasks, or this won't work.
    let parentTask = {
      Start: tomorrow,
      End: tomorrow,
      Status: "Todo",
      Points: props?.Points,
      Name: `${props.Name} ${fullDate}`,
      Notes: props?.Notes || "",
      Frequency: props?.Frequency || "",

      // AssociatedRewards: [],
    };

    // console.log("parentTask (init)", parentTask);

    let subTaskIds = props?.Subtasks || [];

    let promises = subTaskIds.map((id) => getById("Rewards", id));
    let foundTasks = await (await Promise.all(promises)).flat(2);

    if (foundTasks?.length > 0) {
      let subPromises = foundTasks.map((t) => cloneTask(t));
      let final = await Promise.all(subPromises);
      // console.log("final", final);

      // parentTask.Subtasks =
      let ids = final.flat(1).map((ft) => ft.id);
      // console.log("ids", ids);

      parentTask.Subtasks = ids;
    }

    // parentTask.Subtasks = subTaskIds;
    console.log("parentTask", parentTask);

    return parentTask;
  };

  const cloneTask = async (props) => {
    // console.log("clone props", props);

    let sheep = await cloneMyTask(props);

    // console.log("clonedTask", sheep);

    return (
      create("Tasks", sheep)
        // .then((response) => {
        //   notifySuccess("Clone complete!", "Baah");
        //   console.log("response.data", response);
        // })
        .catch((err) => {
          console.log(err);
          error.value = err;
          notifyError("Cloning failed..." + err.message, "Baaad news...");
        })
    );
  };

  const patchTask = async (props) => {
    let taskPatch = {
      ...props,
    };

    delete taskPatch.Created;
    delete taskPatch["Last Modified"];
    console.log("taskPath", taskPatch);
    return patch("Tasks", taskPatch)
      .then((response) => {
        console.log("patch completed.");
        notifySuccess("Update successful!", "Yay!");
      })

      .catch((err) => {
        console.error(err);
        error.value = err;
        notifyError("Patch failed...");
      });
  };

  const deleteTask = async (task) => {
    let id = task.id;
    if (!id)
      notifyError(
        `No Id Could be found for task${task?.Name}`,
        "I have no ID!"
      );
    return deleteRecord("Tasks", id)
      .then(() => {
        console.log("deleting task w/ id", id);
        // const updated = tasks.value.filter((t) => t.id !== id);
        // const updated = tasks.value.splice(tasks.value.indexOf(task), 1);
        // console.log("updated", updated);
        // tasks.value = updated;

        let i = tasks.value.map((item) => item.id).indexOf(id);
        console.log("i", i);
        tasks.value.splice(i, 1);

        notifySuccess("Task successfully deleted!");
      })
      .catch((err) => {
        console.error(err);
        error.value = err;
        notifyError("Task Delete failed...");
      });
  };

  const createReward = async (props) => {
    let now = new Date();
    let myReward = {
      ...props,
      Name: `${props.Name} - ${now.getDate()}`,
    };

    console.log("myReward (clone)", myReward.Name);

    return create("Rewards", myReward)
      .then((response) => {
        // const record = response.data?.records?.[0];
        // console.log("record", record);
        console.log("response", response);
        // rewards.value.push(record);
        notifySuccess("Reward Submitted!");
      })
      .catch((err) => {
        console.log(err);
        error.value = err;
        notifyError("Creation of reward failed...");
      });
  };

  const cloneMyReward = (props) => {
    let date = Date.parse(props?.Created) || new Date();
    console.log("date", date);
    let tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log("tomorrow", tomorrow);
    let day = tomorrow.getDate();
    let month = tomorrow.getMonth() + 1;
    let year = tomorrow.getFullYear();

    let fullDate = `${month}-${day}-${year}.`;

    // TODO: Clone all subrewards, or this won't work.
    let parentReward = {
      // ...props,
      // // id: null,
      // // Created: null,
      Start: tomorrow,
      End: tomorrow,
      Notes: props?.Notes,
      Points: props?.Points || 1,
      Name: `${props.Name} ${fullDate}`,
      // AssociatedRewards: [],
      // Name: "I think I'm a clone now...",
    };

    let subRewards = props?.Subrewards?.map((t) => cloneMyReward(t));
    if (subRewards?.length > 0) parentReward.Subrewards = subRewards;

    console.log("parentReward", parentReward);
    console.log("subRewards", subRewards);

    return parentReward;
  };

  const cloneReward = async (props) => {
    console.log("clone props", props);

    let sheep = cloneMyReward(props);

    console.log("clonedReward", sheep);

    return create("Rewards", sheep)
      .then((records) => {
        notifySuccess("Clone complete!", "Baah");
        console.log("records", records);
        rewards.value.push(records);
      })
      .catch((err) => {
        console.log(err);
        error.value = err;
        notifyError("Cloning failed..." + err.message, "Baaad news...");
      });
  };

  const patchReward = async (props) =>
    patch("Rewards", props).catch((err) => {
      console.error(err);
      error.value = err;
      notifyError("Patching the reward failed...");
    });

  const deleteReward = async (reward) => {
    const id = reward?.id;
    return deleteRecord("Rewards", id)
      .then(() => {
        rewards.value = rewards.value.filter((r) => r.id !== id);
        notifySuccess("Reward Successfully Deleted!");
      })
      .catch((err) => {
        console.error(err);
        error.value = err;
        notifyError("Deleting this reward failed...");
      });
  };

  async function load(max = 10) {
    loading.value = true;

    // const byStatus =
    //   "sort%5B0%5D%5Bfield%5D=Status?sort%5B0%5D%5Bdirection%5D=desc";

    // const byName =
    //   "?sort%5B0%5D%5Bfield%5D=Name&sort%5B0%5D%5Bdirection%5D=desc";

    // TODO: https://community.airtable.com/t/sorting-by-field-my-airtable-api-on-react/29259/2

    // const sortObjects = [ {field: "year", direction: "desc"} ]
    // const sortString = sortObjects.map(so=>{
    // })

    tasks.value = await getRecords("Tasks", max, pageSize, "").catch((err) => {
      error.value = err;
      notifyError("Loading of Tasks failed...");
    });

    rewards.value = await getRecords("Rewards", max, pageSize, "").catch(
      (err) => {
        error.value = err;
        notifyError("Loading of Rewards failed...");
      }
    );

    loading.value = false;
  }

  /** SCHEDULER FUNCTIONS */

  async function assignTaskToReward(task, reward) {
    // When assigning a Task to a Reward, if the reward already has more points than available, throw an error and notify user

    if (
      reward.PercentEarned >= 100 ||
      task.Points + reward.TotalCashedInPoints > reward.Points
    ) {
      notifyWarn(
        "Whoa! This Reward can't hold that many points.  Try another."
      );
      return;
    }

    // If a task id already exists in other rewards, back out:

    const taskId = task?.id;

    // const foundTask = rewards.value.find((rw) =>
    //   rw?.["Cashed-In"].find((ci) => ci.id === taskId)
    // );

    const foundTask = rewards.value.map((rw) =>
      rw?.["Cashed-In"].includes(taskId)
    );

    if (foundTask) {
      console.log("foundTask", foundTask);
      notifyWarn("Found this task in another reward already, sorry.");
      return;
    }
    console.log("task", task);
    if (task && reward) {
      // Update any assigned rewards:
      const currentlyCashedIn = reward?.["Cashed-In"] || [];
      debug && console.log("currentlyCashedIn", currentlyCashedIn);
      let newlyCashedIn = [...currentlyCashedIn, ...[task.id]];

      console.log("newlyCashedIn", newlyCashedIn);
      let updatedReward = {
        // ...reward,
        id: reward.id,
        Name: reward?.Name,
        Points: reward?.Points,
        "Cashed-In": newlyCashedIn,
      };

      console.log("updatedReward", updatedReward);

      patchReward(updatedReward).then((response) => {
        // reward = { ...reward, ...updatedReward };
        console.log("response", response);
        let found = rewards.value.find((rw) => rw.id === response[0].id);
        found = {
          ...updatedReward,
        };
        console.log("found", found);

        notifySuccess("Added task to Reward!");
      });
    }
  }

  async function assignSubtaskToTask(subtask, task) {
    // TODO: Check for collisions with other assignments and if already exists.
    task.Subtasks?.push(subTask.id);
    console.log("task", task);
    await patchTask(task);
    // console.log("result of subtask assignment", result);
  }

  async function scheduleTask(task, date) {
    let updatedTask = { ...task, Start: date };
    // TODO: update the End date to be at least 1 day more than the Start Date, or the same day.
    console.log("updatedTask", updatedTask);
    await patchTask(updatedTask);
  }

  const createPerfectDay = async () => {
    const perfectDay = { ...perfectDayTemplate };
    console.log("perfectDay", perfectDay);

    const results = await cloneTask(perfectDay);
    console.log("results of perfect day cloning", results);
  };

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
    bulkCreateTasks,

    // rewards api

    createReward,
    cloneReward,
    deleteReward,
    patchReward,

    // Scheduling api

    createPerfectDay,
    assignSubtaskToTask,
    assignTaskToReward,
    scheduleTask,
  };
}

export default useTasks;

/* Public Computed values */

export const filteredTasks = computed(() => {
  // console.log("filtered tasks", tasks.value.length);
  return tasks?.value?.length > 0
    ? tasks.value
        .filter((t) => t.Status !== "Done")
        //// .sort((a, b) => a?.Start >= b?.Start)
        //// .sort((a, b) => a?.End >= b?.End)
        .sort((a, b) => a?.Name?.includes("Perfect Day"))
        .sort((a, b) => a?.Points <= b?.Points)
        .sort((a, b) => a?.Created <= b?.Created)
    : [];
  //// .sort((a, b) => a?.Subtasks?.length || 0 >= b?.Subtasks?.length || 0)
  //// .sort(
  ////   (a, b) => a?.Status < b?.Status || a?.Status?.length < b?.Status?.length // //Alphabetically, then lenght of word
  //// )
  //// .slice(0, take);
  ////.filter((t) => t.Status !== "Done");
});

export const filteredRewards = computed(() => {
  return rewards?.value?.sort(
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
  // if)
  let naiveAllPoints =
    tasks?.value?.length > 0
      ? tasks.value.reduce((total, next) => (total += next?.Points), 0)
      : 0;
  return naiveAllPoints;

  // let allPoints = tasks.value
  //   .filter((task) => task?.Status?.toString() === "Done")
  //   .reduce((total, task) => {
  //     console.log("task", task);
  //     let subTasks = task?.Subtasks || []; // TODO: Only ids come back, so you're going to have to sift through tasks.values to find matches, then you can tally points.
  //     if (subTasks?.length > 0) console.log("subTasks", subTasks);
  //     let subTotal = subTasks
  //       .filter((t) => t.Points)
  //       .reduce((total, next) => (total += next), 0);

  //     total += subTotal;
  //   }, 0);
  // console.log("allPoints", allPoints);
  // return allPoints || -1;
});

export const creditsUsed = computed(() => {
  let cashed =
    tasks?.value?.length > 0
      ? tasks.value
          .map((task) => {
            let rewardsIds = task.AssociatedRewards;
            // rewardsIds.map(rid=>tasks.value.filter(t=>t.id === r.))
            // console.log("rewards", rewards);
            return 0;
          })
          .reduce((total, next) => (total += next?.Points), 0)
      : 0;
  return -1;
});

// <!-- TODO:
// 1. Available Credits (Rewards points available)
// 2. Credits used (Total of all cashed in Credits/Points from all Tasks associated to Rewards)
//  -->

export const availableCredits = computed(() => {
  return allPoints.value || 0 - creditsUsed.value || 0;
});

export const percentageRewardsAcheived = computed(() => {
  return rewards.value.filter((rw) => rw.Concluded)?.length || 0;
});

export const todaysTasks = computed(() => {
  const today = new Date();
  const day = today.getDay();

  return tasks.value.filter((t) => new Date(t?.Start).getDay() === day);
  // const filterByExpiration = (arr) =>
  //   arr.filter(
  //     ({ Created, Start }) =>
  //       new Date(Created) >= today ||
  //       new Date(Start?.replace(/-/g, "/")) >= today
  //   );
  // console.log("tasks.value", tasks.value[0]);
  // console.log("filtered (today)", filterByExpiration(tasks.value));

  // return filterByExpiration(tasks.value);
});

export const taskStats = reactive([
  { totalTasks: computed(() => filteredTasks.length || 0) },
  { filteredTasks: computed(() => filteredTasks.value.length) },
  { todaysTasks: computed(() => todaysTasks.value?.length) },
]);

export const rewardStats = reactive([
  { percentageRewardsAcheived },
  { availableCredits },
  { allPoints },
  { creditsUsed },
  {
    alreadyCashed: computed(() => {
      return rewards.value.map(
        (rw) => rw?.["Cashed-In"] //.flatMap((r) => r?.["Cashed-In"]) //?.["Cashed-In"].includes(taskId)
      );
    }),
  },
]);

export const dailyEssentialsTemplate = {
  Name: "Daily Essentials",
  Subtasks: [
    { Name: "S.S.S", Points: 1, Time: "6:00" },
    { Name: "TPOT Letters ", Time: "6:30" },
    { Name: "Breakfast", Points: 1, Time: "7:00" },
    { Name: "Dishes", Points: 1, Time: "18:45" },
    { Name: "Lunch", Points: 1, Time: "12:00" },
    { Name: "Dinner", Points: 1, Time: "18:00" },
    {
      Name: "Clean your room",
      Notes: "... young man!",
      Points: 1,
      Time: "18:00",
    },
    { Name: "Journal", Time: "22:00", Points: 2 },
    { Name: "Create Next Perfect Day", Time: "22:30", Points: 1 },
  ],
};

export const perfectDayTemplate = [
  { dailyEssentials: { ...dailyEssentialsTemplate, Name: "The Perfect Day" } },

  { Name: "Krav Time", Points: 2, Time: "19:00" },
  // { Name: "Morning Run", Points: 3, Time: "" },
];
