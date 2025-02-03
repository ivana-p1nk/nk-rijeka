<template>
    <div>
        <ProductDetails :product="product"/>
    </div>
</template>

<script setup>
    const { id } = useRoute().params
    const uri = 'https://fakestoreapi.com/products/' + id

    //fetch the product
    const { data: product } = await useFetch(uri, { key: id }) //Since useFetch now uses uri as the key, the extra key: id is no longer needed.

    definePageMeta({
        layout: 'products'
    })
</script>

<style scoped>

</style>