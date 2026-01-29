<script setup>
import { ref } from "vue";
import { useMainStore } from "../../store/store";
const props = defineProps({
    isMain: {
        type: Boolean,
        default: true
    }
});
const emit = defineEmits(["select-campaign"]);
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

function handleClick(campagne) {
    if (props.isMain) {
        selectCampagne(campagne.id);
        return;
    }
    emit("select-campaign", campagne.id);
}

</script>
<template>
  <div id="content">
    <h2>LES CAMPAGNES ENVOYÉ</h2>
    <ul>
      <template v-for="campagne in campagnes">
        <router-link
          v-if="props.isMain"
          :key="`link-${campagne.id}`"
          :to="`/campagne/${campagne.name}`"
        >
          <li @click="handleClick(campagne)">
            {{ campagne.name }}
          </li>
        </router-link>
        <li
          v-else
          :key="`item-${campagne.id}`"
          @click="handleClick(campagne)"
        >
          {{ campagne.name }}
        </li>
      </template>
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
