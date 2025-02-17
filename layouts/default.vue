<script setup lang="ts">
const items = [
  [{
    label: 'Profile',
  }]
]

const open = ref(true)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
    <div>

        <!-- HEADER -->
        <header class="container mx-auto mt-11 bg-header-gradient rounded-[40px]">
            <nav class="p-5 flex-between">
                <NuxtLink to="/"><img src="/assets/images/logos/logo.svg"></NuxtLink>
                <ul class="flex gap-12">
                    <li>
                         <UDropdown v-model:open="open" :items="items" :popper="{ placement: 'bottom-start' }">
                            <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
                        </UDropdown>
                    </li>
                  
                    <li>
                        <NuxtLink to="/" class="header-text">DRESOVI</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/" class="header-text">ODJEĆA</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/" class="header-text">KOLEKCIJE</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/" class="header-text">POKLONI</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/" class="header-text">AKCIJE</NuxtLink>
                    </li>
                </ul>
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
            </nav>
        </header>

        <!-- stari header -->
        <div class="mt-5 flex justify-center">
            <ul class="flex gap-4">
                <li>
                    <NuxtLink to="/">HOME</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">ABOUT</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/theme-config">THEME CONFIG</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/products" class="btn">PRODUCTS</NuxtLink>
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
                        class="font-saira font-semibold text-h4-normal text-blue-50">nk-rijeka.hr</a>
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