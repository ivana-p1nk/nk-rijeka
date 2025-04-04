
<script setup>
import { useError } from '#app'
import ErrorPage from '~/error.vue' 
import { _white } from '#tailwind-config/theme/accentColor';
import { ref, computed, toValue } from 'vue'
import { useCartStore } from '~/composables/useCart';

import Footer from '~/components/Footer.vue'
import HeaderDesktop from '~/components/Header/Desktop.vue'
import HeaderMobile from '~/components/Header/Mobile.vue'

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

