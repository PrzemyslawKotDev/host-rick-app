<template>
  <div>
    <div class="search-container">
      <div class="options">
        <div class="search-by">Search by</div>
        <Dropdown />
      </div>
      <div class="search-bar">
        <input
          class="search"
          placeholder="..."
          @keyup.enter="doSearch"
          v-model="searchString"
        />
        <button @click="isAdvancedSearch = true" class="lens">
          <img
            width="20"
            height="20"
            class="mg-glass"
            src="@/assets/search.svg"
            alt="Search"
          />
        </button>
        <Overlay
          :is-open="isAdvancedSearch"
          @close-details="isAdvancedSearch = false"
        >
          <AdvancedSearch @close-search="isAdvancedSearch = false" />
        </Overlay>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from './Dropdown.vue';
import { useCharactersStore } from '@/stores/characters';
import { storeToRefs } from 'pinia';
import Overlay from './Overlay.vue';
import AdvancedSearch from './AdvancedSearch.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { validateQuery } from '@/utilitis/validateQuery';
import { notUsedParams } from '@/utilitis/notUsedParams';

const heroStore = useCharactersStore();
const { searchString, selectedDropdownValue } = storeToRefs(heroStore);
const isAdvancedSearch = ref(false);
const router = useRouter();
const route = useRoute();

onMounted(() => {
  setTimeout(() => {
    const query = validateQuery(route.query);
    const queryEntries = Object.entries(query);

    if (queryEntries.length === 1) {
      searchString.value = queryEntries[0][1] as string;
    }
  }, 1);
});

function doSearch() {
  const { page, ...restOfParams } = route.query;
  const inactiveParams = notUsedParams(restOfParams);

  const query = {
    page: 1,
  };

  Object.assign(query, {
    [selectedDropdownValue.value]: searchString.value.toLowerCase(),
  });

  heroStore.search(
    selectedDropdownValue.value,
    searchString.value.toLowerCase()
  );

  router.push({
    name: 'basic',
    query: { ...query, ...inactiveParams },
  });
}
</script>

<style scoped lang="scss">
.search-container {
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  color: var(--color-primary);
  width: 100%;

  @include media-s {
    display: flex;
    font-size: 20px;
  }
}
.options {
  border-bottom: 1px solid var(--color-primary);
  display: flex;

  @include media-s {
    border: 0;
    display: flex;
  }
}
.search-by {
  padding: 16px;
  white-space: nowrap;
  border-right: 1px solid var(--color-primary);
  cursor: default;
}
.search-bar {
  position: relative;
}
.search {
  border: 0;
  background-color: transparent;
  height: 100%;
  width: 100%;
  padding: 16px 50px 16px 16px;
  color: var(--color-primary);
}
.lens {
  position: absolute;
  right: 0;
  top: 30%;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}
.mg-glass {
  width: 20px;
  margin-right: 10px;
}
</style>
