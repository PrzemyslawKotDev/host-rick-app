<template>
  <div class="card">
    <button class="card-container" @click="$emit('toggleDetails')">
      <div class="photo">
        <img
          height="300"
          width="300"
          v-lazyload="image"
          :class="{ 'dead': status === 'Dead' }"
          :alt="name"
        />
        <img
          height="100"
          width="70"
          v-if="status === 'Dead'"
          class="skull"
          src="@/assets/dead.svg"
          :alt="status"
        />
      </div>
      <div class="description">
        <div class="name">{{ heroId }}. {{ name }}</div>
        <div class="text">Gender: {{ gender }}</div>
        <div class="text">Race: {{ species }}</div>
      </div>
    </button>
    <button
      @click="$emit('toggleFavorite')"
      :class="{ 'favorite': isFavorite }"
      class="favorites"
    >
      &#x2764;
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharactersStore } from '@/stores/characters';
import { computed } from 'vue';

interface PropsInterface {
  image: string;
  name: string;
  heroId: number | string;
  gender: string;
  species: string;
  status: string;
}

const props = defineProps<PropsInterface>();
const heroStore = useCharactersStore();
const { favID } = storeToRefs(heroStore);
const isFavorite = computed(() => favID.value?.includes(Number(props.heroId)));
</script>

<style scoped lang="scss">
.card {
  border: 1px solid var(--color-secondary);
  border-radius: 10px;
  margin: 10px 0;
  max-width: 300px;
  min-height: 428px;
  overflow: hidden;
  color: var(--color-primary);
  position: relative;
  cursor: pointer;

  @include media-xs {
    margin: 10px;
  }
}
.card-container {
  padding: 0;
  margin: 0;
  height: 100%;
  border: 0;
  background-color: transparent;
  display: flex;
  flex-direction: column;
}
.photo {
  position: relative;
}
.dead {
  filter: brightness(125%) grayscale(100%);
}
.skull {
  position: absolute;
  right: 10px;
  top: 10px;
}
.favorites {
  color: var(--color-secondary);
  font-size: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 0;
  background-color: var(--color-white);
  position: absolute;
  right: 10px;
  bottom: 15px;
  padding: 0;
  cursor: pointer;
}
.favorite {
  color: var(--color-red);
}
.description {
  padding: 10px;
  width: 100%;
  text-align: left;
  font-size: 18px;
}

.text {
  padding-top: 5px;
  width: 75%;

  @include media-xs {
    padding-top: 8px;
  }
}
</style>
