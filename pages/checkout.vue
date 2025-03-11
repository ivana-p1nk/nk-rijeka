<script setup lang="ts">
    useSeoMeta({
        title: "Checkout Page",
    });

    definePageMeta({
        middleware: 'sanctum:auth',
    })
</script>

<template>
    <div class="container py-40 mx-auto">
        <CheckoutArea />
    </div>
</template>