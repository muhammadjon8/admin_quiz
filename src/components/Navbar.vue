<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useToggleSidebar } from "../composable/useToggleSidebar";

const theme = useTheme();
const { isOpenSidebar } = useToggleSidebar();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
  <div>
    <v-app-bar density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          @click="isOpenSidebar = !isOpenSidebar"
        ></v-app-bar-nav-icon>
      </template>

      <template v-slot:append>
        <div class="d-flex ga-2 align-center">
          <p>Light</p>
          <v-switch
            @click="toggleTheme"
            false-value="Light"
            true-value="Dark"
            hide-details
          ></v-switch>
          <p>Dark</p>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </div>
      </template>
    </v-app-bar>
  </div>
</template>
