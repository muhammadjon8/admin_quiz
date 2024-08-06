<template>
  <div class="grid grid-cols-4 gap-4 shadow-xl py-5 px-3">
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
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const items = ref([]);

// Fetch data function
const fetchItems = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/sub-category/category/${id}`
    );
    items.value = response.data; // Ensure response.data is an array of items
    console.log(items.value); // Check the structure of response.data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchItems(route.params.id);

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
