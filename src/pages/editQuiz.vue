<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Reactive variables
const question = ref('');
const option1 = ref('');
const option2 = ref('');
const option3 = ref('');
const correct_answer = ref('');
const valid = ref(false);

const fetchItems = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/quiz/${id}`);
    const quiz = response.data; // Ensure response.data is the quiz object
    // Set the reactive variables with the fetched data
    question.value = quiz.question;
    option1.value = quiz.option1;
    option2.value = quiz.option2;
    option3.value = quiz.option3;
    correct_answer.value = quiz.correct_answer;
    console.log(quiz); // Check the structure of response.data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchItems(route.params.id);
});

const goBack = () => {
  router.go(-1);
};

const submitForm = async () => {
  try {
    const updatedQuiz = {
      question: question.value,
      option1: option1.value,
      option2: option2.value,
      option3: option3.value,
      correct_answer: correct_answer.value,
    };
    await axios.patch(`http://localhost:3000/api/quiz/${route.params.id}`, updatedQuiz);
    console.log('Quiz updated successfully');
    goBack();
  } catch (error) {
    console.error("Error updating quiz:", error);
  }
};

watch([question, option1, option2, option3, correct_answer], () => {
  valid.value = question.value && option1.value && option2.value && option3.value && correct_answer.value;
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <input type="text" class="w-full px-2 py-3 border" v-model="question" />
    <div>
      <input v-model="option1" type="text" class="w-2/3 px-2 py-3 border" />
      <input v-model="option2" type="text" class="w-2/3 px-2 py-3 border" />
      <input v-model="option3" type="text" class="w-2/3 px-2 py-3 border" />
      <input v-model="correct_answer" type="text" class="w-2/3 px-2 py-3 border bg-green-200" />
    </div>
    <button @click="submitForm" :disabled="!valid" class="my-5 bg-blue-100 py-3">Submit</button>
  </div>

  <v-btn @click="goBack" class="my-5">Back</v-btn>
</template>

