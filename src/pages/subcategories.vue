<template>
  <div class="flex justify-between py-2">
    <h1 class="text-3xl py-3">{{ categName }}</h1>
    <button @click="createTest" class="bg-green-400 rounded-md px-3 py-2">
      Create Test
    </button>
  </div>
  
  <!-- Loading State -->
  <div v-if="loading" class="text-center py-5">Loading...</div>

  <!-- No Data State -->
  <div v-if="noData" class="text-center py-5">No data available</div>

  <!-- Display Items -->
  <div v-if="!loading && !noData" class="grid grid-cols-4 gap-4 shadow-xl py-5 px-3">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="border py-5 px-3 flex gap-4 rounded-xl cursor-pointer"
      @click="goToCategory(item.id)"
    >
      <p>{{ index + 1 }}</p>
      <p>{{ item.name }}</p>
    </div>
  </div>
  
  <v-btn @click="goBack" class="my-5">Back</v-btn>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const items = ref([]);
const categName = ref(null);
const loading = ref(true);
const noData = ref(false);

const createTest = () => {
  router.push("/quiz");
};

const getCategName = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/category/${id}`
    );
    console.log("Category API Response:", response.data); // Log the entire response
    categName.value = response.data.name; // Adjust based on actual response structure
  } catch (error) {
    noData.value = true;
    console.error("Error fetching category name:", error.response ? error.response.data : error.message);
  }
};

const fetchItems = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/sub-category/category/${id}`
    );
    items.value = response.data; // Ensure response.data is an array of items
    if (items.value.length === 0) {
      noData.value = true;
    }
  } catch (error) {
    noData.value = true;
    console.error("Error fetching items:", error);
  } finally {
    loading.value = false; // Hide loading state
  }
};

onMounted(() => {
  const id = route.params.id; // Get ID from route params
  if (id) {
    getCategName(id);
    fetchItems(id);
  } else {
    noData.value = true;
    loading.value = false;
    console.error("No ID provided in route params");
  }
});

const goToCategory = (id) => {
  router.push(`/quizes/${id}`);
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
/* Add specific styling here if needed */
</style>
