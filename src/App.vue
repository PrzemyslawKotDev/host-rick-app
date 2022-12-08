<template>
  <div class="app-container">
    <Notifier />
    <Loader />
    <Header></Header>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Loader from "@/components/Loader.vue";
import Notifier from "./components/Notifier.vue";
</script>

<style>

.app-container {
  padding: 0;
  margin: -8px;
}
* {
  box-sizing: border-box;
  font-family: Poppins, sans-serif;
}
</style>
