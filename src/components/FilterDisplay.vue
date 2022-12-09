<template>
  <div v-if="isFilters" class="filter-container">
    <div
      v-for="(value, key) in validatedParams"
      :key="value"
      class="filter-box"
    >
      <div>{{ getFilterName(key) }}: {{ value }}</div>
      <button @click="deleteFilter(key)" class="close">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters';
import { notUsedParams } from '@/utilitis/notUsedParams';
import { validateQuery } from '@/utilitis/validateQuery';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type FilterValueType = typeof selectedDropdownValue.value;

const props = defineProps({
  isFilters: Boolean,
});
const heroStore = useCharactersStore();
const { dropdownObject, selectedDropdownValue } = storeToRefs(heroStore);
const route = useRoute();
const router = useRouter();

const validatedParams = computed(() => {
  const { page, ...restOfParams } = route.query;
  if (restOfParams) {
    return validateQuery(route.query);
  }
});

function getFilterName(item: FilterValueType) {
  return dropdownObject.value[item];
}

function deleteFilter(filter: FilterValueType) {
  const { page, ...restOfParams } = route.query;
  const inactiveParams = notUsedParams(restOfParams);

  if (restOfParams) {
    const validFilters = validateQuery(restOfParams);
    const queryEntries = Object.entries(validFilters);

    const reduced = queryEntries.reduce((acumulator: object, [key, value]) => {
      return {
        ...acumulator,
        ...(value && key !== filter && { [key]: value }),
      };
    }, {});

    router.push({
      name: 'basic',
      query: {
        page: page,
        ...reduced,
        ...inactiveParams,
      },
    });

    const reducedEntries: [string, string][] = Object.entries(reduced);
    console.log(reducedEntries);
    if (reducedEntries.length === 0) {
      heroStore.getData(Number(page));
    }

    if (reducedEntries.length === 1) {
      heroStore.search(
        reducedEntries[0][0],
        reducedEntries[0][1],
        Number(page)
      );
    } else {
      heroStore.advancedSearch(reduced, Number(page));
    }
  }
}
</script>

<style scoped lang="scss">
.filter-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.filter-box {
  position: relative;
  padding: 5px 18px 5px 10px;
  border: 1px solid var(--color-light-gray);
  margin: 0 5px;
  border-radius: 10px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  cursor: default;

  @include media-s {
    font-size: 16px;
  }
}
.close {
  position: absolute;
  z-index: 1;
  right: -4px;
  top: -9px;
  border: 0;
  background: transparent;
  font-size: 24px;
  transform: rotate(45deg);
  padding: 0 5px;
  color: var(--color-red);
  transition: transform 0.2s ease-in-out;
  font-weight: $fontweight-bold;
  cursor: pointer;
}
.close:hover {
  transform: rotate(135deg);
}
</style>
