<script setup>
import { computed } from "vue";
import loader from "./components/loader.vue";
import { RouterView } from "vue-router";
import { useMainStore } from "./store/store";

const store = useMainStore();
const loading = computed(() => store.loading);
</script>

<template>
  <div>
    
    <loader v-if="loading"/>
    <router-view/>
  </div>

</template>

<style scoped>

</style>
