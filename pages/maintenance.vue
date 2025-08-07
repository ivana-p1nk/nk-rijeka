<script setup lang="ts">
definePageMeta({
    layout: false,
})

useSeoMeta({
    title: 'Održavanje u tijeku',
})
</script>

<template>
    <div class="maintenance">
        <img
            title="HNK Rijeka Web Shop"
            alt="HNK Rijeka Web Shop"
            src="https://staging.shop.nk-rijeka.hr/wp-content/uploads/2021/08/logo-blue.svg"
            class="logo"
        />

        <h1 class="text-2xl font-bold font-oswald text-blue-900 mt-4">Tehničko održavanje u tijeku</h1>
    </div>
</template>

<style scoped>
.maintenance {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
}
</style>
