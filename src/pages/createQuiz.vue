<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Reactive variables
const question = ref("");
const option1 = ref("");
const option2 = ref("");
const option3 = ref("");
const correct_answer = ref("");
const id = Number(route.params.id)
const valid = ref(false);
const errorMessage = ref(""); // To display any error messages

const goBack = () => {
  router.go(-1);
};

const submitForm = async () => {
  if (!valid.value) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }

  try {
    const updatedQuiz = {
      question: question.value,
      option1: option1.value,
      option2: option2.value,
      option3: option3.value,
      correct_answer: correct_answer.value,
      subcategoryId: id,
    };
    await axios.post(
      `http://localhost:3000/api/quiz`,
      updatedQuiz
    );
    console.log("Quiz created successfully");
    goBack();
  } catch (error) {
    errorMessage.value = "Error creating quiz. Please try again.";
    console.error("Error creating quiz:", error);
  }
};

watch([question, option1, option2, option3, correct_answer], () => {
  valid.value =
    question.value &&
    option1.value &&
    option2.value &&
    option3.value &&
    correct_answer.value;
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <input
      type="text"
      class="w-full px-2 py-3 border"
      v-model="question"
      placeholder="Question input"
    />
    <div>
      <input
        v-model="option1"
        type="text"
        class="w-2/3 px-2 py-3 border"
        placeholder="Option 1"
      />
      <input
        v-model="option2"
        type="text"
        class="w-2/3 px-2 py-3 border"
        placeholder="Option 2"
      />
      <input
        v-model="option3"
        type="text"
        class="w-2/3 px-2 py-3 border"
        placeholder="Option 3"
      />
      <input
        v-model="correct_answer"
        type="text"
        class="w-2/3 px-2 py-3 border bg-green-200"
        placeholder="Correct answer"
      />
    </div>
    <button
      @click="submitForm"
      :disabled="!valid"
      class="my-5 bg-blue-100 py-3"
    >
      Submit
    </button>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </div>

  <v-btn @click="goBack" class="my-5">Back</v-btn>
</template>
