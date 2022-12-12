<template>
  <div class="row-container">
    <button
      class="row"
      :class="{ 'description': description }"
      @click="$emit('toggleDetails')"
    >
      <div class="flex-center">
        <div class="photo">
          <div v-if="image === 'Photo'" class="photo-desc flex-center">
            {{ image }}
          </div>
          <img
            v-else
            v-lazyload="image"
            class="image"
            :class="{ 'dead': status === 'Dead' }"
            width="100"
            height="100"
            :alt="name"
          />
          <img
            width="20"
            height="20"
            v-if="status === 'Dead'"
            class="skull"
            src="@/assets/dead.svg"
            :alt="status"
          />
        </div>
      </div>
      <div class="hero-description">
        <div class="id-number flex-center text-padding">
          <span class="label">ID:&nbsp;</span> {{ heroId }}
        </div>
        <div class="name flex-center text-padding">
          <span class="label">Name:&nbsp;</span> {{ name }}
        </div>
        <div class="gender flex-center text-padding">
          <span class="label">Gender:&nbsp;</span>
          {{ gender }}
        </div>
        <div class="species flex-center text-padding">
          <span class="label">Race:&nbsp;</span> {{ species }}
        </div>
      </div>
      <div
        v-if="favorite === 'Favorite'"
        class="fav-desc flex-center text-padding"
      >
        {{ favorite }}
      </div>
      <div v-else class="flex-center text-padding">
        <button
          @click.stop="$emit('toggleFavorite')"
          :class="{ 'favorite': isFavorite }"
          class="favorites"
        >
          &#x2764;
        </button>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharactersStore } from '@/stores/characters';
import { computed } from 'vue';

interface PropsInterface {
  description?: boolean;
  image: string;
  name: string;
  heroId: number | string;
  gender: string;
  species: string;
  status: string;
  favorite?: string;
}

const props = defineProps<PropsInterface>();
const heroStore = useCharactersStore();
const { favID } = storeToRefs(heroStore);
const isFavorite = computed(() => favID.value?.includes(Number(props.heroId)));
</script>

<style scoped lang="scss">
.row {
  width: 100%;
  padding: 5px;
  border: 0;
  border-bottom: 1px solid var(--color-black);
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  cursor: pointer;

  @include media-xs {
    grid-template-columns: 1fr 4fr 1fr;
    display: grid;
    padding: 5px 20px;
  }
}
.hero-description {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 13px;

  @include media-s {
    grid-template-columns: 1fr 2fr 1fr 1fr;
    font-size: 16px;
  }
}
.description {
  padding: 20px;
  margin-bottom: 10px;
  background-color: rgba(
    128,
    128,
    128,
    0.4
  ); //<- sass not support rgba with hex, need some kind of fix !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  cursor: default;
}
.photo-desc {
  width: 75px;
}
.photo {
  width: 50px;
  position: relative;

  @include media-s {
    width: 100px;
  }
}
.image {
  width: 50px;
  height: 50px;

  @include media-s {
    width: 100px;
    height: 100px;
  }
}
.dead {
  filter: brightness(125%) grayscale(100%);
}
.skull {
  position: absolute;
  right: 5px;
  top: 5px;
}
.favorites {
  color: var(--color-secondary);
  font-size: 20px;
  border: 0;
  background-color: transparent;
  cursor: pointer;

  @include media-s {
    font-size: 40px;
  }
}
.favorite {
  color: var(--color-red);
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-padding {
  padding: 5px;
  text-align: center;

  @include media-s {
    padding: 0 5px;
  }
}
.label {
  display: block;

  @include media-s {
    display: none;
  }
}
</style>
