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
    const config = useRuntimeConfig();

    const { id } = useRoute().params
    const uri = `${config.public.url}/products/${id}`

    //fetch the product
    const { data: product, error } = await useFetch(uri) 



    definePageMeta({
        layout: 'products'
    })
</script>

<style scoped>

</style>