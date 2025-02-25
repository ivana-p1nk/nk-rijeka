<template>
    <div class="card text-center">
        <div class="flex flex-row justify-between">
            <p><Icon name="material-symbols:favorite-outline" class="icon-small text-gray-900" /></p>
            <p id="tag" class="tags bg-blue-300 font-saira font-bold text-label1 text-white px-3 p1-1 radius rounded-lg">NOVO</p>
        </div>
     
        <img :src="product.image" alt="product thumb" class="thumb">
        <p class="font-bold text-grey-500 m-4 truncate">{{ product.title }}</p>
        <p class="text-sm text-gray-500">Kategorija: <span class="font-semibold">{{ product.category }}</span></p>
        <p class="font-bold text-grey-500 m-4 truncate">{{ product.price }} €</p>
        <p class="font-bold text-grey-500 m-4 truncate">{{ product.price }} €</p>
        <p class="font-bold text-grey-500 m-4 truncate">INFO</p>
        <!--
        <NuxtLink :to="`/products/${product.id}`">
            <p class="btn my-4">View Details</p>
        </NuxtLink>
        -->
    </div>

    <p class="text-center font-bold mt-2">{{ product.title }}</p>
</template>

<script setup>
const { product } = defineProps(['product'])
</script>


<style scoped>

.thumb{
    max-height: 120px;
    max-width: 70%;
    margin:0 auto;
}


</style>




