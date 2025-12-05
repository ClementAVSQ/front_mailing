<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '../store/store';
import donuts from '../components/graphique/donuts.vue';
let store = useMainStore();
let campagne = store.campagne;
let content = ref([]);
let list_contact = ref([]);
let mail_search = ref('');
import HorizontaleGraphique from '../components/graphique/HorizontaleGraphique.vue';   


fetch(`${import.meta.env.VITE_BACK_END}/api/campaign/detail?id_campaign=${campagne}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        content.value = data.data.campaign;
        const date = new Date(`${content.value.sentDate}`)
        content.value.sentDate = date.toLocaleDateString('fr-FR');
    })

fetch(`${import.meta.env.VITE_BACK_END}/api/contact/list?id_campaign=${campagne}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        list_contact.value = data.data;
    })
fetch(`${import.meta.env.VITE_BACK_END}/api/campaign/stats?id_campaign=${campagne}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        list_contact.value = data.data;
    })





const filteredContacts = computed(() => {
    if (!mail_search.value) return list_contact.value;

    return list_contact.value.filter(contact =>
        contact.email.toLowerCase().includes(mail_search.value.toLowerCase())
    );
});

// Créer un dataset pour le donut basé sur les stats de campagne
const donutDataset = computed(() => {
    return [
        {
            name: 'Mails envoyés',
            values: [content.value.countValid || 0]
        },
     {
            name: 'Désabonnements',
            values: [content.value.countUnsubscribers || 0]
        },
        {
            name: 'Mails échoués',
            values: [content.value.countInvalid || 0]
        }

    ];
});


</script>
<template>
    <div id="template">
        <router-link to="/">
            <aside id="back"></aside>
        </router-link>
        <h1>{{ content.name }}</h1>
        <p>envoyer le : {{ content.sentDate }}</p>
        <div id="content">
            <div id="contact">
                <h2>Contacts associés :</h2>

                <input type="text" v-model="mail_search" placeholder="Rechercher un email" />
                <ul>
                    <li v-for="contact in filteredContacts">{{ contact.email }}</li>
                </ul>
            </div>
            <div id="data">
                <donuts :dataset="donutDataset" title="service mail"></donuts>
                <HorizontaleGraphique></HorizontaleGraphique>
            </div>
        </div>
    </div>
</template>
<style scoped>

#data {
    display: flex;
    flex-direction: row;
    
    gap: 50px;
}
#content {
    display: flex;
    flex-direction: row;
    gap: 100px;
    width: 100%;
    margin-top: 50px;
}

#back {
    width: 40px;
    height: 40px;
    background-color: black;
    background-size: cover;
    margin-top: 20px;
    margin-left: 20px;
    cursor: pointer;
}

input {
    margin-top: 20px;
    margin-bottom: 20px;
    height: 30px;
    font-size: 16px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

#template {
    display: flex;
    flex-direction: column;
    width: fit-content;
    align-items: center;
    width: 100%;
    height: 100vh;
}

h1 {
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 100px;
    font-size: 36px;
}

h2 {
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 50px;
    font-size: 28px;
}

#contact {
    align-self: flex-start;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    width: fit-content;
}

h1 {
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 100px;
    font-size: 36px;
}


li {
    font-size: 20px;
    border: solid 1px rgb(228, 228, 228);
    padding: 20px;
    list-style: none;
    margin-left: 0;
}


ul {
    padding: 0;
    width: 400px;
    display: flex;
    flex-direction: column;
    height: 50vh;
    overflow: scroll;
    overflow-x: hidden;
    border: solid 1px black;
}
</style>