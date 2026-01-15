<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMainStore } from '../store/store';
import donuts from '../components/graphique/donuts.vue';
import list_link from '../components/link/list_link.vue';
let store = useMainStore();
let campagne = store.campagne;
let content = ref([]);
let list_contact = ref([]);
let indicator = ref([]);
let mail_search = ref('');
let state = ref(false);
import HorizontaleGraphique from '../components/graphique/HorizontaleGraphique.vue';
import compare from '../components/graphique/compare.vue';
import uploader_csv from '../components/uploader_csv.vue';
let graphHorizontalDataset = ref([]);
let deviceDataset = ref([]);
let timeDataset = ref([]);


//récuperation des données de la campagne
fetch(`${import.meta.env.VITE_BACK_END}/api/campaign/detail?id_campaign=${campagne}`)
    .then(response => response.json())
    .then(data => {
        content.value = data.data.campaign;
        //récuperer la date et la formater en francais
        const date = new Date(`${content.value.sentDate}`)
        content.value.sentDate = date.toLocaleDateString('fr-FR');

        //vérifier si la campagne a déjà été envoyée
        if (state.value = content.value.state === "SENT" || content.value.state === "FINISH") {
            state.value = true
        }

        //si elle a déjà été envoyée on récupère les indicateurs
        fetch(`${import.meta.env.VITE_BACK_END}/api/campaign/stats?id_campaign=${campagne}`)
            .then(response => response.json())
            .then(data => {
                data = data.data.filter(element => element.overview.count >= 5)
                //on enlève les indicateurs avec moins de 5 actions car se sont des tests
                indicator.value = data[0];
                //on créer un dataset pour le graphique horizontal
                graphHorizontalDataset = computed(() => {
                    
                    return [
                        {
                            name: 'Ouvertures',
                            value: indicator.value.overview.openers || 0,
                            color: '#1f77b4',
                        },
                        {
                            name: 'Clics',
                            value: indicator.value.overview.clicks || 0,
                            color: '#ff7f0e',
                        },
                        {
                            name: 'Réponses',
                            value: indicator.value.overview.actives || 0,
                            color: '#2ca02c',
                            children: []
                        },
                        {
                            name: 'email non envoyés',
                            value: indicator.value.overview.bounces || 0,
                            color: '#d62728',
                            children: []
                        }
                    ];
                })
            

                //on crée un dataset pour le graphique des appareils utilisés
                deviceDataset = computed(() => {
                    return [
                        {
                            name: 'Desktop',
                            value: indicator.value.overview.device.desktop || 0,
                            color: '#9467bd',
                        },
                        {
                            name: 'Mobile',
                            value: indicator.value.overview.device.mobile || 0,
                            color: '#8c564b',
                        }

                    ];
                });
                //et un également pour le temps de visionnage
                timeDataset = computed(() => {
                    return [
                        {
                            name: '0-10s',
                            value: indicator.value.overview.read.quick || 0,
                            color: '#e377c2',
                        },
                        {
                            name: '10-30s',
                            value: indicator.value.overview.read.interest || 0,
                            color: '#7f7f7f',
                        }

                    ];
                });
            })
            .catch(error => console.log("aucune donnée n'a été trouvé"))
    })


//récuperation des contacts associés à la campagne
fetch(`${import.meta.env.VITE_BACK_END}/api/contact/list?id_campaign=${campagne}`)
    .then(response => response.json())
    .then(data => {
        list_contact.value = data.data;
    })

//on filtre les contacts en fonction de la recherche
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
      <aside id="back" />
    </router-link>
    <h1>{{ content.name }}</h1>
    <p>envoyer le : {{ content.sentDate }}</p>
    <div id="content">
      <div id="contact">
        <h2>Contacts associés :</h2>

        <input
          v-model="mail_search"
          type="text"
          placeholder="Rechercher un email"
        >
        <ul>
          <li
            v-for="contact in filteredContacts"
            :key="contact.id"
          >
            {{ contact.email }}
          </li>
        </ul>
      </div>
      <div id="data">
        <donuts
          :dataset="donutDataset"
          title="service mail"
        />
        <HorizontaleGraphique
          v-if="state"
          title="indicateur"
          :dataset="graphHorizontalDataset"
        />
        <div
          v-if="state"
          id="more"
        >
          <compare
            :dataset="deviceDataset"
            title="Appareils utilisés"
          />
          <compare
            title="temp de visionnage"
            :dataset="timeDataset"
          />
        </div>
        <uploader_csv
          v-if="state"
          :id-campaign="campagne"
        />
        <list_link :id-campaign="campagne" />
      </div>
    </div>
  </div>
</template>
<style scoped>
#more {
    display: flex;
    gap: 50px;
    width: 1200px;
    align-self: end;
    margin-bottom: 50px;
}

#data {
    display: flex;
    flex-direction: column;
    width: 700px;
    gap: 50px;
}

#content {
    display: flex;
    flex-direction: row;
    gap: 100px;
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