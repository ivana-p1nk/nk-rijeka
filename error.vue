
<template>
  <Header />
  <div class="bg-goal flex flex-col justify-center items-center visina h-screen">
    <!--<p classs="mt-7"> {{ error.message }}</p>-->
    <h1 class="font-saira font-medium text-h1-normal text-blue-900">Stranica nije pronađena</h1>
    <p class="font-roboto font-normal text-body1 text-gray-900 py-7">Sadržaj koji ste tražili ne postoji</p>
    <div class="flex flex-row justify-center gap-2">
      <button @click="goBack" class="uppercase btn-secondary medium">
        Povratak
      </button>
      <NuxtLink to="/" class="uppercase btn-secondary medium">
        Naslovna
      </NuxtLink>
    </div>
  </div>
  <Footer />
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import Footer from '~/components/footer.vue'
import Header from '~/components/header.vue'

defineProps<{ error: { statusCode: number } }>()

const router = useRouter()

const goBack = () => {
  router.back()
}


</script>


<style scoped>
  .bg-goal {
    background-image: url('/assets/images/backgrounds/bg-goal.jpg');
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
  }

  .visina {max-height:60vh;}


</style>
