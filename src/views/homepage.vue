<script setup>
import entreprise from '../components/hompage/entreprise.vue';
import list_contact from '../components/hompage/list_contact.vue';
import campagne from '../components/hompage/campagne.vue';
</script>

<template>
    <div>
        <entreprise />
        <list_contact />
        <div>
            <campagne />
        </div>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        flex-direction: row;
    }

</style>

