<script setup>
import { ref } from "vue";
import { VueUiCarouselTable } from "vue-data-ui";
import "vue-data-ui/style.css"; // If you are using multiple components, place this style import in your main
const props = defineProps({
    dataset: {
        type: Array,
        default: () => []
    },
    title: {
        type: String,
        default: "super titre"
    }
})
const config = ref({ "responsiveBreakpoint": 500, "userOptions": { "show": true, "showOnChartHover": false, "keepStateOnChartLeave": true, "position": "right", "buttons": { "tooltip": false, "pdf": true, "csv": true, "img": true, "table": false, "labels": false, "fullscreen": true, "sort": false, "stack": false, "animation": true }, "buttonTitles": { "open": "Open options", "close": "Close options", "pdf": "Download PDF", "csv": "Download CSV", "img": "Download PNG", "fullscreen": "Toggle fullscreen", "animation": "Toggle animation" }, "print": { "scale": 2, "orientation": "auto", "overflowTolerance": 0.2 } }, "animation": { "type": "scroll", "use": true, "speedMs": 1000, "pauseOnHover": true }, "style": { "backgroundColor": "#FFFFFF", "color": "#2D353C", "fontFamily": "inherit" }, "border": { "size": 0, "color": "#2D353C" }, "scrollbar": { "showOnlyOnHover": false, "hide": false }, "caption": { "text": props.title, "padding": { "top": 12, "right": 12, "bottom": 12, "left": 12 }, "style": { "backgroundColor": "#FFFFFF", "color": "#2D353C", "fontSize": "20px", "fontWeight": "bold", "textAlign": "left" } }, "thead": { "style": { "verticalAlign": "middle" }, "tr": { "height": 32, "border": { "size": 0, "color": "#2D353C" }, "style": { "backgroundColor": "#FFFFFF", "color": "#2D353C", "boxShadow": "0px 6px 12px -6px #2D353C50" }, "th": { "border": { "size": 0, "color": "#2D353C" }, "padding": { "top": 0, "right": 12, "bottom": 0, "left": 0 }, "style": { "borderSpacing": 0, "border": "none", "textAlign": "right", "fontVariantNumeric": "tabular-nums" } } } }, "tbody": { "backgroundColor": "#FFFFFF", "tr": { "visible": 5, "height": 50, "border": { "size": 0, "color": "#2D353C" }, "style": { "backgroundColor": "#FFFFFF", "color": "#2D353C" }, "td": { "alternateColor": true, "alternateOpacity": 0.5, "border": { "size": 0, "color": "#2D353C" }, "padding": { "top": 0, "right": 12, "bottom": 0, "left": 0 }, "style": { "fontVariantNumeric": "tabular-nums", "textAlign": "right", "backgroundColor": "#e1e5e8" } } } } })

</script>
<template>
  <!-- Using a wrapper is optional -->
  <div :style="{ width: '1200px', justifySelf: 'end', marginBottom: '50px' }">
    <VueUiCarouselTable
      :config="config"
      :dataset="props.dataset"
    />
  </div>
</template>