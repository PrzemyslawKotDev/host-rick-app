<template>
  <DisplayData
    is-filters
    v-if="characters && characters !== 'error'"
    :data="characters.results"
    no-data="No data to display."
    @open-hero-details="isDetailsViewOpen"
  />
  <Overlay :is-open="openDetailsView" @close-details="openDetailsView = false">
    <HeroDetails @close-details="openDetailsView = false" :hero="heroData" />
  </Overlay>
  <PageNavigation />
</template>

<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters';
import { onMounted, ref } from 'vue';
import DisplayData from '@/components/DisplayData.vue';
import HeroDetails from '@/components/HeroDetails.vue';
import type HeroInterface from '@/types/hero';
import { storeToRefs } from 'pinia';
import Overlay from '@/components/Overlay.vue';
import PageNavigation from '@/components/PageNavigation.vue';
import { useRoute, useRouter } from 'vue-router';
import { validateQuery } from '@/utilitis/validateQuery';

const openDetailsView = ref(false);
const heroData = ref<HeroInterface>();
const heroStore = useCharactersStore();
const { characters } = storeToRefs(heroStore);
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const { page, ...restOfParams } = route.query;
  const validFilters = validateQuery(restOfParams);

  if (!page) {
    router.push({
      name: 'basic',
      query: {
        page: 1,
        ...restOfParams,
      },
    });
  }

  if (validFilters) {
    const validEntries = Object.entries(validFilters);

    if (validEntries.length > 1) {
      heroStore.advancedSearch(validFilters, Number(page));
    } else if (validEntries.length < 1) {
      heroStore.getData(Number(page));
    } else {
      heroStore.search(validEntries[0][0], validEntries[0][1], Number(page));
    }
  }
});

function isDetailsViewOpen(hero: HeroInterface) {
  heroData.value = hero;
  openDetailsView.value = true;
}
</script>
//Header selfclose na czerwono -> czemu? googlać //vite ssg test // PageSpeed
bug fix // najpier filtr przez dropdown, pozniej dopisz w advanced, dropdown
zostaje -> usunięcie filtrów dropdown zostaje
<style scoped lang="scss"></style>
