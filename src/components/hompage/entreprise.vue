<script setup>
import { ref } from "vue";
import { useMainStore } from "../../store/store";
let store = useMainStore();

const Entreprises = ref([]);
store.setLoading(true);
fetch(`${import.meta.env.VITE_BACK_END}/api/company`)
    .then(response => response.json())
    .then(data => {
        Entreprises.value = data.data;
        store.setLoading(false);
    })
    .catch(err => {
        console.error(err);
        store.setLoading(false);
    });


function getEntreprises(id) {
    store.id_entreprise = id;
    console.log(store.id_entreprise);
}

function getAllEntreprises() {
    store.id_entreprise = null;
    console.log(store.id_entreprise);
}
</script>

<template>
    <div id="list">
        <h2>Entreprise</h2>
        <ul>
            <li v-for="entreprise in Entreprises" :key="entreprise.id" @click="getEntreprises(entreprise.id)">{{ entreprise.entreprise }}</li>
        </ul>
        <button @click="getAllEntreprises()"> toute les entreprises</button>
    </div>
</template>
<style scoped>

button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: rgb(255, 99, 71);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

h2{
    font-family: Arial, Helvetica, sans-serif;
    margin-top:  100px;
    font-size: 36px;
}
#list {
    background-color: red;
    height: 100vh;
    width: 20vw;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

ul {
    padding: 0;
    align-self: flex-start;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 24px;
    width: 100%;
    text-align: center;
}

li {
    padding: 10px 0;
}
li:hover {
    cursor: pointer;
    background-color: rgb(253, 85, 85);
    width: 100%;
}
</style>
