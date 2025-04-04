<template>
<div>
 <!-- MOBILE HEADER -->
 <header class="block lg:hidden container  mx-auto w-auto max-w-[calc(100%-1rem)] bg-customColors-100 rounded-[40px] z-1 mt-11 fixed top-0 left-0 right-0 z-50">
    <nav>
      <div class="p-5 flex-between rounded-[40px] bg-header-gradient">
          <div class="flex flex-row gap-6 items-center">
           
             <!-- Ikona za otvaranje hamburger menu -->
             <NuxtLink to="#" @click.prevent="toggleHamburger" class="flex items-center gap-2 group">
                  <Icon 
                      :name="isHamburgerOpen ? 'radix-icons:cross-2' : 'radix-icons:hamburger-menu'" 
                      :class="[isHamburgerOpen ? 'text-white' : 'text-white', 'icon-link icon-xl']" 
                  />
              </NuxtLink>


              <NuxtLink to="#">  <Icon name="akar-icons:search" class="text-white link-bijeli icon-xl" /></NuxtLink>
          </div>

          <NuxtLink to="/" class="ml-3"><img src="/assets/images/logos/logo.svg" alt="Logo"></NuxtLink>
          <div class="flex flex-row gap-6 items-center">
            <HeaderAccountDropdown />


              <!--Cart-->
              <NuxtLink to="/cart">
              <UChip 
                  :text="cartStore.totalPriceQuantity.quantity" 
                  size="2xl" inset  
                  :ui="{
                      base: 'ml-2 -my-1 ring-0',
                      background: 'bg-gold-50 dark:bg-gold-50 dark:text-white text-white text-2xs'
                  }"
                  class="rounded-3xl flex items-center gap-2 py-2 px-2 bg-blue-500 text-white">
                      <Icon name="ci:shopping-cart-01" class="text-white" />
              </UChip>
          </NuxtLink>
      </div>
      </div>

      <Transition name="fade">
      <!-- Dropdown sekcija za navigaciju -->
      <div v-if="isHamburgerOpen" class="pt-5 pb-5 px-6 border-t border-customColors-200">
      <ul class="flex flex-col gap-4">
          <!-- DRESOVI -->
          <li>
              <NuxtLink to="#" @click.prevent="setActive('dresovi')" class="mobile-nav flex items-center justify-between gap-2 group">
                  <span :class="activeTab === 'dresovi' ? 'text-blue-500' : ''">DRESOVI</span>
                  <Icon :name="activeTab === 'dresovi' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
              </NuxtLink>
          </li>
          <template v-if="activeTab === 'dresovi'">
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">2024./2025.</NuxtLink></li>
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">2023./2024.</NuxtLink></li>
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">Starije sezone</NuxtLink></li>
          </template>

          <!-- ODJEĆA -->
          <li>
              <NuxtLink to="#" @click.prevent="setActive('odjeca')" class="mobile-nav flex items-center justify-between gap-2 group">
                  <span :class="activeTab === 'odjeca' ? 'text-blue-500' : ''">ODJEĆA</span>
                  <Icon :name="activeTab === 'odjeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
              </NuxtLink>
          </li>
          <template v-if="activeTab === 'odjeca'">
              <!-- Muškarci -->
              <li>
                  <NuxtLink to="#" @click.prevent="setSubActive('muskarci')" class="pl-5 mobile-nav flex items-center justify-between gap-2 group">
                      <span :class="subActive === 'muskarci' ? 'text-blue-500' : ''">MUŠKARCI</span>
                      <Icon :name="subActive === 'muskarci' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                  </NuxtLink>
              </li>
              <template v-if="subActive === 'muskarci'">
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Hoodice</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Ostalo</NuxtLink></li>
              </template>
              <!-- Žene -->
              <li>
                  <NuxtLink to="#" @click.prevent="setSubActive('zene')" class="pl-5 mobile-nav flex items-center justify-between gap-2 group">
                      <span :class="subActive === 'zene' ? 'text-blue-500' : ''">ŽENE</span>
                      <Icon :name="subActive === 'zene' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                  </NuxtLink>
              </li>
              <template v-if="subActive === 'zene'">
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Hoodice</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Ostalo</NuxtLink></li>
              </template>
              <!-- Djeca -->
              <li>
                  <NuxtLink to="#" @click.prevent="setSubActive('djeca')" class="pl-5 mobile-nav flex items-center justify-between gap-2 group">
                      <span :class="subActive === 'djeca' ? 'text-blue-500' : ''">DJECA</span>
                      <Icon :name="subActive === 'djeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                  </NuxtLink>
              </li>
              <template v-if="subActive === 'djeca'">
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Hoodice</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Ostalo</NuxtLink></li>
              </template>
               <!-- Modni dodaci -->
               <li>
                  <NuxtLink to="#" @click.prevent="setSubActive('dodaci')" class="pl-5 mobile-nav flex items-center justify-between gap-2 group">
                      <span :class="subActive === 'dodaci' ? 'text-blue-500' : ''">MODNI DODACI</span>
                      <Icon :name="subActive === 'dodaci' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                  </NuxtLink>
              </li>
              <template v-if="subActive === 'dodaci'">
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Kape</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Šalovi</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Ostalo</NuxtLink></li>
              </template>
          </template>


          <!-- KOLEKCIJE -->
          <li>
              <NuxtLink to="#" @click.prevent="setActive('kolekcije')" class="mobile-nav flex items-center justify-between gap-2 group">
                  <span :class="activeTab === 'kolekcije' ? 'text-blue-500' : ''">KOLEKCIJE</span>
                  <Icon :name="activeTab === 'kolekcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
              </NuxtLink>
          </li>
          <template v-if="activeTab === 'kolekcije'">
              <!-- Joma -->
              <li>
                  <NuxtLink to="#" @click.prevent="setSubActive('joma')" class="pl-5 mobile-nav flex items-center justify-between gap-2 group">
                      <span :class="subActive === 'joma' ? 'text-blue-500' : ''">JOMA</span>
                      <Icon :name="subActive === 'joma' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                  </NuxtLink>
              </li>
              <template v-if="subActive === 'joma'">
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Hlače</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Majice</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Trenerke</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Jakne</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Lopte</NuxtLink></li>
              </template>
              <!-- Nove hudice -->
              <li>
                  <NuxtLink to="#" @click.prevent="setSubActive('novehudice')" class="pl-5 mobile-nav flex items-center justify-between gap-2 group">
                      <span :class="subActive === 'novehudice' ? 'text-blue-500' : ''">NOVE HOODICE</span>
                      <Icon :name="subActive === 'novehudice' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                  </NuxtLink>
              </li>
              <template v-if="subActive === 'novehudice'">
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Muškarci</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Žene</NuxtLink></li>
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Djeca</NuxtLink></li>
              </template>
              <!-- Forza fiume premium-->
              <li>
                  <NuxtLink to="#" @click.prevent="setSubActive('forza')" class="pl-5 mobile-nav flex items-center justify-between gap-2 group">
                      <span :class="subActive === 'forza' ? 'text-blue-500' : ''">FORZA FIUME PREMIUM</span>
                      <Icon :name="subActive === 'forza' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                  </NuxtLink>
              </li>
              <template v-if="subActive === 'forza'">
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Pogledaj kolekciju</NuxtLink></li>
              </template>

              <!-- Forza fiume premium-->
              <li>
                  <NuxtLink to="#" @click.prevent="setSubActive('zigman')" class="pl-5 mobile-nav flex items-center justify-between gap-2 group">
                      <span :class="subActive === 'zigman' ? 'text-blue-500' : ''">ZIGMAN & HNK RIJEKA</span>
                      <Icon :name="subActive === 'zigman' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                  </NuxtLink>
              </li>
              <template v-if="subActive === 'zigman'">
                  <li class="heading-sub pl-9 font-normal"><NuxtLink to="#">Pogledaj kolekciju</NuxtLink></li>
              </template>
              

          </template>

          <!-- POKLONI -->
          <li>
              <NuxtLink to="#" @click.prevent="setActive('pokloni')" class="mobile-nav flex items-center justify-between gap-2 group">
                  <span :class="activeTab === 'pokloni' ? 'text-blue-500' : ''">POKLONI</span>
                  <Icon :name="activeTab === 'pokloni' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
              </NuxtLink>
          </li>
          <template v-if="activeTab === 'pokloni'">
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">Školski asortiman</NuxtLink></li>
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">Kućni asortiman</NuxtLink></li>
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">Privjesci</NuxtLink></li>
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">Zastave</NuxtLink></li>
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">Čestitke</NuxtLink></li>
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">Ostalo</NuxtLink></li>
          </template>


          <!-- AKCIJE -->
          <li>
              <NuxtLink to="#" @click.prevent="setActive('akcije')" class="mobile-nav flex items-center justify-between gap-2 group">
                  <span :class="activeTab === 'akcije' ? 'text-blue-500' : ''">AKCIJE</span>
                  <Icon :name="activeTab === 'akcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
              </NuxtLink>
          </li>
          <template v-if="activeTab === 'akcije'">
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">Dresovi</NuxtLink></li>
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">JOMA</NuxtLink></li>
              <li class="heading-sub pl-5 font-normal"><NuxtLink to="#">Ostalo</NuxtLink></li>
          </template>
      </ul>
          <NuxtLink to="#" class="mobile-nav flex items-center -mx-6  px-6 justify-between pt-2 mt-2 border-t border-customColors-200">
              <span class="">FAVORITI</span>
              <Icon name="line-md:heart" />
          </NuxtLink>

      </div>
  </Transition>


     </nav>
  </header>
</div>
</template>


<script setup>

import { ref, computed, toValue } from 'vue'
import { useCartStore } from '~/composables/useCart';

const cartStore = useCartStore();

const activeTab = ref('') ;
const subActive = ref(''); 
const isHamburgerOpen = ref(false);

const toggleHamburger = () => {
isHamburgerOpen.value = !isHamburgerOpen.value;
if (!isHamburgerOpen.value) {
activeTab.value = '';
subActive.value = '';
}
};

const setActive = (tab) => {
activeTab.value = activeTab.value === tab ? '' : tab;
subActive.value = ''; 
}

const setSubActive = (subTab) => {
subActive.value = subActive.value === subTab ? '' : subTab;
};


</script>


