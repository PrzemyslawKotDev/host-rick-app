<template>
  <div id="view-bar" class="change-view">
    <button @click="cardsView" class="view-btn">
      <img
        height="25"
        width="25"
        class="view-img"
        src="@/assets/card-view.svg"
        alt="Card view"
      />
    </button>
    <button @click="rowsView" class="view-btn">
      <img
        height="25"
        width="25"
        class="view-img"
        src="@/assets/row-view.svg"
        alt="Row wiew"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
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
  cursor: pointer;
}
</style>
