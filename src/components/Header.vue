<template>
  <div class="header">
    <img class="logo" src="@/assets/logo.svg" @click="goHome" />
    <SearchBar />
    <Tabs />
  </div>
</template>

<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import Tabs from "@/components/Tabs.vue";
import { useCharactersStore } from "@/stores/characters";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const heroStore = useCharactersStore();
const { searchString, selectedDropdownValue } = storeToRefs(heroStore);
const router = useRouter();

function goHome() {
  router.push({
    name: "basic",
    query: {
      page: 1,
    },
  });
  searchString.value = "";
  selectedDropdownValue.value = "name";
  heroStore.getData(1);
}
</script>

<style scoped lang="scss">
.header {
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  align-items: center;
  border-bottom: 1px solid var(--primary);

  @include media-s {
    padding: 10px 0;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 30px;
  }
}
.logo {
  max-width: 200px;
  padding-bottom: 10px;

  @include media-s {
    max-width: 300px;
    padding-bottom: 0px;
    padding-right: 40px;
  }
}
.logo:hover {
  cursor: pointer;
}
</style>
