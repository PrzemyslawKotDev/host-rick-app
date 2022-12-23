<template>
  <div class="display-results">
    <FunctionalityBar :is-filters="isFilters" @view-change="isRowView" />
    <div class="no-favs" v-if="!show">{{ noData }}</div>
    <template v-else>
      <div v-if="showInRows" class="rows">
        <CharacterRow
          description
          image="Photo"
          hero-id="ID number"
          name="Name"
          gender="Gender"
          species="Species"
          status="Status"
          favorite="Favorite"
          class="row-header"
        />
        <CharacterRow
          v-for="item in data"
          :key="item.key"
          :image="item.image"
          :hero-id="item.id"
          :name="item.name"
          :gender="item.gender"
          :species="item.species"
          :status="item.status"
          is-favorite
          @toggle-favorite="heroStore.handleFavorites(item)"
          @toggle-details="$emit('openHeroDetails', item)"
        />
      </div>
      <div v-else class="cards">
        <CharacterCard
          v-for="item in data"
          :key="item.key"
          :image="item.image"
          :hero-id="item.id"
          :name="item.name"
          :gender="item.gender"
          :species="item.species"
          :status="item.status"
          is-favorite
          @toggle-favorite="heroStore.handleFavorites(item)"
          @toggle-details="$emit('openHeroDetails', item)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue';
import CharacterRow from '@/components/CharacterRow.vue';
import { computed, ref } from 'vue';
import type HeroType from '@/types/hero';
import { useCharactersStore } from '@/stores/characters';
import { validateQuery } from '@/utilitis/validateQuery';
import FunctionalityBar from './FunctionalityBar.vue';

type PropsType = {
  data: HeroType[];
  noData: string;
  isFilters: boolean;
};

const props = defineProps<PropsType>();
const showInRows = ref<boolean>(!!localStorage.getItem('rows'));
const heroStore = useCharactersStore();
const show = computed(() => !!props.data.length);

function isRowView(): void {
  showInRows.value = !!localStorage.getItem('rows');
}

window.onpopstate = function (): void {
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  const queryObject = Object.fromEntries(searchParams.entries());
  const { page, ...restOfParams } = queryObject;
  const { validParams } = validateQuery(restOfParams);

  heroStore.getCharacters(Number(page), validParams);
};
</script>

<style scoped lang="scss">
.no-favs {
  width: 100%;
  text-align: center;
}
.display-results {
  @include media-s {
    padding: 0 10px;
  }
}
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.result-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-btn {
  border: 0;
  background: var(--color-white);
  font-size: 40px;
  padding: 0 20px;
  margin-top: -5px;
}
.page {
  font-size: 20px;
}
.putPage {
  width: 50px;
}
.row-header {
  display: none;

  @include media-s {
    display: grid;
  }
}
</style>
