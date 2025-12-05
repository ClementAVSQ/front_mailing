<script setup>
import { ref, computed } from "vue";
import { defineProps } from 'vue';
import { VueUiHorizontalBar } from "vue-data-ui";
import "vue-data-ui/style.css"; // If you are using multiple components, place this style import in your main

const config = ref({
        debug: false,
        loading: false,
        autoSize: true,
        responsive: false,
        theme: '',
        customPalette: [],
        useCssAnimation: true,
        events: {
            datapointEnter: null,
            datapointLeave: null,
            datapointClick: null
        },
        style: {
            fontFamily: 'inherit',
            chart: {
                backgroundColor: '#FFFFFFff',
                color: '#1A1A1Aff',
                width: 600,
                height: 150,
                layout: {
                    bars: {
                        sort: 'desc',
                        useStroke: true,
                        strokeWidth: 2,
                        height: 32,
                        gap: 10,
                        borderRadius: 4,
                        offsetX: 12,
                        paddingRight: 0,
                        useGradient: true,
                        gradientIntensity: 20,
                        fillOpacity: 90,
                        underlayerColor: 'rgba(255, 255, 255, 1)',
                        dataLabels: {
                            color: '#1A1A1Aff',
                            bold: true,
                            fontSize: 12,
                            value: {
                                show: true,
                                roundingValue: 0,
                                prefix: '',
                                suffix: '',
                                formatter: null
                            },
                            percentage: {
                                show: true,
                                roundingPercentage: 0
                            },
                            offsetX: 0
                        },
                        nameLabels: {
                            show: true,
                            color: '#1A1A1Aff',
                            bold: false,
                            fontSize: 10,
                            offsetX: 0
                        },
                        parentLabels: {
                            show: true,
                            color: '#1A1A1Aff',
                            bold: false,
                            fontSize: 10,
                            offsetX: 0
                        }
                    },
                    highlighter: {
                        color: '#1A1A1Aff',
                        opacity: 5
                    },
                    separators: {
                        show: true,
                        color: '#e1e5e8ff',
                        strokeWidth: 1,
                        fullWidth: true
                    }
                },
                title: {
                    text: 'Title',
                    color: '#1A1A1Aff',
                    fontSize: 20,
                    bold: true,
                    textAlign: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
                    subtitle: {
                        color: '#A1A1A1ff',
                        text: '',
                        fontSize: 16,
                        bold: false
                    }
                },
                legend: {
                    show: true,
                    bold: true,
                    backgroundColor: '#FFFFFFff',
                    color: '#1A1A1Aff',
                    fontSize: 14,
                    position: 'top',
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: '',
                    suffix: ''
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
                    smoothSnapThreshold: 0.25,
                    showValue: true,
                    showPercentage: true,
                    roundingValue: 0,
                    roundingPercentage: 0,
                    prefix: '',
                    suffix: ''
                }
            }
        },
        userOptions: {
            show: true,
            showOnChartHover: false,
            keepStateOnChartLeave: true,
            position: 'right',
            buttons: {
                tooltip: true,
                pdf: true,
                csv: true,
                img: true,
                table: true,
                labels: false,
                fullscreen: true,
                sort: true,
                stack: false,
                animation: false,
                annotator: true,
                svg: true,
                zoom: false
            },
            callbacks: {
                animation: null,
                annotator: null,
                csv: null,
                fullscreen: null,
                img: null,
                labels: null,
                pdf: null,
                sort: null,
                stack: null,
                table: null,
                tooltip: null,
                svg: null,
                zoom: null
            },
            buttonTitles: {
                open: 'Open options',
                close: 'Close options',
                tooltip: 'Toggle tooltip',
                pdf: 'Download PDF',
                csv: 'Download CSV',
                img: 'Download PNG',
                table: 'Toggle table',
                fullscreen: 'Toggle fullscreen',
                sort: 'Toggle sort',
                annotator: 'Toggle annotator',
                svg: 'Download SVG'
            },
            print: {
                scale: 2,
                orientation: 'auto',
                overflowTolerance: 0.2
            }
        },
        table: {
            show: false,
            responsiveBreakpoint: 400,
            useDialog: false,
            th: {
                backgroundColor: '#FFFFFFff',
                color: '#1A1A1Aff',
                outline: 'none'
            },
            td: {
                backgroundColor: '#FFFFFFff',
                color: '#1A1A1Aff',
                outline: 'none',
                roundingValue: 0,
                roundingPercentage: 0,
                prefix: '',
                suffix: ''
            }
        },
        translations: {
            parentName: 'Group',
            childName: 'Serie',
            value: 'Value',
            percentageToTotal: '% / total',
            percentageToSerie: '% / group'
        }
    });

// accept dataset, title and subtitle as props (with sensible defaults)
const props = defineProps({
    dataset: {
        type: Array,
        default: () => ([
            { name: 'Serie A', value: 55, color: '#1f77b4', children: [] },
            { name: 'Serie B', value: 34, color: '#aec7e8', children: [] },
            { name: 'Serie C', value: 21, color: '#ff7f0e', children: [] },
            { name: 'Serie D', value: 13, color: '#ffbb78', children: [] },
            { name: 'Serie E', value: 8, color: '#2ca02c', children: [] }
        ])
    },
    title: {
        type: String,
        default: 'Title'
    },
    subtitle: {
        type: String,
        default: ''
    }
});

const dataset = computed(() => props.dataset);

// computed config that injects the dynamic title/subtitle into the base config
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

</script>
<template>
    <!-- Using a wrapper is optional -->
    <div :style="{ width: '700px'}" id="position">
        <VueUiHorizontalBar
            :config="dynamicConfig"
            :dataset="dataset"
        />
    </div>
</template>

<style scoped>
    #position {
        margin-top: 100px;
    }
</style>