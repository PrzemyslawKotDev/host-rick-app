<template>
  <DisplayData
    is-filters
    v-if="characters"
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
  const { validParams } = validateQuery(restOfParams);

  if (!page) {
    router.push({
      name: 'basic',
      query: {
        page: 1,
        ...restOfParams,
      },
    });
  }
  heroStore.getCharacters(Number(page), validParams);
});

function isDetailsViewOpen(hero: HeroInterface): void {
  heroData.value = hero;
  openDetailsView.value = true;
}
</script>
<style scoped lang="scss"></style>
