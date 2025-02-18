<script setup>
import { ref } from 'vue'

const activeTab = ref('') 

const setActive = (tab) => {
  activeTab.value = activeTab.value === tab ? '' : tab 
}
</script>

<template>
  <div>
    <!-- HEADER -->
    <header class="container mx-auto mt-11 bg-header-gradient rounded-[40px]">
      <nav>
        <div class="p-5 flex-between">
            <NuxtLink to="/"><img src="/assets/images/logos/logo.svg" alt="Logo"></NuxtLink>
            
            <!--navigacija-->
            <div class="flex gap-10">
                <NuxtLink to="#" @click.prevent="setActive('dresovi')" class="flex items-center gap-2">
                    DRESOVI <Icon :name="activeTab === 'dresovi' ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="text-white" />
                </NuxtLink>
                   
                <NuxtLink to="#" @click.prevent="setActive('odjeca')" class="flex items-center gap-2">
                    ODJEĆA <Icon :name="activeTab === 'odjeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="text-white" />
                </NuxtLink>
                 
                <NuxtLink to="#" @click.prevent="setActive('kolekcije')" class="flex items-center gap-2">
                    KOLEKCIJE <Icon :name="activeTab === 'kolekcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="text-white" />
                </NuxtLink>
               
                <NuxtLink to="#" @click.prevent="setActive('pokloni')" class="flex items-center gap-2">
                    POKLONI <Icon :name="activeTab === 'pokloni' ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="text-white" />
                </NuxtLink>
              
                <NuxtLink to="#" @click.prevent="setActive('akcije')" class="flex items-center gap-2">
                    AKCIJE <Icon :name="activeTab === 'akcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="text-white" />
                </NuxtLink>
            </div>

            <div class="flex flex-row gap-7">
                <div class="flex-between flex-row gap-4">
                    <Icon name="akar-icons:search" class="text-white link" />
                    <Icon name="line-md:heart" class="text-white link" />
                    <Icon name="tdesign:user-circle" class="text-white link" />
                </div>
                <div class="text-white bg-blue-500 rounded-3xl flex-between gap-2 py-2 px-4">
                    <p class="header-text hover:text-white">0,00 €</p>
                    <Icon name="ci:shopping-cart-01" class="text-white" />
                </div>
            </div>

        </div>
        
        <!-- Dropdown sekcija za navigaciju -->
        <div v-if="activeTab" class="max-w-[550px] mx-auto">
            <div v-show="activeTab === 'dresovi'" class="flex gap-4" id="dresovi">
                <ul>
                    <li><NuxtLink to="/">2024./2025.</NuxtLink></li>
                    <li><NuxtLink to="/">2023./2024.</NuxtLink></li>
                    <li><NuxtLink to="/">Starije sezone</NuxtLink></li>
                </ul>
            </div>

            <div v-show="activeTab === 'odjeca'" class="flex gap-4 justify-between" id="odjeca">
                <div class="basis-1/4">
                    <h5>MUŠKARCI</h5>
                    <hr>
                    <ul>
                        <li><NuxtLink to="/">Hoodice</NuxtLink></li>
                        <li><NuxtLink to="/">T-shirt i polo majice</NuxtLink></li>
                        <li><NuxtLink to="/">Ostalo</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5>ŽENE</h5>
                    <hr>
                    <ul>
                        <li><NuxtLink to="/">Hoodice</NuxtLink></li>
                        <li><NuxtLink to="/">T-shirt i polo majice</NuxtLink></li>
                        <li><NuxtLink to="/">Ostalo</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5>DJECA</h5>
                    <hr>
                    <ul>
                        <li><NuxtLink to="/">Hoodice</NuxtLink></li>
                        <li><NuxtLink to="/">T-shirt i polo majice</NuxtLink></li>
                        <li><NuxtLink to="/">Ostalo</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5>MODNI DODACI</h5>
                    <hr>
                    <ul>
                        <li><NuxtLink to="/">Kape</NuxtLink></li>
                        <li><NuxtLink to="/">Šalovi</NuxtLink></li>
                        <li><NuxtLink to="/">Ostalo</NuxtLink></li>
                    </ul>
                </div>
            </div>


            <div v-show="activeTab === 'kolekcije'" class="flex gap-4 justify-between" id="kolekcije">
                <div class="basis-1/4">
                    <h5>JOMA</h5>
                    <hr>
                    <ul>
                        <li><NuxtLink to="/">Hlače</NuxtLink></li>
                        <li><NuxtLink to="/">Majice</NuxtLink></li>
                        <li><NuxtLink to="/">Trenerke</NuxtLink></li>
                        <li><NuxtLink to="/">Jakne</NuxtLink></li>
                        <li><NuxtLink to="/">Lopte</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5>NOVE HOODICE</h5>
                    <hr>
                    <ul>
                        <li><NuxtLink to="/">Muškarci</NuxtLink></li>
                        <li><NuxtLink to="/">Žene</NuxtLink></li>
                        <li><NuxtLink to="/">Djeca</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5>FORZA FIUME PREMIUM</h5>
                    <hr>
                    <ul>
                        <li><NuxtLink to="/">Pogledaj kolekciju</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5>ZIGMAN & HNK RIJEKA</h5>
                    <hr>
                    <ul>
                        <li><NuxtLink to="/">Pogledaj kolekciju</NuxtLink></li>
                    </ul>
                </div>
            </div>


            <div v-show="activeTab === 'pokloni'" class="flex gap-4" id="pokloni">
                <ul>
                    <li><NuxtLink to="/">Školski asortiman</NuxtLink></li>
                    <li><NuxtLink to="/">Kućni asortiman</NuxtLink></li>
                    <li><NuxtLink to="/">Privjesci</NuxtLink></li>
                    <li><NuxtLink to="/">Zastave</NuxtLink></li>
                    <li><NuxtLink to="/">Čestitke</NuxtLink></li>
                    <li><NuxtLink to="/">Ostalo</NuxtLink></li>
                </ul>
            </div>

            <div v-show="activeTab === 'akcije'" class="flex gap-4" id="akcije">
                <ul>
                    <li><NuxtLink to="/">Dresovi</NuxtLink></li>
                    <li><NuxtLink to="/">JOMA</NuxtLink></li>
                    <li><NuxtLink to="/">Ostalo</NuxtLink></li>
                </ul>
            </div>
        </div>

               
     </nav>
    </header>

        <!-- stari header -->
        <div class="mt-5 flex justify-center">
            <ul class="flex gap-4">
                <li>
                    <NuxtLink to="/" class="text-gray-900">HOME</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about" class="text-gray-900">ABOUT</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/theme-config" class="text-gray-900">THEME CONFIG</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/products" class="btn ">PRODUCTS</NuxtLink>
                </li>
            </ul>
        </div>





        <!-- Page content -->
        <div class="container mx-auto p-4">
            <slot />
        </div>





        <!-- FOOTER -->
        <footer
            class="mx-auto border-t-2 bg-cover bg-top bg-[linear-gradient(180deg,rgba(0,25,38,0)_30%,rgba(0,25,38,0.4)_60%,rgba(0,25,38,1)_95%),url(/assets/images/Footer-bg-2.jpg)]">

            <div class="pt-32 frame-p">

                <!--postani član -->
                <div
                    class="iskaznice relative mx-auto max-w-[830px] p-10 bg-[rgba(252,252,252,0.4)] rounded-2xl  max-xl:max-w-[700px]">
                    <div
                        class="grid justify-end grid-cols-[190px_358px_150px] gap-4 max-xl:flex max-xl:flex-col max-xl:items-center">
                        <div class="col-span-1">
                            <h4
                                class="font-saira font-semibold text-blue-600 text-h4-normal uppercase mb-2 text-right max-xl:pt-14">
                                Postani član</h4>
                        </div>

                        <div class="col-span-1">
                            <p class="font-roboto font-normal text-body2 text-blue-900 max-xl:text-center">Učlani se u
                                klub i ostvari popuste u našem WEB SHOPU i FAN SHOPU, na kupnju ulaznica te na proizvode
                                i usluge naših partnera.</p>
                        </div>

                        <div class="col-span-1">
                            <NuxtLink to="/" target="_blank" rel="noopener noreferrer"
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
                            <NuxtLink to="/kontakt">Kontakt</NuxtLink>
                        </p>
                        <p class="footer-text link">
                            <NuxtLink to="/fan-shop">Fan Shop HNK Rijeka</NuxtLink>
                        </p>
                    </div>

                    <!-- Korisničke usluge -->
                    <div>
                        <h6 class="footer-title pt-3 sm:pt-0">Korisničke usluge</h6>
                        <p class="footer-text link mb-4">
                            <NuxtLink to="/dostava">Dostava unutar RH</NuxtLink>
                        </p>
                        <p class="footer-text link">
                            <NuxtLink to="/medunarodna-dostava">Međunarodna dostava</NuxtLink>
                        </p>
                    </div>

                    <!-- Uvjeti korištenja -->
                    <div>
                        <h6 class="footer-title pt-3 sm:pt-0">Uvjeti korištenja</h6>
                        <p class="footer-text link mb-4">
                            <NuxtLink to="/nacin-placanja">Način plaćanja</NuxtLink>
                        </p>
                        <p class="footer-text link mb-4">
                            <NuxtLink to="/opci-uvjeti">Opći uvjeti kupnje</NuxtLink>
                        </p>
                        <p class="footer-text link mb-4">
                            <NuxtLink to="/zastita-podataka">Zaštita podataka</NuxtLink>
                        </p>
                        <p class="footer-text link">
                            <NuxtLink to="/politika-kolacica">Politika o kolačićima</NuxtLink>
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


