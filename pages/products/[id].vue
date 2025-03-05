<template>
    <div>
        <!--adding custom page meta (second way)-->
        <Head>
            <Title>
                NK Rijeka | {{ product?.title }}
            </Title>
            <Meta name="description" :content="product.description" />
        </Head>

        <ProductDetails :product="product"/>
    </div>
</template>

<script setup>
    const { id } = useRoute().params
    const uri = 'https://nkrijeka-app.laravel.cloud/api/v1/products/${id}'

    //fetch the product
    const { data: product, error } = await useFetch(uri, { key: id }) 

    if(!product.value){
        throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
    }

    definePageMeta({
        layout: 'products'
    })
</script>

<style scoped>

</style>