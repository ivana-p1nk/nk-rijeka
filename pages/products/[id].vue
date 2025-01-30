<template>
    <div>
        <p> Product details for {{id}}</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Dicta quis tempore voluptatem maiores, in possimus odit mollitia quas doloremque,
        est voluptatum eveniet unde. Repellat et placeat unde quisquam architecto distinctio!</p>
    </div>
</template>

<script setup>
    const { id } = useRoute().params

    definePageMeta({
        layout: 'products'
    })
</script>

<style scoped>

</style>