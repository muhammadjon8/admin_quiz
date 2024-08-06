<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Reactive variables
const name = ref("");
const valid = ref(false);
const category = ref([]);
const selectedCategory = ref(null);

const fetchItems = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/category`);
    category.value = response.data; // Ensure response.data is an array of categories
    console.log(category.value); // Check the structure of response.data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchItems();
});

const createSubcategory = async () => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/sub-category/`,
      { name: name.value, categoryId: selectedCategory.value }
    );
    console.log("Subcategory created:", response.data);
    goBack();
  } catch (error) {
    console.error("Error creating subcategory:", error);
  }
};

const goBack = () => {
  router.go(-1);
};

watch([selectedCategory, name], () => {
  valid.value = selectedCategory.value && name.value;
});
</script>

<template>
  <div class="flex justify-center gap-5">
    <div>
      <label for="category">Select a category: </label>
      <select
        v-model="selectedCategory"
        name="quiz"
        id="quiz"
        class="w-full border py-3 px-2"
      >
        <option value="" disabled>Select a category</option>
        <option v-for="item in category" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="category">Name of your Test: </label>
      <input
        type="text"
        v-model="name"
        placeholder="Name of the Test"
        class="w-full border py-3 px-2"
      />
    </div>
  </div>
  <div class="flex flex-col gap-3">
    <button
      @click="createSubcategory"
      :disabled="!valid"
      class="my-5 bg-blue-100 py-3"
    >
      Submit
    </button>
  </div>

  <v-btn @click="goBack" class="my-5">Back</v-btn>
</template>
