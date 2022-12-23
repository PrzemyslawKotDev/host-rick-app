<template>
  <div class="header">
    <a @click="goHome">
      <img
        height="80"
        width="300"
        class="logo"
        src="@/assets/logo.svg"
        alt="Rick and Morty logo"
      />
    </a>
    <SearchBar />
    <Tabs />
  </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import Tabs from '@/components/Tabs.vue';
import { useCharactersStore } from '@/stores/characters';
import { validateQuery } from '@/utilitis/validateQuery';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const heroStore = useCharactersStore();
const { searchString, selectedDropdownValue } = storeToRefs(heroStore);
const router = useRouter();
const route = useRoute();

function goHome(): void {
  const { unusedParams } = validateQuery(route.query);

  router.push({
    name: 'basic',
    query: {
      ...unusedParams,
      page: 1,
    },
  });

  searchString.value = '';
  selectedDropdownValue.value = 'name';
  heroStore.getCharacters(1);
}
</script>

<style scoped lang="scss">
.header {
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  align-items: center;
  border-bottom: 1px solid var(--color-primary);

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
  height: 70px;
  padding-bottom: 10px;
  cursor: pointer;

  @include media-s {
    max-width: 300px;
    padding-bottom: 0px;
    padding-right: 40px;
  }
}
</style>
