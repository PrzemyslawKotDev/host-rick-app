<template>
  <paginate
    v-model="pickedPageNumber"
    :page-count="maxPages"
    :page-range="3"
    :margin-pages="1"
    :click-handler="debouncedPagination"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
  >
  </paginate>
</template>

<script setup lang="ts">
//@ts-expect-error
import Paginate from 'vuejs-paginate-next';
import { storeToRefs } from 'pinia';
import { useCharactersStore } from '@/stores/characters';
import { useRoute, useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import { validateQuery } from '@/utilitis/validateQuery';
import { ref } from 'vue';

const route = useRoute();
const heroStore = useCharactersStore();
const { maxPages, pickedPageNumber } = storeToRefs(heroStore);
const router = useRouter();
const scrollToElement = ref();

const debouncedPagination = useDebounceFn(() => {
  if (pickedPageNumber.value < 1) {
    pickedPageNumber.value = 1;
  }
  if (pickedPageNumber.value > maxPages.value) {
    pickedPageNumber.value = maxPages.value;
  }

  const { validParams } = validateQuery(route.query);

  if (validParams) {
    heroStore.getCharacters(pickedPageNumber.value, validParams);

    if (!scrollToElement.value) {
      scrollToElement.value = document.getElementById('view-bar');
    }
    scrollToElement.value?.scrollIntoView();
  }

  router.push({
    name: 'basic',
    query: {
      ...route.query,
      page: pickedPageNumber.value,
    },
  });
}, 500);
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  width: 100%;
}
.page-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px solid var(--color-black);
  border-radius: 5px;
  margin: 3px;
  cursor: pointer;
}
.page-link {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  background-color: rgba(
    17,
    176,
    200,
    0.5
  ); //<- sass not support rgba with hex, need some kind of fix !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  font-weight: $fontweight-bold;
}
</style>
