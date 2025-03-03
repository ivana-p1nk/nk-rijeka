<script setup>
import { _white } from '#tailwind-config/theme/accentColor';
import { computed, ref } from 'vue'


const activeTab = ref('') 

const setActive = (tab) => {
  activeTab.value = activeTab.value === tab ? '' : tab 
}

// Simulacija ulogiranog korisnika
const isLoggedIn = ref(true);  
const userName = ref('Ivana');  

const dropdownItems = computed(() => {
  if (isLoggedIn.value) {
    return [
      [{
        custom: `<span class="font-semibold text-gray-700">Pozdrav ${userName.value}</span>`,  
        class: 'px-4 py-2'
      }],
      [{
        label: 'Narudžbe',
        to: '/moj-racun',
        icon: 'iconify i-akar-icons:search' 
      }],
      [{
        label: 'Detalji profila',
        to: '/profil',
        icon: 'iconify i-akar-icons:search' 
      }],
      [{
        label: 'Odjava',
        to: '/odjava',
        icon: 'lucide:log-in' 
      }]
    ];
  } else {
    return [
      [{
        label: 'Prijavi se',
        to: '/prijava',
         class: 'btn-primary uppercase'
       
      }],
      [{
        custom: '<span class="font-roboto font-body3 text-white">Nemaš račun?</span> <a href="/registracija" class="uppercase font-roboto font-body3 mr-4 underline text-blue-100">Registriraj se!</a>',
      }]
    ];
  }
});


</script>

