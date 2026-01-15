<script setup>
import { defineProps, ref, onMounted, computed, watch } from 'vue';
import drop_zone_link from './drop_zone_link.vue';

const props = defineProps({
    idCampaign: {
        type: String,
        required: true
    }
});

const link_found = ref(false);
const isLoading = ref(true);
const link_selected = ref("");
const data_links = ref([]);

// Watch pour voir quand link_selected change
watch(link_selected, (newVal) => {
    console.log("Link sélectionné changé:", newVal);
    console.log("data_links actuel:", data_links.value);
});

// Computed pour filtrer les mails du lien sélectionné
const mail_by_link = computed(() => {
    
    if (!link_selected.value || data_links.value.length === 0) {
        console.log("Retour vide - pas de sélection ou pas de data");
        return [];
    }
    
    const linkData = data_links.value.find(element => element.link === link_selected.value);
    
    if (!linkData) {
        return [];
    }
    
    // Essayons différentes propriétés possibles
    const result = linkData.list_mail;
    return result;
});

const checkLink = async () => {
    isLoading.value = true;
    try {
        const data = await window.electronAPI.getLinkData(props.idCampaign);

        if (data && data.success !== false) {
            link_found.value = true;
            data_links.value = data.data;
        } else {
            link_found.value = false;
            data_links.value = [];
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du lien:", error);
        link_found.value = false;
        data_links.value = [];
    } finally {
        isLoading.value = false;
    }
};

const handleUpload = async (payload) => {
    console.log("Upload reçu:", payload);
    if (payload.success) {
        setTimeout(() => {
            checkLink();
        }, 500);
    }
};

const del_data_mail = async () => {
    try {
        const result = await window.electronAPI.deleteMailCsv(props.idCampaign);
        if (result && result.success) {
            console.log("✅ Fichier de liens supprimé avec succès !");
            link_found.value = false;
            data_links.value = [];
        } else {
            console.error("❌ Erreur lors de la suppression :", result?.info || result);
        }
    } catch (error) {
        console.error("❌ Erreur lors de la suppression :", error);
    }
};

const copyAllMails = () => {
    const allMails = mail_by_link.value.join("\n");
    navigator.clipboard.writeText(allMails).then(() => {
        console.log("✅ Mails copiés !");
        alert("✅ Tous les mails copiés !");
    }).catch(err => {
        console.error("❌ Erreur :", err);
    });
};

onMounted(() => {
    checkLink();
});
</script>

<template>
  <div
    v-if="isLoading"
    style="align-self:end;"
  >
    <p>Chargement...</p>
  </div>
  <div
    v-else-if="link_found"
    id="show_links"
  >
    <h2>Liste des cliqueurs en fonction des liens</h2>
    <div id="placement_link">
      <label
        v-for="link in data_links"
        :key="link.link"
      >
        <input
          v-model="link_selected"
          type="radio"
          name="choix"
          :value="link.link"
        > {{ link.link }}
      </label>
    </div>


    <ul
      v-if="link_selected && mail_by_link.length > 0"
      @click="copyAllMails"
    >
      <li
        v-for="(mail, index) in mail_by_link"
        :key="index"
      >
        {{ mail }}
      </li>
    </ul>
    <button @click="del_data_mail">
      suppression des mails
    </button>
  </div>
  <div
    v-else
    style="align-self:end;"
  >
    <h2>Liste des cliqueurs en fonction des liens</h2>
    <drop_zone_link
      :id_campaign="props.id_campaign"
      @upload="handleUpload"
    />
  </div>
</template>

<style scoped>
#placement_link {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

label {
    width: 500px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
    height: 20px;
    overflow: hidden;
    cursor: pointer;
}

h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
}

#show_links {
    width: 1200px;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
}

li{
    font-size: 20px;
    border:solid 1px rgb(228, 228, 228);
    padding:20px;
    cursor: default;
    width: 550px;
}

ul {
    align-self: center;
    list-style-type: none;
    display: flex;
    flex-direction: row; 
    flex-wrap: wrap;
    width: 1200px;
    height: 200px;
    border: solid 1px black;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-left: 0;
    align-content: flex-start; /* Pour que le contenu commence en haut */
}
</style>