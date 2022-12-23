<template>
  <div v-if="isFilters" class="filter-container">
    <div v-for="(value, key) in validatedParams" :key="key" class="filter-box">
      <div>{{ dropdownObject[key] }}: {{ value }}</div>
      <button @click="deleteFilter(key)" class="close">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters';
import { validateQuery } from '@/utilitis/validateQuery';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { FilterType } from '@/utilitis/validateQuery';

type PropsType = {
  isFilters: Boolean;
};

const props = defineProps<PropsType>();
const heroStore = useCharactersStore();
const { dropdownObject } = storeToRefs(heroStore);
const route = useRoute();
const router = useRouter();

const validatedParams = computed(() => {
  const { validParams } = validateQuery(route.query);
  return validParams;
});

function deleteFilter(filter: FilterType): void {
  const paramsEntries = Object.entries(route.query);
  const updatedParams = paramsEntries.reduce((acumulator, [key, value]) => {
    return {
      ...acumulator,
      ...(value && key !== filter && { [key]: value }),
    };
  }, {});

  router.push({
    name: 'basic',
    query: {
      ...updatedParams,
      page: 1,
    },
  });

  const { validParams } = validateQuery(updatedParams);

  heroStore.getCharacters(1, validParams);
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

  &:hover {
    transform: rotate(135deg);
  }
}
</style>