<template>
<div>
 
    <!-- HEADER -->
    <header class="container mx-auto bg-customColors-100 rounded-[40px] z-1 relative mt-11">
      <nav>
        <div class="p-5 flex-between rounded-[40px] bg-header-gradient">
            <NuxtLink to="/" class="ml-3"><img src="/assets/images/logos/logo.svg" alt="Logo"></NuxtLink>
            
            <!--navigacija-->
            <div>
                <ul class="flex gap-10">
                    <li class="heading">
                        <NuxtLink to="#" @click.prevent="setActive('dresovi')" class="flex items-center gap-2 group">
                            <span :class="activeTab === 'dresovi' ? 'text-blue-500' : ''">DRESOVI</span>
                            <Icon :name="activeTab === 'dresovi' ? 'mdi:chevron-up' : 'mdi:chevron-down'" :class="[ activeTab === 'dresovi' ? 'text-blue-500' : 'text-white', 'icon-link']" />
                        </NuxtLink>
                    </li>
                    <li class="heading">
                        <NuxtLink to="#" @click.prevent="setActive('odjeca')" class="flex items-center gap-2 group">
                            <span :class="activeTab === 'odjeca' ? 'text-blue-500' : ''">ODJEĆA</span>
                            <Icon :name="activeTab === 'odjeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" :class="[ activeTab === 'odjeca' ? 'text-blue-500' : 'text-white', 'icon-link']" />
                        </NuxtLink>
                    </li>
                    <li class="heading">
                        <NuxtLink to="#" @click.prevent="setActive('kolekcije')" class="flex items-center gap-2 group">
                            <span :class="activeTab === 'kolekcije' ? 'text-blue-500' : ''">KOLEKCIJE</span>
                            <Icon :name="activeTab === 'kolekcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" :class="[ activeTab === 'kolekcije' ? 'text-blue-500' : 'text-white', 'icon-link']" />
                        </NuxtLink>
                    </li>
                    <li class="heading">
                        <NuxtLink to="#" @click.prevent="setActive('pokloni')" class="flex items-center gap-2 group">
                            <span :class="activeTab === 'pokloni' ? 'text-blue-500' : ''">POKLONI</span>
                            <Icon :name="activeTab === 'pokloni' ? 'mdi:chevron-up' : 'mdi:chevron-down'" :class="[ activeTab === 'pokloni' ? 'text-blue-500' : 'text-white', 'icon-link']" />
                        </NuxtLink>
                    </li>
                    <li class="heading">
                        <NuxtLink to="#" @click.prevent="setActive('akcije')" class="flex items-center gap-2 group">
                            <span :class="activeTab === 'akcije' ? 'text-blue-500' : ''">AKCIJE</span>
                            <Icon :name="activeTab === 'akcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" :class="[ activeTab === 'akcije' ? 'text-blue-500' : 'text-white', 'icon-link']" />
                        </NuxtLink>
                    </li>

                </ul>
            </div>

            <div class="flex flex-row gap-7">
                <div class="flex-between flex-row gap-4">
                    <NuxtLink to="#">  <Icon name="akar-icons:search" class="text-white link" /></NuxtLink>
                    <NuxtLink to="#"> <Icon name="line-md:heart" class="text-white link" /></NuxtLink>
                    <UDropdown
                        :items="dropdownItems"
                        :popper="{ placement: 'bottom-start' }"
                        class="custom-dropdown"
                        :ui="{
                            width: 'w-[245px]',
                            background: 'bg-header-gradient dark:bg-header-gradient', 
                        }">
                        <UButton color="white" trailing-icon="tdesign:user-circle" />
                        <!-- Stavke dropdowna -->
                        <template #item="{ item }">
                        <div>
                            <span v-if="item.custom" v-html="item.custom"></span>
                            <span v-else>
                            <span v-if="item.icon" class="mr-2">
                                <i :class="item.icon"></i>
                            </span>
                            {{ item.label }}
                            </span>
                        </div>
                        </template>
                    </UDropdown>
                </div>
                <div class="text-white bg-blue-500 rounded-3xl flex-between gap-2 py-1 px-3">
                    <p class="header-text hover:text-white">0,00 €</p>
                    <Icon name="ci:shopping-cart-01" class="text-white" />
                </div>
            </div>

        </div>
        
        <!-- Dropdown sekcija za navigaciju -->
        <div v-if="activeTab" class="max-w-[575px] mx-auto pt-7 pb-12 border-t border-customColors-200">
            <div v-show="activeTab === 'dresovi'" class="flex gap-4" id="dresovi">
                <ul class="flex flex-col gap-3">
                    <li class="heading-sub"><NuxtLink to="#">2024./2025.</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">2023./2024.</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">Starije sezone</NuxtLink></li>
                </ul>
            </div>

            <div v-show="activeTab === 'odjeca'" class="flex gap-4 justify-between" id="odjeca">
                <div class="basis-1/4">
                    <h5 class="heading-subtitle pb-4">MUŠKARCI</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Hoodice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="heading-subtitle pb-4">ŽENE</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Hoodice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="heading-subtitle pb-4">DJECA</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Hoodice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="heading-subtitle pb-4">MODNI DODACI</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Kape</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Šalovi</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                    </ul>
                </div>
            </div>


            <div v-show="activeTab === 'kolekcije'" class="flex gap-4 justify-between" id="kolekcije">
                <div class="basis-1/4">
                    <h5 class="heading-subtitle pb-4">JOMA</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Hlače</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Majice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Trenerke</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Jakne</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Lopte</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="heading-subtitle pb-4">NOVE HOODICE</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Muškarci</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Žene</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Djeca</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="heading-subtitle pb-4">FORZA FIUME PREMIUM</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Pogledaj kolekciju</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="heading-subtitle pb-4">ZIGMAN & HNK RIJEKA</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Pogledaj kolekciju</NuxtLink></li>
                    </ul>
                </div>
            </div>


            <div v-show="activeTab === 'pokloni'" class="flex gap-4" id="pokloni">
                <ul class="flex flex-col gap-3">
                    <li class="heading-sub"><NuxtLink to="#">Školski asortiman</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">Kućni asortiman</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">Privjesci</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">Zastave</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">Čestitke</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                </ul>
            </div>

            <div v-show="activeTab === 'akcije'" class="flex gap-4" id="akcije">
                <ul class="flex flex-col gap-3">
                    <li class="heading-sub"><NuxtLink to="#">Dresovi</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">JOMA</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                </ul>
            </div>
        </div>

               
     </nav>
    </header>

        <!-- Page content -->
        <div>
            <slot />
        </div>



        <!-- FOOTER -->
        <footer
            class="mx-auto bg-cover bg-top bg-[linear-gradient(180deg,rgba(0,25,38,0)_30%,rgba(0,25,38,0.4)_60%,rgba(0,25,38,1)_95%),url(/assets/images/Footer-bg-2.jpg)]">

            <div class="pt-32 frame-p">

                <!--postani član -->
                <div
                    class="iskaznice relative mx-auto max-w-[830px] p-10 bg-[rgba(252,252,252,0.4)] rounded-2xl  max-xl:max-w-[700px]">
                    <div
                        class="grid justify-end grid-cols-[190px_358px_150px] gap-4 max-xl:flex max-xl:flex-col max-xl:items-center">
                        <div class="col-span-1">
                            <h4 class="font-saira font-semibold text-blue-600 text-h4-normal uppercase mb-2 text-right max-xl:pt-14">
                                Postani član</h4>
                        </div>

                        <div class="col-span-1">
                            <p class="font-roboto font-normal text-body2 text-blue-900 max-xl:text-center">Učlani se u
                                klub i ostvari popuste u našem WEB SHOPU i FAN SHOPU, na kupnju ulaznica te na proizvode
                                i usluge naših partnera.</p>
                        </div>

                        <div class="col-span-1">
                            <NuxtLink to="#" target="_blank" rel="noopener noreferrer"
                                class="inline-block  btn-secondary large uppercase">Registriraj se</NuxtLink>
                        </div>
                    </div>
                </div>

                <!--slogan -->
                <div
                    class="flex flex-col content-center justify-center items-center pb-28 pt-28 max-2xl:pt-8 max-2xl:pb-8 max-xl:pt-8 max-xl:pb-8">
                    <img src="/assets/images/Slogan.png" class="pb-4 sm:pb-8">
                    <a href="https://nk-rijeka.hr/" target="_blank" rel="noopener noreferrer"
                        class="font-saira font-semibold text-h4-normal text-blue-50 link">nk-rijeka.hr</a>
                </div>

                <!-- footer meni  -->
                <div
                    class="mx-auto max-w-[1480px] grid grid-cols-1 text-center sm:text-left sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
                    <!-- Logo element -->
                    <div
                        class="flex justify-center items-start sm:col-span-full lg:col-span-full 2xl:col-span-1 pb-0 sm:pb-5">
                        <img class="w-full max-w-[108px]" src="~/assets/images/hnk-rijeka-grb.svg"
                            alt="HNK Rijeka Grb" />
                    </div>

                    <!-- Društvene mreže -->
                    <div>
                        <h6 class="footer-title pt-3 sm:pt-0">Društvene mreže</h6>
                        <p class="footer-text mb-4">Budi dio HNK Rijeka zajednice na društvenim mrežama</p>
                        <ul class="inline-flex gap-2">
                            <li>
                                <a class="circle-footer" href="https://www.facebook.com/nk.rijeka" target="_blank">
                                    <Icon name="brandico:facebook" class="custom-blue" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-footer" href="https://www.youtube.com/user/hnkrijekasluzbeni"
                                    target="_blank">
                                    <Icon name="mdi:youtube" class="custom-blue" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-footer" href="https://www.tiktok.com/@hnkrijeka" target="_blank">
                                    <Icon name="famicons:logo-tiktok" class="custom-blue" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-footer" href="https://www.instagram.com/nk_rijeka" target="_blank">
                                    <Icon name="hugeicons:instagram" class="custom-blue" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-footer" href="https://x.com/nkrijeka?mx=2" target="_blank">
                                    <Icon name="garden:twitter-stroke-12" class="custom-blue" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- O nama -->
                    <div class="ml-10 max-lg:ml-0">
                        <h6 class="footer-title pt-3 sm:pt-0">O nama</h6>
                        <p class="footer-text mb-4 link">
                            <NuxtLink to="#">Kontakt</NuxtLink>
                        </p>
                        <p class="footer-text link">
                            <NuxtLink to="#">Fan Shop HNK Rijeka</NuxtLink>
                        </p>
                    </div>

                    <!-- Korisničke usluge -->
                    <div>
                        <h6 class="footer-title pt-3 sm:pt-0">Korisničke usluge</h6>
                        <p class="footer-text link mb-4">
                            <NuxtLink to="#">Dostava unutar RH</NuxtLink>
                        </p>
                        <p class="footer-text link">
                            <NuxtLink to="#">Međunarodna dostava</NuxtLink>
                        </p>
                    </div>

                    <!-- Uvjeti korištenja -->
                    <div>
                        <h6 class="footer-title pt-3 sm:pt-0">Uvjeti korištenja</h6>
                        <p class="footer-text link mb-4">
                            <NuxtLink to="#">Način plaćanja</NuxtLink>
                        </p>
                        <p class="footer-text link mb-4">
                            <NuxtLink to="#">Opći uvjeti kupnje</NuxtLink>
                        </p>
                        <p class="footer-text link mb-4">
                            <NuxtLink to="#">Zaštita podataka</NuxtLink>
                        </p>
                        <p class="footer-text link">
                            <NuxtLink to="#">Politika o kolačićima</NuxtLink>
                        </p>
                    </div>

                    <!-- Newsletter -->
                    <div>
                        <h6 class="footer-title pt-3 sm:pt-0">Newsletter</h6>
                        <p class="footer-text">
                            Doznaj prvi sve vijesti i promocije u svom inboxu
                        </p>
                    </div>
                </div>

                <!--cards-->
                <div class="mx-auto max-w-[825px] flex flex-wrap items-center justify-center gap-2 py-14">
                    <img class="pr-3" src="~/assets/images/logos/mastercard-id.png" alt="Mastercard ID Check Logo" />
                    <img class="pr-3" src="~/assets/images/logos/visa-secure.png" alt="Visa Secure Logo" />
                    <img class="pr-3" src="~/assets/images/logos/american.png" alt="American Express Logo" />
                    <img class="pr-3" src="~/assets/images/logos/diners.png" alt="Diners Club Logo" />
                    <img class="pr-3" src="~/assets/images/logos/visa.png" alt="Visa Logo" />
                    <img class="pr-3" src="~/assets/images/logos/mastercard.png" alt="MasterCard Logo" />
                    <img class="pr-3" src="~/assets/images/logos/maestro.png" alt="Maestro Logo" />
                    <img class="pr-3" src="~/assets/images/logos/discover.png" alt="Discover Network Logo" />
                    <img class="pr-3" src="~/assets/images/logos/dina.png" alt="DinaCard Logo" />
                    <img class="pr-3" src="~/assets/images/logos/wspay.png" alt="WS Pay Logo" />
                </div>

            </div>
            

            <div
                class="mx-auto p-6 flex flex-col-reverse gap-5 sm:flex-row sm:gap-0 items-center justify-between border-t border-blue-800">
                <div class="text-blue-400 text-roboto text-body4 font-normal">
                    Copyright © {{ new Date().getFullYear() }} HNK Rijeka
                </div>
                <div class="text-blue-400 text-roboto text-body4 font-normal">
                    Design and development by:
                    <a href="https://prospekt.hr" target="_blank" rel="noopener noreferrer"
                        class="text-white font-bold hover:underline">Prospekt</a>
                </div>
            </div>

        </footer>
    </div>
</template>

<style scoped>
.custom-dropdown .headlessui-menu-items {
  padding: 1.5rem; /* Dodaje padding samo na okvir dropdowna, a ne na stavke */
}
</style>