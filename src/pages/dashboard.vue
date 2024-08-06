<template>
  <div style="height: 1000px">
    <h1>Categories Dashboard</h1>
    <Categories />
    <v-btn @click="goBack" class="my-5">Back</v-btn>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Categories from "../components/Categories.vue";

const router = useRouter();
const data = ref("");

const goBack = () => {
  router.go(-1);
};

// onMounted(async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/api/category");
//     data.value = response.data;
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// });
</script>

<style lang="scss" scoped></style>
