
<script setup>

import { ref, computed } from "vue";
import { useMainStore } from "../../store/store";
let store = useMainStore();
let contacts = ref([]);

//filtrer les contacts en fonction de l'entreprise sélectionnée
const filteredContacts = computed(() => {
    if (store.id_entreprise !== null) {
        return contacts.value.filter(c => c.entreprise_id === store.id_entreprise)
    }
    return contacts.value;
}
);
//récuperation des contacts associés aux entreprises
fetch(`${import.meta.env.VITE_BACK_END}/api/client/bycompany`)
    .then(response => response.json())
    .then(data => {
        contacts.value = data.data
    })
    .catch(err => {
        console.error(err);
    });

</script>


<template>
  <div id="page">
    <h2>Contact</h2>
    <ul>
      <li
        v-for="client in filteredContacts"
        :key="client.id"
      >
        {{ client.mail }}
      </li>
    </ul>
    <button>envoyer une campagne</button>
  </div>
</template>

<style scoped>

button {
    margin-top: 20px;
    width: 200px;
    height: 40px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background-color: rgb(145, 2, 2);
}
#page {
    padding-left: 50px;
    display: flex;
    flex-direction: column;

}

h2 {
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 100px;
    font-size: 36px;

}

li{
    font-size: 20px;
    border:solid 1px rgb(228, 228, 228);
    padding:20px;
    cursor: default;
}


ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 70vh;
    border: solid 1px black;
    overflow: scroll;
    overflow-x: hidden;
    padding-left: 0;
}
</style>