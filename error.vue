
<template>
  <HeaderDesktop />
  <HeaderMobile />
  
  <div class="flex flex-col items-center justify-center h-screen bg-goal visina">
    <!--<p classs="mt-7"> {{ error.message }}</p>-->
    <h1 class="font-medium text-blue-900 font-saira text-h1-normal">Stranica nije pronađena</h1>
    <p class="font-normal text-gray-900 font-roboto text-body1 py-7">Sadržaj koji ste tražili ne postoji</p>
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
