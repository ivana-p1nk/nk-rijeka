<script setup lang="ts">
    import { type IProduct } from '@/types/product';

    const config = useRuntimeConfig();

    const { id } = useRoute().params
    const uri = `${config.public.url}/products/${id}`

    //fetch the product
    const { data: product, error } = await useFetch<IProduct>(uri) 

    definePageMeta({
        layout: 'products'
    })
</script>

<template>
    <div v-if="product != null">
        <!--adding custom page meta (second way)-->
        <Head>
            <Title>
                NK Rijeka | {{ product?.title }}
            </Title>
            <Meta name="description" :content="product?.description" />
        </Head>

        <ProductDetails :product />

        <ProductRelated :product />
    </div>
</template>

<style scoped>

</style>