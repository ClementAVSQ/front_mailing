<script setup>
import { ref, watch } from "vue";
import { VueUiSparkStackbar } from "vue-data-ui";
import "vue-data-ui/style.css"; 

// Props
const props = defineProps({
  title: {
    type: String,
    default: "Titre du graphique"
  },
  dataset: {
    type: Array,
    default: () => []
  }
});

// Configuration du graphique
const config = ref({
  debug: false,
  loading: false,
  events: { datapointEnter: null, datapointLeave: null, datapointClick: null },
  theme: '',
  customPalette: [],
  style: {
    fontFamily: 'inherit',
    backgroundColor: '#FFFFFFff',
    animation: { show: true, animationFrames: 60 },
    bar: { gradient: { show: true, intensity: 40, underlayerColor: '#FFFFFF' } },
    legend: {
      show: true,
      textAlign: 'left',
      fontSize: 16,
      margin: '6px 0 0 0',
      name: { color: '#1A1A1Aff', bold: false },
      value: { show: true, bold: false, color: '#1A1A1Aff', prefix: '', suffix: '', rounding: 0 },
      percentage: { show: true, bold: true, color: '#1A1A1Aff', rounding: 1 }
    },
    title: {
      text: "", // sera mis à jour automatiquement avec watch
      color: '#1A1A1Aff',
      fontSize: 16,
      bold: true,
      textAlign: 'left',
      paddingLeft: 0,
      paddingRight: 0,
      subtitle: { color: '#A1A1A1ff', text: '', fontSize: 12, bold: false },
      margin: '0 0 6px 0'
    },
    tooltip: {
      show: true,
      color: '#1A1A1Aff',
      backgroundColor: '#FFFFFFff',
      fontSize: 14,
      customFormat: null,
      borderRadius: 4,
      borderColor: '#e1e5e8',
      borderWidth: 1,
      backgroundOpacity: 30,
      position: 'center',
      offsetY: 24,
      smooth: true,
      backdropFilter: true,
      smoothForce: 0.18,
      smoothSnapThreshold: 0.25
    }
  }
});

// Watch pour mettre à jour dynamiquement le titre si la prop change
watch(
  () => props.title,
  (newTitle) => {
    config.value.style.title.text = newTitle;
  },
  { immediate: true }
);

</script>

<template>
  <div :style="{ width: '600px' }">
    <VueUiSparkStackbar
      :config="config"
      :dataset="dataset"
    />
  </div>
</template>
