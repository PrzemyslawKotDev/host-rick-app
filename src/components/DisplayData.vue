<template>
  <div class="display-results">
    <FunctionalityBar :isFilters="isFilters" @viewChange="isRowView" />
    <div class="no-favs" v-if="!show">{{ noData }}</div>
    <template v-else>
      <div v-if="showInRows" class="rows">
        <CharacterRow
          description
          image="Photo"
          heroId="ID number"
          name="Name"
          gender="Gender"
          species="Species"
          status="Status"
          favorite="Favorite"
          class="row-header"
        />
        <CharacterRow
          v-for="item in data"
          :key="item.id"
          :image="item.image"
          :heroId="item.id"
          :name="item.name"
          :gender="item.gender"
          :species="item.species"
          :status="item.status"
          isFavorite
          @toggleFavorite="heroStore.handleFavorites(item)"
          @toggleDetails="$emit('openHeroDetails', item)"
        />
      </div>
      <div v-else class="cards">
        <CharacterCard
          v-for="item in data"
          :key="item.id"
          :image="item.image"
          :heroId="item.id"
          :name="item.name"
          :gender="item.gender"
          :species="item.species"
          :status="item.status"
          isFavorite
          @toggleFavorite="heroStore.handleFavorites(item)"
          @toggleDetails="$emit('openHeroDetails', item)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import CharacterCard from "@/components/CharacterCard.vue";
import CharacterRow from "@/components/CharacterRow.vue";
import { computed, ref } from "vue";
import type HeroType from "@/types/hero";
import { useCharactersStore } from "@/stores/characters";
import { validateQuery } from "@/utilitis/validateQuery";
import FunctionalityBar from "./FunctionalityBar.vue";

const props = defineProps<{
  data: HeroType[];
  noData: string;
  isFilters?: boolean;
}>();
const heroStore = useCharactersStore();
const show = computed(() => {
  if (props.data) {
    return true;
  } else return false;
});
const showInRows = ref<boolean>(!!localStorage.getItem("rows"));

function isRowView() {
  showInRows.value = !!localStorage.getItem("rows");
}

window.onpopstate = function () {
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  const queryObject = Object.fromEntries(searchParams.entries());
  const { page, ...restOfParams } = queryObject;
  const validFilters = validateQuery(restOfParams);
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
  background: var(--white);
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
