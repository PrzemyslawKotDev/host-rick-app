<template>
  <div id="view-bar" class="change-view">
    <button class="view-btn">
      <img
        @click="cardsView"
        tabindex="0"
        class="view-img"
        src="@/assets/card-view.svg"
      />
    </button>
    <button class="view-btn">
      <img
        @click="rowsView"
        tabindex="0"
        class="view-img"
        src="@/assets/row-view.svg"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCharactersStore } from "@/stores/characters";
import { storeToRefs } from "pinia";

const herostore = useCharactersStore();
const { changeViewElement } = storeToRefs(herostore);

onMounted(() => {
  changeViewElement.value = document.getElementById("view-bar");
});

const emit = defineEmits(["viewChange"]);

function rowsView(): void {
  localStorage.setItem("rows", "true");
  emit("viewChange");
}

function cardsView(): void {
  localStorage.removeItem("rows");
  emit("viewChange");
}
</script>

<style scoped lang="scss">
.change-view {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}
.view-btn {
  border: 0;
  background-color: transparent;
}
.view-img {
  width: 25px;
}
.view-img:hover {
  cursor: pointer;
}
</style>
