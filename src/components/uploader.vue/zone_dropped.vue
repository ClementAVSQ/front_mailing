<script setup>
import { defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["upload"]);
const props = defineProps({
    idCampaign: {
        type: String,
        required: true
    }
});

const file = ref(null);
const isUploading = ref(false);
const errorMessage = ref("");

const onFileChange = (event) => {
    file.value = event.target.files[0];
    errorMessage.value = "";
    console.log("Fichier sÇ¸lectionnÇ¸:", file.value?.name);
};

const sendCsv = async () => {
    // VÇ¸rifier qu'un fichier est sÇ¸lectionnÇ¸
    if (!file.value) {
        errorMessage.value = "Veuillez sÇ¸lectionner un fichier CSV";
        console.error("Aucun fichier sÇ¸lectionnÇ¸");
        return;
    }

    isUploading.value = true;
    errorMessage.value = "";

    try {
        // CrÇ¸ation d'un nouveau fichier avec le nom voulu
        const renamedFile = new File(
            [file.value],
            `${props.id_campaign}.csv`,
            { type: file.value.type }
        );

        const fileData = await renamedFile.arrayBuffer();
        const result = await window.electronAPI.uploadCsv({
            idCampaign: props.id_campaign,
            fileData
        });

        if (!result || !result.success) {
            throw new Error(result?.error || "Upload failed");
        }

        console.log("Upload rÇ¸ussi:", result);

        // Ç%mettre l'Ç¸vÇ¸nement de succÇùs
        emit("upload", {
            success: true,
            filename: result.filename,
            path: result.path
        });

        // RÇ¸initialiser le formulaire
        file.value = null;
        
    } catch (error) {
        console.error("Erreur lors de l'upload:", error);
        errorMessage.value = "Erreur lors de l'envoi du fichier";
        
        emit("upload", {
            success: false,
            error: error.message
        });
    } finally {
        isUploading.value = false;
    }
};
</script>

<template>
  <div class="upload-container">
    <input 
      type="file" 
      accept=".csv" 
      :disabled="isUploading"
      @change="onFileChange"
    >
    <div
      v-if="file"
      class="file-info"
    >
      <p>Fichier sÇ¸lectionnÇ¸: {{ file.name }}</p>
    </div>
    <button 
      :disabled="!file || isUploading" 
      class="upload-button"
      @click="sendCsv"
    >
      {{ isUploading ? 'Envoi en cours...' : 'Envoyer' }}
    </button>
    <p
      v-if="errorMessage"
      class="error"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.upload-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1200px;
    height: 200px;
    border: 2px dashed #ccc;
    text-align: center;
    cursor: pointer;
}

input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.file-info {
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
}

.upload-button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.upload-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.upload-button:hover:not(:disabled) {
    background-color: #45a049;
}

.error {
    color: red;
    font-weight: bold;
}
</style>
