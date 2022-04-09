import axios from "axios";

const apiKey = import.meta.env.VITE_VERCEL_AIRTABLE_API_KEY;
const baseKey = import.meta.env.VITE_VERCEL_BASE_KEY;

export const formatRecords = (records = []) => {
  let collection = [].concat(records);

  const format = (record) => {
    if (!record) return {};
    let { id, fields } = record;
    return {
      id,
      ...fields,
    };
  };

  let result =
    collection.length > 0 ? collection.map(format) : format(collection);

  return result;
};

export const getRecords = async (tableName, maxRecords = 10) => {
  const result = await axios({
    url: `https://api.airtable.com/v0/${baseKey}/${tableName}?maxRecords=${maxRecords}`,
    headers: {
      "Content-Type": "x-www-form-urlencoded",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return formatRecords(result?.data?.records);
};

export const searchTable = async (tableName = null, fields = []) => {
  if (!tableName) throw Error(`tableName cannot be null or empty`);
  let url = `https://api.airtable.com/v0/${baseKey}/${tableName}?`;
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (i > 0) {
      url.concat(`&`);
    }
    url.concat(`fields%5B%5D=${field}`);
  }

  console.log("airtable search url :>> ", url);
  const result = await axios({
    url,
    headers: {
      "Content-Type": "x-www-form-urlencoded",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  let raw = formatRecords(result?.data?.records);
  return raw;
};

export const getById = async (id, tableName = null) => {
  if (!id) throw Error(`id cannot be null or zero`);
  if (!tableName) throw Error(`tableName cannot be null or empty`);

  let record = await get(tableName, id);

  return formatRecords(record);
};

export const patch = async (tableName = null, record = null) => {
  if (!tableName) throw Error(`tableName cannot be null or empty`);
  if (!record) throw Error(`record cannot be empty`);

  console.log("record", { ...record });
  const data = {
    fields: { ...record },

    // records: [
    // {
    // id: record?.id,
    // fields: record?.fields || { ...record },
    // },
    // ],
  };

  // fetch(
  //   "https://api.airtable.com/v0/appraFclZV7AFFEhr/Tasks/recSvSfqf0U3v2wdF",
  //   {
  //     method: "PATCH",
  //     headers: {
  //       Authorization: "Bearer keyl5Wo5ETa4HR4tt",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       fields: {
  //         Name: "Make your Damn Bed",
  //         Status: "Todo",
  //         Due: "2022-03-29T13:00:00.000Z",
  //         Frequency: ["Daily"],
  //       },
  //     }),
  //   }
  // );

  const url = `https://api.airtable.com/v0/${baseKey}/${tableName}/${record.id}`;
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
  };

  console.log("url", url);
  console.log("data", data);
  const result = await axios.patch(url, data, axiosConfig);

  return formatRecords(result?.data?.records);
};

export const create = async (tableName = null, record) => {
  if (!record) return -1;
  if (!tableName) throw Error(`tableName cannot be null or empty`);

  console.log("record", record);
  const data = {
    records: [
      {
        fields: record?.fields || { ...record },
      },
    ],
  };

  let url = `https://api.airtable.com/v0/${baseKey}/${tableName}`;
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(url, data, axiosConfig);

  console.log("response?.data", response?.data);
  // TODO: return id
  return response?.data?.id;
};

export const deleteRecord = async (tableName = null, id = null) => {
  if (!id) throw new Error(`id for record cannot be null!`);
  let url = `https://api.airtable.com/v0/${baseKey}/${tableName}/${id}`;
  console.log("url", url);
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.delete(url, axiosConfig);

  return response;
};
