<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const items = ref([]);
const subCategName = ref("");

// Fetch data function
const fetchItems = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/quiz/subcategory/${id}`
    );
    const subName = await axios.get(
      `http://localhost:3000/api/sub-category/${id}`
    );
    subCategName.value = subName.data.name;
    items.value = response.data; // Ensure response.data is an array of items
    console.log(items.value); // Check the structure of response.data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchItems(route.params.id);

const goToCategory = (id) => {
  router.push(`/quiz/${id}`);
};

const goBack = () => {
  router.go(-1);
};

// Edit quiz function
const editQuiz = async (item) => {
  // Implement your edit logic here
  // For example, navigate to an edit page
  router.push(`/edit-quiz/${item.id}`);
};

// Delete quiz function
const deleteQuiz = async (item) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this quiz?"
  );
  if (isConfirmed) {
    try {
      await axios.delete(`http://localhost:3000/api/quiz/${item.id}`);
      // Remove the item from the list after deletion
      items.value = items.value.filter((quiz) => quiz.id !== item.id);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  }
};
</script>

<template>
  <h1 class="text-3xl py-3">{{ subCategName }}</h1>
  <div v-for="item in items" :key="item.id" class="border shadow-lg p-3 mb-5">
    <div class="flex justify-between border p-2 items-center">
      <div>
        <p>{{ item.question }}</p>
      </div>
      <div>
        <v-btn size="small" @click="editQuiz(item)" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn size="small" @click="deleteQuiz(item)" icon>
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
    <div>
      <ul>
        <li>* {{ item.option1 }}</li>
        <li>* {{ item.option2 }}</li>
        <li>* {{ item.option3 }}</li>
        <li>* {{ item.correct_answer }} <= Correct answer</li>
      </ul>
    </div>
  </div>
  <v-btn @click="goBack" class="my-5">Back</v-btn>
</template>

<style scoped></style>
