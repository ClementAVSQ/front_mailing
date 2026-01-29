<script setup>
import { ref, computed, watch } from 'vue';
import campagne from './homepage/campagne.vue';
import donuts from './graphique/donuts.vue';
import list_link from './link/list_link.vue';
import HorizontaleGraphique from './graphique/HorizontaleGraphique.vue';
import compare from './graphique/compare.vue';
import uploader_csv from './uploader_csv.vue';

const props = defineProps({
    idCampaign: {
        type: [String, Number],
        default: null
    }
});

const content = ref({});
const list_contact = ref([]);
const indicator = ref(null);
const mail_search = ref('');
const state = ref(false);
const isLoading = ref(false);
const selectedCampaignId = ref(null);

const activeCampaignId = computed(() => props.idCampaign ?? selectedCampaignId.value);

const loadCampaign = async (idCampaign) => {
    if (!idCampaign) {
        content.value = {};
        list_contact.value = [];
        indicator.value = null;
        state.value = false;
        return;
    }

    isLoading.value = true;
    try {
        const detailResponse = await fetch(`${import.meta.env.VITE_BACK_END}/api/campaign/detail?id_campaign=${idCampaign}`);
        const detailData = await detailResponse.json();
        content.value = detailData?.data?.campaign || {};

        if (content.value.sentDate) {
            const date = new Date(`${content.value.sentDate}`);
            content.value.sentDate = date.toLocaleDateString('fr-FR');
        }

        const currentState = content.value.state;
        state.value = currentState === 'SENT' || currentState === 'FINISH';

        const contactResponse = await fetch(`${import.meta.env.VITE_BACK_END}/api/contact/list?id_campaign=${idCampaign}`);
        const contactData = await contactResponse.json();
        list_contact.value = contactData?.data || [];

        if (state.value) {
            const statsResponse = await fetch(`${import.meta.env.VITE_BACK_END}/api/campaign/stats?id_campaign=${idCampaign}`);
            const statsData = await statsResponse.json();
            const filtered = (statsData?.data || []).filter(element => element?.overview?.count >= 5);
            indicator.value = filtered[0] || null;
        } else {
            indicator.value = null;
        }
    } catch (error) {
        console.error("Aucune donnée n'a été trouvée", error);
    } finally {
        isLoading.value = false;
    }
};

watch(
    () => activeCampaignId.value,
    (newId) => {
        loadCampaign(newId);
    },
    { immediate: true }
);

function handleSelect(id) {
    selectedCampaignId.value = id;
}

const filteredContacts = computed(() => {
    if (!mail_search.value) return list_contact.value;
    return list_contact.value.filter(contact =>
        contact.email.toLowerCase().includes(mail_search.value.toLowerCase())
    );
});

const donutDataset = computed(() => ([
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
]));

const graphHorizontalDataset = computed(() => {
    if (!indicator.value?.overview) return [];
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
});

const deviceDataset = computed(() => {
    if (!indicator.value?.overview?.device) return [];
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

const timeDataset = computed(() => {
    if (!indicator.value?.overview?.read) return [];
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
</script>

<template>
  <div
    id="template"
    class="mini"
  >
    <div
      v-if="isLoading"
      id="loading"
    >
      <p>Chargement...</p>
    </div>
    <template v-else>
      <div class="campaign-list">
        <campagne
          :is-main="false"
          @select-campaign="handleSelect"
        />
      </div>
      <template v-if="activeCampaignId">
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
            width="100%"
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
            :id-campaign="activeCampaignId"
            drop-zone-width="100%"
            array_width="600px"
          />
          <list_link
            :id-campaign="activeCampaignId"
            drop-zone-width="100%"
          />
        </div>
      </div>
      </template>
    </template>
  </div>
</template>

<style scoped>
#template {
    display: flex;
    flex-direction: column;
    width: min(100%, 520px);
    min-height: 100vh;
    align-items: flex-start;
    margin: 0 auto;
    padding: 16px;
}

#loading {
    margin-top: 40px;
}

h1 {
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 16px;
    font-size: 22px;
}

h2 {
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 16px;
    font-size: 18px;
}

#content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 16px;
    width: 100%;
}

#contact {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 0;
}

input {
    margin-top: 12px;
    margin-bottom: 12px;
    height: 28px;
    font-size: 14px;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

ul {
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 180px;
    overflow: auto;
    overflow-x: hidden;
    border: solid 1px black;
}

li {
    font-size: 14px;
    border: solid 1px rgb(228, 228, 228);
    padding: 10px;
    list-style: none;
    margin-left: 0;
}

#data {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
    align-items: stretch;
}

#more {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    align-self: stretch;
    margin-bottom: 16px;
}

#template :deep(#show_links) {
    width: 100%;
    align-self: stretch;
}

#template :deep(#show_links h2) {
    font-size: 18px;
}

#template :deep(#placement_link) {
    justify-content: flex-start;
    gap: 10px;
}

#template :deep(#show_links label) {
    width: 100%;
    font-size: 12px;
}

#template :deep(#show_links ul) {
    width: 100%;
    height: 160px;
}

#template :deep(#show_links li) {
    width: 100%;
    font-size: 13px;
    padding: 8px;
}

#template :deep(.upload-container) {
    align-self: stretch;
}

#template :deep(.upload-container h2) {
    width: 100%;
    align-self: stretch;
}
</style>
