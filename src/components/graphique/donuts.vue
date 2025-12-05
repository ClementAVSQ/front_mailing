<script setup>
import { ref, computed } from "vue";
import { VueUiDonut } from "vue-data-ui";
import "vue-data-ui/style.css"; // If you are using multiple components, place this style import in your main

const config = ref({
    table: {
        th: {
            backgroundColor: '#FFFFFF',
            color: '#1A1A1A'
        },
        td: {
            backgroundColor: '#FFFFFF',
            color: '#1A1A1A'
        }
    },
    style: {
        chart: {
            backgroundColor: '#FFFFFF',
            color: '#1A1A1A',
            legend: {
                backgroundColor: '#FFFFFF',
                color: '#1A1A1A'
            },
            tooltip: {
                backgroundColor: '#FFFFFF',
                color: '#1A1A1A',
                showPercentage: true,
                borderColor: '#CCCCCC',
                backgroundOpacity: 70
            },
            title: {
                text: 'Title',
                color: '#1A1A1A',
                textAlign: 'left',
                paddingLeft: 24,
                subtitle: {
                    text: 'Subtitle'
                }
            },
            layout: {
                curvedMarkers: true,
                donut: {
                    strokeWidth: 40
                },
                labels: {
                    percentage: {
                        color: '#1A1A1A'
                    },
                    name: {
                        color: '#6A6A6A'
                    },
                    hollow: {
                        show: false,
                        average: {
                            show: false
                        },
                        total: {
                            show: true,
                            text: '',
                            value: {
                                color: '#1A1A1A',
                                offsetY: 4,
                                fontSize: 64
                            }
                        }
                    }
                }
            },
            useGradient: false
        }
    }
});

const props = defineProps({
    dataset: {
        type: Array,
        default: () => ([
            { name: 'Series 1', values: [100] },
            { name: 'Series 2', values: [50] },
            { name: 'Series 3', values: [25] },
            { name: 'Series 4', values: [12.5] }
        ])
    },
    title: {
        type: String,
        default: 'Title'
    },
    subtitle: {
        type: String,
        default: 'Subtitle'
    }
});

const dynamicConfig = computed(() => ({
    ...config.value,
    style: {
        ...config.value.style,
        chart: {
            ...config.value.style.chart,
            title: {
                ...config.value.style.chart.title,
                text: props.title,
                subtitle: {
                    ...config.value.style.chart.title.subtitle,
                    text: props.subtitle
                }
            }
        }
    }
}));

const dataset = computed(() => props.dataset);

</script>
<template>
    <div :style="{ width: '700px' }" id="position">
        <VueUiDonut :config="dynamicConfig" :dataset="dataset">
            <!-- SLOTS -->

        </VueUiDonut>
    </div>
</template>
<style scoped>
#position {
    margin-top: 100px;
}
</style>