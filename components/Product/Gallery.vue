<template>
    <div v-if="product.gallery.length > 1" class="relative">
      <Swiper
        :slidesPerView="1"
        :spaceBetween="10"
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: true,
        }"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
      >
        <SwiperSlide v-for="(image, index) in product.gallery" :key="index">
          <img :src="image" alt="product img" class="mx-auto my-7" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-else>
      <img :src="product.gallery[0]" alt="product img" class="mx-auto my-7" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import { Autoplay, Pagination } from 'swiper/modules';
  
  const modules = [Autoplay, Pagination];
  
  import type { IProduct } from '~/types/product';
  
  const props = defineProps<{
    product: IProduct;
  }>();
  </script>
  

  