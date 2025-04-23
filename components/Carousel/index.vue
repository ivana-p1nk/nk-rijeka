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
            :slidesPerView="1"
            :breakpoints="{
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
            }"
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
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal {
        bottom: var(--swiper-pagination-bottom, -5px);
    }

    .swiper.swiper-initialized.swiper-horizontal {
        padding-bottom: 30px;
    }
</style>