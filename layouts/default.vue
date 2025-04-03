
<script setup>
import { useError } from '#app'
import ErrorPage from '~/error.vue' 
import { _white } from '#tailwind-config/theme/accentColor';
import { ref, computed, toValue } from 'vue'
import { useCartStore } from '~/composables/useCart';

import Footer from '~/components/footer.vue'
import Header from '~/components/header.vue'

const cartStore = useCartStore();

</script>


<template>
    <Header />
    <template v-if="error">
      <ErrorPage :error="error" />
    </template>
    <template v-else>
      <slot />
    </template>
    <Footer />
  </template>

