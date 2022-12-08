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
        <button class="lens">
          <img
            @click="isAdvancedSearch = true"
            class="mg-glass"
            src="@/assets/search.svg"
          />
        </button>
        <Overlay
          :isOpen="isAdvancedSearch"
          @closeDetails="isAdvancedSearch = false"
        >
          <AdvancedSearch @closeSearch="isAdvancedSearch = false" />
        </Overlay>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from "./Dropdown.vue";
import { useCharactersStore } from "@/stores/characters";
import { storeToRefs } from "pinia";
import Overlay from "./Overlay.vue";
import AdvancedSearch from "./AdvancedSearch.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { validateQuery } from "@/utilitis/validateQuery";

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
    name: "basic",
    query: query,
  });
}
</script>

<style scoped lang="scss">
.search-container {
  border: 1px solid var(--primary);
  border-radius: 10px;
  color: var(--primary);
  width: 100%;

  @include media-s {
    display: flex;
    font-size: 20px;
  }
}
.options {
  border-bottom: 1px solid var(--primary);
  display: flex;

  @include media-s {
    border: 0;
    display: flex;
  }
}
.search-by {
  padding: 16px;
  white-space: nowrap;
  border-right: 1px solid var(--primary);
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
  color: var(--primary);
}
.lens {
  position: absolute;
  right: 0;
  top: 30%;
  border: 0;
  background-color: transparent;
}
.lens:hover {
  cursor: pointer;
}
.mg-glass {
  width: 20px;
  margin-right: 10px;
}
</style>
