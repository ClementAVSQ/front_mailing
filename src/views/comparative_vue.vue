<script setup>
import data_campagn from '../components/data_campaign_mini.vue';
import { RouterLink } from 'vue-router';    
</script>

<template>
  <routerLink to="/">
    <button> retour</button>
  </routerLink>
  <div id="content">
    <data_campagn />
    <data_campagn />
  </div>
</template>

<style scoped>
button{
    margin-top: 20px;
    margin-left: 20px;
    width: 100px;
    height: 30px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
#content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 20px;
}
</style>
