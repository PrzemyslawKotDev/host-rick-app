<template>
  <div
    class="hero-details"
    ref="elementWith3D"
    :style="{
      'transform': cardTransform,
      'transition': 'transform 0.25s ease-out',
    }"
  >
    <img
      :src="hero?.image"
      class="img"
      :class="{ 'dead': hero?.status === 'Dead' }"
      width="300"
      height="300"
      :alt="hero?.name"
    />
    <div class="info">
      <div class="text-space">ID: {{ hero?.id }}</div>
      <div class="text-space">Name: {{ hero?.name }}</div>
      <div class="text-space">Status: {{ hero?.status }}</div>
      <div class="text-space">Species: {{ hero?.species }}</div>
      <div v-if="hero?.type.length" class="text-space">
        Type: {{ hero?.type }}
      </div>
      <div class="text-space">Gender: {{ hero?.gender }}</div>
      <div class="text-space">Origin: {{ hero?.origin.name }}</div>
      <div class="text-space">Location: {{ hero?.location.name }}</div>
      <div v-if="hero?.episode" class="text-space">
        Last episode:
        {{ lastEpisode }}
      </div>
      <div v-if="hero?.created" class="text-space">
        Created:
        {{ created }}
      </div>
    </div>
    <button @click="$emit('closeDetails')" class="close">+</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMouseInElement } from '@vueuse/core';
import type HeroInterface from '@/types/hero';

const props = defineProps<{
  hero: HeroInterface | undefined;
}>();

const lastEpisode = computed(() => {
  return props.hero?.episode[props.hero.episode.length - 1].split('/')[5];
});

const created = computed(() => {
  return props.hero?.created.split('T')[0].split('-').reverse().join('/');
});

const elementWith3D = ref(null);
const { elementX, elementY, isOutside, elementHeight, elementWidth } =
  useMouseInElement(elementWith3D);

const cardTransform = computed(() => {
  const MAX_ROTATION = 20;

  const rX = (
    MAX_ROTATION / 2 -
    (elementY.value / elementHeight.value) * MAX_ROTATION
  ).toFixed(2);

  const rY = (
    (elementX.value / elementWidth.value) * MAX_ROTATION -
    MAX_ROTATION / 2
  ).toFixed(2);

  return isOutside.value
    ? ''
    : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
});
</script>

<style scoped lang="scss">
.hero-details {
  position: relative;
  border: 2px solid var(--color-black);
  border-radius: 10px;
  background-color: var(--color-white);
  max-width: 90%;
  font-size: 14px;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  cursor: default;

  @include media-s {
    padding: 30px;
    font-size: 20px;
    flex-wrap: nowrap;
  }
}
.close {
  position: absolute;
  z-index: 99;
  right: 7px;
  top: 0;
  border: 0;
  background: transparent;
  font-size: 40px;
  transform: rotate(45deg);
  padding: 0 5px;
  color: var(--color-red);
  transition: transform 0.2s ease-in-out;
  font-weight: $fontweight-bolder;
  cursor: pointer;
}
.close:hover {
  transform: rotate(135deg);
}
.dead {
  filter: brightness(130%) grayscale(100%);
}
.text-space {
  margin: 5px;

  @include media-s {
    margin: 10px;
  }
}
.img {
  max-width: 100%;
}
.info {
  @include media-s {
    grid-template-columns: 1fr 1fr;
    display: grid;
    padding-left: 5px;
  }
}
</style>
