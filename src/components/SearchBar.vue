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
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { validateQuery } from '@/utilitis/validateQuery';

type FilterType = typeof selectedDropdownValue.value;

const heroStore = useCharactersStore();
const { searchString, selectedDropdownValue } = storeToRefs(heroStore);
const isAdvancedSearch = ref(false);

const router = useRouter();
const route = useRoute();

function doSearch(): void {
  const { unusedParams } = validateQuery(route.query);
  const dropdownParam = {
    [selectedDropdownValue.value]: searchString.value.toLowerCase(),
  };
  const query = {
    page: 1,
    ...dropdownParam,
  };

  heroStore.getCharacters(1, dropdownParam);

  router.push({
    name: 'basic',
    query: {
      ...query,
      ...unusedParams,
    },
  });
}

watch(
  () => route.query,
  (newValue) => handleParams(newValue as { [k: string]: string })
);

function handleParams(queryObject: { [k: string]: string }): void {
  const { validParams } = validateQuery(queryObject);
  const paramsEntries = Object.entries(validParams);

  if (paramsEntries.length === 1) {
    selectedDropdownValue.value = paramsEntries[0][0] as FilterType;
    searchString.value = paramsEntries[0][1] as string;
  } else {
    selectedDropdownValue.value = 'name';
    searchString.value = '';
  }
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
