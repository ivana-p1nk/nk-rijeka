<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/productCard.vue'

const items = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data = await response.json()

    // zadnjih 8 proizvoda
    items.value = data.slice(-8)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
    <div class="px-4 pt-96 pb-74 bg-home1 bg-auto bg-no-repeat bg-top mt-[-125px] bg-players">
        <div class="max-w-[1120px] mx-auto relative">
            <div class="w-1/2">
                <h1 class="font-saira font-bold text-h1-display text-neutralBlue-950">POGLEDAJ NOVE DRESOVE</h1>
                <p class="font-roboto font-normal text-body1 text-gray-900 mt-2 mb-6">Prepoznatljiv dizajnerski potpis Juraja Zigmana <br>ponovno donosi svježinu i inovaciju našim dresovima.</p>
                <NuxtLink to="#" class="btn-primary large uppercase">Kupi sad</NuxtLink>
            </div>
            <div class="grid grid-cols-3 gap-6 pt-52 relative z-10">
                <NuxtLink
                to="#"
                class="group relative bg-dresovi bg-cover bg-center rounded-lg h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4"> 
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></div>   
                    <p class="font-saira text-h6-normal font-bold text-blue-300 relative">DRESOVI</p>
                    <h2 class="font-saira text-h3-normal font-bold text-white relative">2024./25.</h2>
                </NuxtLink>
            
                <NuxtLink
                to="#"
                class="group relative bg-odjeca bg-cover bg-center rounded-lg h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></div>
                    <p class="font-saira text-h6-normal font-bold text-blue-300 relative">ODJEĆA</p>
                    <h2 class="font-saira text-h3-normal font-bold text-white relative">NOVE HUDICE</h2>
                </NuxtLink>
            
                <NuxtLink
                    to="#"
                    class="group relative bg-pokloni bg-cover bg-center rounded-lg h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4">  
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></div>
                        <p class="font-saira text-h6-normal font-bold text-blue-300 relative">POKLONI</p>
                        <h2 class="font-saira text-h3-normal font-bold text-white relative">ŠKOLSKI ASORTIMAN</h2>
                </NuxtLink>
            </div>
        </div>
        
    </div>

    <!-- Vertikalni divider -->
    <div class="w-px h-14 bg-blue-700 mx-auto my-20 bg-home2 relative"></div>

    <div class="container mx-auto">
        <div class="flex flex-col gap-1 items-center pb-10">
            <h1 class="font-saira font-bold text-h2-normal text-blue-900 uppercase">BESTSELLERI</h1>
            <p class="font-roboto font-normal text-body1 text-blue-900">Počasti se novim dresom, odabri atraktivan <br>poklon, ne propusti promotivne cijene...</p>
        </div>
        <p>Primjer slidera</p>
        
        <UCarousel 
            v-slot="{ item }"
            loop
            arrows
            indicators 
            :autoplay="{ delay: 2000 }"
            :items="items"
            :ui="{ item: 'basis-1/4' }" >
            <ProductCard :product="item" class="pt-6" />
        </UCarousel>
    </div>

    <div class="container mx-auto my-40 relative">
        <div class="bg-dark-blue-gradient2 p-20 rounded-2xl  max-w-[920px]">
            <h1 class="font-saira font-bold text-h2-display text-blue-50 uppercase mb-2">PERSONALIZIRAJ <br>SVOJ DRES</h1>
            <p class="font-roboto font-normal text-body1 text-white mb-7">Tvoj dres, tvoja pravila. Personaliziraj svoj <br>omiljeni dres i učini ga jedinstvenim.</p>
            <NuxtLink to="/" class="btn-primary small uppercase">Naruči svoj dres</NuxtLink>
        </div>
        <img class="absolute top-[-20%] right-0" src="~/assets/images/dresovi.png" alt="Dresovi" />
    </div>

    <div class="container mx-auto pb-6">
        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row gap-9">
                <h1 class="font-saira font-bold text-h2-normal text-blue-900 uppercase">NOVO U PONUDI</h1>
                <p class="font-roboto font-normal text-body1 text-blue-900">Naš se asortiman stalno proširuje novim <br>atraktivnim artiklima, ovo su samo neki od njih.</p>
            </div>
            <NuxtLink to="/products" class="btn-secondary xs h-fit uppercase">Pogledaj sve</NuxtLink>
        </div>
        <p>Primjer slidera</p>             
        
        <UCarousel 
            v-slot="{ item }"
            loop
            arrows
            indicators 
            :autoplay="{ delay: 2000 }"
            :items="items"
            :ui="{ item: 'basis-1/4' }" >
            <ProductCard :product="item" class="pt-6" />
        </UCarousel>
    </div>

</template>

<style scoped>
    .bg-dresovi {
    background-image: url('/assets/images/bg-dresovi.png');
    }
    .bg-odjeca {
    background-image: url('/assets/images/bg-hoodice.png');
    }
    .bg-pokloni {
    background-image: url('/assets/images/bg-skolski-pribor.png');
    }

    .bg-home1 {
    background-image: url('/assets/images/bg-home1.png');
    }

    .bg-home2::before { 
        position: absolute;
        content: url('/assets/images/bg-home2.jpg');
        left: 50%;
        top: -200%;
        transform: translateX(-50%);
        z-index: -1;
    }
    

    .bg-players::after {
        position: absolute;
        content: url('/assets/images/players-home.png');
        right: 9%;
        top: 20%;
        z-index: 0;
    }

</style>