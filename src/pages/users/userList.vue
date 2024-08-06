<template>
  <div>
    <h1>User list</h1>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="users"
      :items-per-page="pagination.limit"
      :page="pagination.page"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.index="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn size="small" @click="editUser(item)" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn size="small" @click="deleteUser(item)" icon>
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../../api/index";

const users = ref([]);
const loading = ref(false);

const data = [
  {
    id: 1,
    title: "Food",
    items: ["hotdog", "plov", "pizza"],
  },
  {
    id: 2,
    title: "Car",
    items: ["BMW", "Mercedes", "Honda"],
  },
];

const pagination = ref({
  page: 1,
  limit: 10,
});

const headers = [
  {
    title: "#",
    align: "start",
    sortable: false,
    key: "index",
  },
  {
    title: "Firstname",
    align: "start",
    sortable: false,
    key: "firstName",
  },
  {
    title: "LastName",
    align: "start",
    sortable: false,
    key: "lastName",
  },
  {
    title: "Actions",
    align: "end",
    key: "actions",
    sortable: false,
  },
];

const deleteUser = (item) => {
  console.log("das", item);
};

const getUsers = async () => {
  loading.value = true;
  api
    .get(`/users?page=${pagination.value.page}&limit=${pagination.value.limit}`)
    .then((res) => {
      console.log(res);
      users.value = res.data.users;
      totalUsers.value = res.data.total;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

getUsers();

const items = [
  {
    name: "African Elephant",
    species: "Loxodonta africana",
    diet: "Herbivore",
    habitat: "Savanna, Forests",
  },
];
</script>

<style lang="scss" scoped></style>
