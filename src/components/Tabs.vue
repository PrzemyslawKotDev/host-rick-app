<template>
  <div class="tabs">
    <RouterLink
      to="/"
      active-class="active-tab"
      class="link"
      @click="handleParams('basic')"
    >
      All characters
    </RouterLink>
    <RouterLink
      to="/favorites"
      active-class="active-tab"
      class="link"
      @click="handleParams('favorites')"
    >
      Favorites
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const query = ref();

function handleParams(pickedRoute: string) {
  if (pickedRoute === "basic") {
    router.push({
      name: "basic",
      query: query.value,
    });
  }
  if (pickedRoute === "favorites") {
    if (Object.entries(route.query).length) {
      query.value = route.query;
    }
  }
}
</script>

<style scoped lang="scss">
.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.link {
  text-decoration: none;
  color: var(--primary);
  padding: 3px 0;
  margin: 0 20px;

  @include media-s {
    font-size: 20px;
  }
}
.active-tab {
  font-weight: $fontweight-bold;
  color: var(--blue);
  border-bottom: 1px solid var(--blue);

  @include media-s {
    border-bottom: 3px solid var(--blue);
  }
}
</style>
