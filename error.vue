
<template>
  <div class="bg-goal flex flex-col items-center justify-center h-screen">
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
</template>


  
<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

    defineProps(['error'])

    const goBack = () => {
    router.back()
  }

 //const handleClearError = () => clearError({ redirect: '/'})

</script>

<style scoped>
  .bg-goal::before {
    position: absolute;
    content: url('/assets/images/bg-gol.png');
    left: 50%; 
    top: 0;
    transform: translateX(-50%);
    z-index:-1;
  }
</style>