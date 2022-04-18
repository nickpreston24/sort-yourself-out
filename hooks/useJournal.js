import { ref, onMounted, computed, reactive } from "vue";
import { getRecords, create, patch, deleteRecord } from "../airtable/airtable";

// Factory
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

// Shared Singleton
export default reactive({
  entries: [],
  loading: true,
  error: null,

  table: "Journal",

  count: computed(() => {
    return this?.entries?.length || 0;
  }),

  async load(max = 100) {
    this.loading = true;

    this.entries = await getRecords(this.table, max).catch((err) => {
      this.error = err;
    });

    this.loading = false;
  },

  async createJournalEntry(props) {
    return create(this.table, props).catch((err) => {
      console.log(err);
      this.error = err;
    });
  },

  async patchEntry(props) {
    return patch(this.table, props).catch((err) => {
      console.error(err);
      this.error = err;
    });
  },

  async deleteEntry(id) {
    deleteRecord(this.table, id).catch((err) => {
      console.error(err);
      this.error = err;
    });
  },
});
