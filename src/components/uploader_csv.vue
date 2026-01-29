<script setup>
import { ref, onMounted } from "vue";
import { defineProps } from "vue";
import zone_dropped from "./uploader.vue/zone_dropped.vue";
import carousel_link from './graphique/carousel_link.vue';

const props = defineProps({
    idCampaign: {
        type: String,
        required: true
    },
    dropZoneWidth: {
        type: [Number, String],
        default: 1200
    },
    array_width: {
        type: [Number, String],
        default: 1200
    }
});

const file = ref(null);
const filefound = ref(false);
const isLoading = ref(false);
const data_csv = ref({
    head: ["col1", "col2", "col3", "col4", "col5"],
    body: [
        [10000, 1000, 100, 10, 0],
        [10001, 1001, 101, 11, 1],
        [10002, 1002, 102, 12, 2],
        [10003, 1003, 103, 13, 3],
        [10004, 1004, 104, 14, 4],
        [10005, 1005, 105, 15, 5],
        [10006, 1006, 106, 16, 6],
        [10007, 1007, 107, 17, 7],
        [10008, 1008, 108, 18, 8],
        [10009, 1009, 109, 19, 9]
    ]
});

async function call_data() {
    isLoading.value = true;
    try {
        const data = await window.electronAPI.getCampaignData(props.idCampaign);
        
        if (data && data.success && data.file) {
            data_csv.value = data.file;
            filefound.value = true;
        } else {
            filefound.value = false;
        }
    } catch (error) {
        console.error("Erreur lors de la rÇ¸cupÇ¸ration des donnÇ¸es:", error);
        filefound.value = false;
    } finally {
        isLoading.value = false;
    }
}

const del_data_link = async () => {
    try {
        const result = await window.electronAPI.deleteCampaignCsv(props.idCampaign);
        if (result && result.success) {
            filefound.value = false;
            data_csv.value = { head: [], body: [] };
        } else {
            const errorMsg = result?.info || "Erreur inconnue";
        }
    } catch (error) {
        console.error("❌ Erreur lors de la suppression :", error);
    }
};

const handleUpload = async (payload) => {
    console.log("Upload reВu du composant enfant:", payload);
    if (payload.success) {
        setTimeout(() => {
            call_data();
        }, 500);
    }
};

// RÇ¸cupÇ¸ration des donnÇ¸es CSV de la campagne
onMounted(() => {
    call_data();
});
</script>

<template>
  <h2>KPI liens:</h2>
  <div
    v-if="isLoading"
    style="align-self: flex-end;"
  >
    <p>Chargement...</p>
  </div>
  <div
    v-else-if="!filefound"
    style="align-self: flex-end;"
  >
    <zone_dropped
      :id-campaign="props.idCampaign"
      :width="props.dropZoneWidth"
      @upload="handleUpload"
    />
  </div>
  <div v-else>
    <carousel_link
      :dataset="data_csv"
      title="lien du template:"
      :width="props.array_width"
    />
    <button @click="del_data_link">
      Supprimer le fichier de liens
    </button>
  </div>
</template>

<style scoped>
h2 {
    width: 90%;
    align-self: end;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
}
</style>
