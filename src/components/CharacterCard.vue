<template>
  <div :id="heroId + ''" class="card">
    <div class="card-container" tabindex="0" @click="$emit('toggleDetails')">
      <div class="photo">
        <img
          v-lazyload
          class="image"
          :class="{ dead: status === 'Dead' }"
          :data-src="image"
        />
        <img v-if="status === 'Dead'" class="ribbon" src="@/assets/dead.svg" />
      </div>
      <div class="description">
        <div class="name">{{ heroId }}. {{ name }}</div>
        <div class="text">Gender: {{ gender }}</div>
        <div class="text">Race: {{ species }}</div>
      </div>
    </div>
    <button
      @click="$emit('toggleFavorite')"
      :class="{ favorite: favID?.includes(Number(heroId)) }"
      class="favorites"
    >
      &#x2764;
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharactersStore } from "@/stores/characters";

const heroStore = useCharactersStore();
const { favID } = storeToRefs(heroStore);

interface PropsInterface {
  image: string;
  name: string;
  heroId: number | string;
  gender: string;
  species: string;
  status: string;
}

const props = defineProps<PropsInterface>();
</script>

<style scoped lang="scss">
.card {
  border: 1px solid var(--secondary);
  border-radius: 10px;
  margin: 10px 0;
  max-width: 300px;
  min-height: 428px;
  overflow: hidden;
  color: var(--primary);
  position: relative;

  @include media-xs {
    margin: 10px;
    font-size: 18px;
  }
}
.card:hover {
  cursor: pointer;
}
.card-container {
  padding: 0;
  margin: 0;
}
.photo {
  position: relative;
}
.dead {
  filter: brightness(125%) grayscale(100%);
}
.image {
  width: 298px;
  height: 298px;
}
.ribbon {
  position: absolute;
  width: 70px;
  right: 10px;
  top: 10px;
}
.favorites {
  color: var(--secondary);
  font-size: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 0;
  background-color: var(--white);
  position: absolute;
  right: 10px;
  bottom: 15px;
  padding: 0;
}
.favorites:hover {
  cursor: pointer;
}
.favorite {
  color: var(--red);
}
.description {
  padding: 10px;
}

.text {
  padding-top: 5px;
  width: 75%;

  @include media-xs {
    padding-top: 8px;
  }
}
</style>
