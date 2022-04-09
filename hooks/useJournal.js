import { ref, onMounted, computed, toRefs } from "vue";
import {
  searchTable,
  getRecords,
  create,
  patch,
  deleteRecord,
} from "./airtable/airtable";

export function useJournal() {
  const entries = ref([]);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    loading.value = true;

    entries.value = await getRecords("Journal", 100).catch(console.error);

    loading.value = false;
  });

  const createJournal = async (props) => {
    return create("Journal", props);
  };

  const patchJournal = async (props) => patch("Journal", props);

  const deleteJournal = async (id) => deleteRecord("Journal", id);

  return {
    entries,
    loading,
    error,
    //api

    createJournal,
    patchJournal,
    deleteJournal,
  };
}

export default useJournal;
