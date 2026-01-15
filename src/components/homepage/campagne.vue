<script setup>
import { ref } from "vue";
import { useMainStore } from "../../store/store";
let store = useMainStore();
let campagnes = ref([]);

//récuperation des campagnes
fetch(`${import.meta.env.VITE_BACK_END}/api/campaign`)
    .then(response => response.json())
    .then(data => {
        campagnes.value = data.data;
    })
    .catch(err => {
        console.error(err);
    });

function selectCampagne(name) {
    store.campagne = name;
}

</script>
<template>
  <div id="content">
    <h2>LES CAMPAGNES ENVOYÉ</h2>
    <ul>
      <router-link
        v-for="campagne in campagnes"
        :key="campagne.id"
        :to="`/campagne/${campagne.name}`"
      >
        <li @click="selectCampagne(campagne.id)">
          {{ campagne.name }}
        </li>
      </router-link>
    </ul>
  </div>
</template>
<style scoped>

#content {
    padding-left: 50px;
    display: flex;
    flex-direction: column;
}
h2 {
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 100px;
    font-size: 36px;
}

ul {
    height: fit-content;
    border: 1px solid black;
    height: 300px;
    padding: 0;
    overflow: scroll;
    overflow-x: hidden;
}

li{
    font-size: 20px;
    border:solid 1px rgb(228, 228, 228);
    list-style: none;
    padding: 20px;
}

li:hover {
    background-color: rgb(240, 240, 240);
    cursor: pointer;
}

a{
    text-decoration: none;
    color: black;
}
</style>