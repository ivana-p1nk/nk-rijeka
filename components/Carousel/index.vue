
<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import { Autoplay, Pagination } from 'swiper/modules';

    const modules = [Autoplay, Pagination];

    import type { IProduct } from '~/types/product';

    const props = defineProps<{
        products: IProduct[];
    }>();
</script>

<template>
    <div class="relative">
        <Swiper
            :slidesPerView="4"
            :spaceBetween="10"
            :loop="false"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: true,
            }"
            :pagination="{
                clickable: true,
            }"
            :modules="modules"
        >
            <SwiperSlide v-for="item in props.products" :key="item.id">
                <ProductCard :product="item" class="pt-6" />
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style>
    .swiper-initialized {
        padding-bottom: 3rem;
    }
    .swiper-pagination-bullet-active {
        background-color: #013958 !important;
    }
</style>