<script setup>
import entreprise from '../components/homepage/entreprise.vue';
import list_contact from '../components/homepage/list_contact.vue';
import campagne from '../components/homepage/campagne.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <entreprise />
    <list_contact />
    <div id="campaign">
      <campagne/>
      <RouterLink to="/comparative">
        <button>Compare 2 campagne</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row;
}
#campaign {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-left: 50px;
}

button {
  width: 200px;
  height: 40px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: gray;
}
</style>
