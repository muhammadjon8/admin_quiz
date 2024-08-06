<template>
  <div>
    <v-navigation-drawer :expand-on-hover="true" v-model="drawer" :rail="isOpenSidebar">
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item to="/" color="gray" :exact="true" prepend-icon="mdi-home-city" title="Home"
          value="home"></v-list-item>
        <v-list-item to="/drivers" color="gray" prepend-icon="mdi-card-account-details" title="Drivers"
          value="account"></v-list-item>
        <v-list-item to="/users" prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        <v-list-item to="/quiz" prepend-icon="mdi-order-bool-ascending" title="Create Quiz" value="orders"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToggleSidebar } from '../composable/useToggleSidebar';
const drawer = ref(true)
const rail = ref(true)

const { isOpenSidebar } = useToggleSidebar()
</script>

<style lang="scss" scoped></style>