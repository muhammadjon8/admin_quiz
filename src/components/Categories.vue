<template>
  <div class="grid grid-cols-4 gap-4 shadow-xl py-5 px-3">
    <div
      v-for="item in items"
      class="border py-5 px-3 flex gap-4 rounded-xl cursor-pointer"
      @click="goToCategory(item.id)"
    >
      <p>{{ item.id }}</p>
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import { useRouter } from "vue-router";

const router = useRouter();
const items = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/category");
    items.value = response.data;
    console.log(items.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const goToCategory = (id) => {
  router.push(`/category/${id}`);
};
</script>
