<script setup>
import { defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["upload"]);
const props = defineProps({
    idCampaign: {
        type: String,
        required: true
    },
    width: {
        type: [Number, String],
        default: 1200
    }
});

const selectedFile = ref(null);
const isUploading = ref(false);
const errorMessage = ref("");

const handleFileChange = (event) => {
    selectedFile.value = event.target.files[0];
    errorMessage.value = "";
    console.log("Fichier sǸlectionnǸ:", selectedFile.value?.name);
};

const uploadCsv = async () => {
    if (!selectedFile.value) {
        errorMessage.value = "Veuillez sǸlectionner un fichier CSV";
        console.error("Aucun fichier sǸlectionnǸ");
        return;
    }

    isUploading.value = true;
    errorMessage.value = "";

    try {
        // Renommer le fichier avec l'ID campagne
        const renamedFile = new File(
            [selectedFile.value],
            `${props.idCampaign}.csv`,
            { type: selectedFile.value.type }
        );

        const fileData = await renamedFile.arrayBuffer();
        const result = await window.electronAPI.uploadLinkCsv({
            idCampaign: props.idCampaign,
            fileData
        });

        if (!result || !result.success) {
            throw new Error(result?.error || "Upload failed");
        }

        console.log("Upload rǸussi:", result);

        emit("upload", { 
            success: true,
            filename: result.filename,
            path: result.path
        });

        // RǸinitialiser le formulaire
        selectedFile.value = null;

    } catch (error) {
        console.error("Erreur upload:", error);
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
  <div
    class="upload-container"
    :style="{ '--drop-width': typeof props.width === 'number' ? `${props.width}px` : props.width }"
  >
    <input 
      type="file" 
      accept=".csv" 
      :disabled="isUploading"
      @change="handleFileChange"
    >
    <div
      v-if="selectedFile"
      class="file-info"
    >
      <p>Fichier sǸlectionnǸ: {{ selectedFile.name }}</p>
    </div>
    <button 
      :disabled="!selectedFile || isUploading"
      class="upload-button"
      @click="uploadCsv"
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
    width: var(--drop-width, 1200px);
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
