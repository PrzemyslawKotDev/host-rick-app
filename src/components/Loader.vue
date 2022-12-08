<template>
  <div v-if="isLoading" class="background">
    <div class="spin">
      <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharactersStore } from "@/stores/characters";
import { storeToRefs } from "pinia";

const heroStore = useCharactersStore();
const { isLoading } = storeToRefs(heroStore);
</script>

<style scoped lang="scss">
.background {
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: fixed;
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.spin {
  margin: 0 auto;
}
.loader {
  transform: rotateZ(45deg);
  perspective: 1000px;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  color: var(--red);

  @include media-s {
    width: 250px;
    height: 250px;
  }
}
.loader:before,
.loader:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  transform: rotateX(70deg);
  animation: 1s spin linear infinite;
}
.loader:after {
  color: var(--blue);
  transform: rotateY(70deg);
  animation-delay: 0.4s;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateZ(360deg);
  }
}

@keyframes rotateccw {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@keyframes spin {
  0%,
  100% {
    box-shadow: 1em 0px 0 0px currentcolor;
  }
  12% {
    box-shadow: 1em 1em 0 0 currentcolor;
  }
  25% {
    box-shadow: 0 1em 0 0px currentcolor;
  }
  37% {
    box-shadow: -1em 1em 0 0 currentcolor;
  }
  50% {
    box-shadow: -1em 0 0 0 currentcolor;
  }
  62% {
    box-shadow: -1em -1em 0 0 currentcolor;
  }
  75% {
    box-shadow: 0px -1em 0 0 currentcolor;
  }
  87% {
    box-shadow: 1em -1em 0 0 currentcolor;
  }
}
</style>
