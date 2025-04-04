<script setup>
  import ErrorPage from '~/error.vue' 
  import { _white } from '#tailwind-config/theme/accentColor';
  import { ref, computed, toValue } from 'vue'
  import { useCartStore } from '~/composables/useCart';

  import Footer from '~/components/Footer.vue';

  const cartStore = useCartStore();
</script>


<template>
  <HeaderDesktop />
  <HeaderMobile />

  <template v-if="error">
    <ErrorPage :error="error" />
  </template>
  <template v-else>
    <slot />
  </template>
  
  <Footer />
</template>

