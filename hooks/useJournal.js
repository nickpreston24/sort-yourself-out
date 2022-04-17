import { ref, onMounted, computed, toRefs } from "vue";
import {
  searchTable,
  getRecords,
  create,
  patch,
  deleteRecord,
} from "../airtable/airtable";

export function useJournal() {
  const entries = ref([]);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    loading.value = true;

    entries.value = await getRecords("Journal", 100).catch((err) => {
      error.value = err;
    });

    loading.value = false;
  });

  const createJournalEntry = async (props) => {
    return create("Journal", props).catch((err) => {
      console.log(err);
      error.value = err;
    });
  };

  const patchEntry = async (props) =>
    patch("Journal", props).catch((err) => {
      console.error(err);
      error.value = err;
    });

  const deleteEntry = async (id) =>
    deleteRecord("Journal", id).catch((err) => {
      console.error(err);
      error.value = err;
    });

  return {
    entries,
    loading,
    error,
    //api

    createJournalEntry,
    patchEntry,
    deleteEntry,
  };
}

export default useJournal;
