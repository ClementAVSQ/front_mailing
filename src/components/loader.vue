<script>
export default {
    name: "loader",
    data() {
        return {
            isLoading: true
        }
    }
}
</script>

<template>
    <div class="loader-container">
        <div class="rotating-square"></div>
    </div>
</template>

<style scoped>
    .loader-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        background-color: rgba(0, 0, 0, 0.1);
    }

    .rotating-square {
        width: 60px;
        height: 60px;
        background-color: #3498db;
        border-radius: 4px;
        animation: rotate 3s linear infinite;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>

