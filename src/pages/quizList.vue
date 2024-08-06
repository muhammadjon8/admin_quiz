<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const items = ref([]);
const subCategName = ref("");
const noData = ref(false);
const subCategId = ref("");

// Fetch data function
const fetchItems = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/quiz/subcategory/${id}`
    );
    items.value = response.data; // Ensure response.data is an array of items
    console.log(items.value); // Check the structure of response.data
  } catch (error) {
    noData.value = true;
    console.error("Error fetching data:", error);
  }
};

// Fetch subcategory name
const getSubcateg = async (id) => {
  try {
    const subName = await axios.get(
      `http://localhost:3000/api/sub-category/${id}`
    );
    subCategId.value = id;
    subCategName.value = subName.data.name;
  } catch (error) {
    console.error("Error fetching subcategory name:", error);
  }
};

// Handle fetching data after component mounts
onMounted(() => {
  const id = route.params.id; // Get ID from route params
  if (id) {
    getSubcateg(id);
    fetchItems(id);
  } else {
    noData.value = true;
    console.error("No ID provided in route params");
  }
});

const createQuiz = async () => {
  console.log("Create quiz button clicked");
  if (subCategId.value) {
    router.push(`/create-quiz/${subCategId.value}`);
  } else {
    console.error("Subcategory ID is not available");
  }
};

const goBack = () => {
  router.go(-1);
};

// Edit quiz function
const editQuiz = async (item) => {
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
  <div class="flex justify-between py-2">
    <h1 class="text-3xl py-3">{{ subCategName }}</h1>
    <button @click="createQuiz" class="bg-green-400 rounded-md px-3 py-2">
      Create quiz
    </button>
  </div>

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
