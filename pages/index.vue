<template>
    <div class="px-4 pt-96 pb-74 bg-home1 bg-auto bg-no-repeat bg-top mt-[-125px] bg-players">
        <div class="container max-w-[1120px] mx-auto">
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
    <div class="container max-w-[1120px] mx-auto">
        
    </div>

</template>


<script setup>
   
</script>

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

    .bg-players[data-v-02281a80]::after {
        position: absolute;
        content: url('/assets/images/players-home.png');
        right: 10%;
        top: 21%;
        z-index: 0;
    }

</style>