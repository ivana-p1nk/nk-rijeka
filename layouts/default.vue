<script setup>
import { _white } from '#tailwind-config/theme/accentColor';
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


const user = useSanctumUser();

const dropdownItems = computed(() => {
  if (user.value != null) {
    return [
      [{
        custom: `Pozdrav ${user.value.name}`,  
        class: 'font-roboto font-normal account-frame pl-3 pt-0 pb-3 account-transparent',
      }],
      [{
        label: 'Narudžbe',
        to: '/profile',
        icon: 'streamline:ticket-1',
        class: 'account-frame-items',
      }],
      [{
        label: 'Detalji profila',
        to: '/profile',
        icon: 'tdesign:user-circle',
        class: 'account-frame-items',
      }],
      [{
        label: 'Odjava',
        to: '/odjava',
        icon: 'uiw:login',
        class: 'account-frame-items',
      }]
    ];
  } else {
    return [
      [{
        label: 'Prijavi se',
        to: '/login',
         class: 'account-login-btn w-[80%] mb-2 mx-auto'
      }],
    ];
  }
});



</script>

<template>
<div>
 
    <!-- HEADER -->
   
    <header class="hidden lg:block container mx-auto bg-customColors-100 rounded-[40px] z-1 mt-11 fixed top-0 left-0 right-0 z-50">
        
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
                <div class="flex-row gap-4 flex-between">
                    <NuxtLink to="#">  <Icon name="akar-icons:search" class="text-white icon-extra link" /></NuxtLink>
                    <NuxtLink to="#"> <Icon name="line-md:heart" class="text-white link icon-extra" /></NuxtLink>

                    <!--Login/Account Dropdown-->
                    <UDropdown
                        :items="dropdownItems"
                        :popper="{ placement: 'bottom-start' }"
                        class="custom-dropdown"
                        :ui="{
                            width: 'w-[245px]',
                            background: 'bg-header-gradient dark:bg-header-gradient pt-6 pb-3',
                            rounded: 'rounded-2xl',
                            padding: 'p-0',
                            divide: 'divide-none',
                            shadow: 'shadow-lg',
                            ring: 'ring-0',
                            item: {
                                inactive: 'text-white dark:text-white',
                                active:  'rounded-none bg-blue-500 dark:bg-blue-500 dark:bg-opacity-10 bg-opacity-10 text-white dark:text-white',
                            }
                        }"
                    >

                        <UButton
                            icon="i-heroicons-user-circle"
                            size="lg"
                            color="dark"
                            square
                            variant="solid"
                            class="p-0 dark:text-white text-white" 
                        />
                        <!-- Stavke dropdowna -->
                        <template #item="{ item, isActive }">
                            <div class="px-2 py-1">
                                <span v-if="item.custom" v-html="item.custom"></span>
                                <span v-else>
                                    <span v-if="item.icon" class="mr-1">
                                        <Icon :name="item.icon" class="w-5 h-5 ml-5 -mb-1 text-blue-500 " />
                                    </span>   
                                    {{ item.label }}
                                </span>
                            </div>
                        </template>
                    </UDropdown>
                </div>
              
                <!--Cart-->
                <NuxtLink to="/cart">
                    <UChip 
                        :text="cartStore.totalPriceQuantity.quantity" 
                        size="2xl" inset  
                        :ui="{
                            base: 'mx-2 -my-1 ring-0',
                            background: 'bg-gold-50 dark:bg-gold-50 dark:text-white text-white text-2xs'
                        }"
                        class="rounded-3xl flex items-center gap-2 py-[7px] px-4 bg-blue-500 text-white">
                            <p class="header-text hover:text-white ">{{ cartStore.totalPriceQuantity.total.toFixed(2) }} €</p>
                            <Icon name="ci:shopping-cart-01" class="text-white" />
                    </UChip>
                </NuxtLink>
            </div>
        </div>
        
        <Transition name="fade">
        <!-- Dropdown sekcija za navigaciju -->
        <div v-if="activeTab" class="max-w-[575px] mx-auto pt-7 pb-12 border-t border-customColors-200">
            
            <div v-show="activeTab === 'dresovi'" class="flex gap-4" id="dresovi">
                <ul class="flex flex-col gap-3">
                    <li class="heading-sub"><NuxtLink to="#">2024./2025.</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">2023./2024.</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="#">Starije sezone</NuxtLink></li>
                </ul>
            </div>

            <div v-show="activeTab === 'odjeca'" class="flex justify-between gap-4" id="odjeca">
                <div class="basis-1/4">
                    <h5 class="pb-4 heading-subtitle">MUŠKARCI</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Hoodice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="pb-4 heading-subtitle">ŽENE</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Hoodice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="pb-4 heading-subtitle">DJECA</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Hoodice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="pb-4 heading-subtitle">MODNI DODACI</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Kape</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Šalovi</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                    </ul>
                </div>
            </div>


            <div v-show="activeTab === 'kolekcije'" class="flex justify-between gap-4" id="kolekcije">
                <div class="basis-1/4">
                    <h5 class="pb-4 heading-subtitle">JOMA</h5>
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
                    <h5 class="pb-4 heading-subtitle">NOVE HOODICE</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Muškarci</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Žene</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Djeca</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="pb-4 heading-subtitle">FORZA FIUME PREMIUM</h5>
                    <hr class="divider">
                    <ul class="flex flex-col gap-3 pt-4">
                        <li class="heading-sub"><NuxtLink to="#">Pogledaj kolekciju</NuxtLink></li>
                    </ul>
                </div>
                <div class="basis-1/4">
                    <h5 class="pb-4 heading-subtitle">ZIGMAN & HNK RIJEKA</h5>
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
        </Transition>
   
     </nav>
     
    </header>




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


                <NuxtLink to="#">  <Icon name="akar-icons:search" class="text-white link icon-xl" /></NuxtLink>
            </div>

            <NuxtLink to="/" class="ml-3"><img src="/assets/images/logos/logo.svg" alt="Logo"></NuxtLink>
            <div class="flex flex-row gap-6 items-center">
                <!--Login/Account Dropdown-->
                <UDropdown
                    :items="dropdownItems"
                    :popper="{ placement: 'bottom-start' }"
                    class="custom-dropdown"
                    :ui="{
                        width: 'w-[245px]',
                        background: 'bg-header-gradient dark:bg-header-gradient pt-6 pb-3',
                        rounded: 'rounded-2xl',
                        padding: 'p-0',
                        divide: 'divide-none',
                        shadow: 'shadow-lg',
                        ring: 'ring-0',
                        item: {
                            inactive: 'text-white dark:text-white',
                            active:  'rounded-none bg-blue-500 dark:bg-blue-500 dark:bg-opacity-10 bg-opacity-10 text-white dark:text-red-500',
                        }
                    }"
                >

                    <UButton
                        icon="i-heroicons-user-circle"
                        size="xl"
                        color="dark"
                        square
                        variant="solid"
                        class="p-0 dark:text-white text-white" 
                    />
                    <!-- Stavke dropdowna -->
                    <template #item="{ item, isActive }">
                        <div class="px-2 py-1">
                            <span v-if="item.custom" v-html="item.custom"></span>
                            <span v-else>
                                <span v-if="item.icon" class="mr-1">
                                    <Icon :name="item.icon" class="w-5 h-5 ml-5 -mb-1 text-blue-500 " />
                                </span>   
                                {{ item.label }}
                            </span>
                        </div>
                    </template>
                </UDropdown>


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



        <!-- Page content -->
        <div>
            <slot />
        </div>



        <!-- FOOTER -->
        <footer
            class="mx-auto bg-cover bg-top bg-[linear-gradient(180deg,rgba(0,25,38,0)_30%,rgba(0,25,38,0.4)_60%,rgba(0,25,38,1)_95%),url(/assets/images/backgrounds/Footer-bg-2.jpg)]">

            <div class="pt-32 frame-p">

                <!--postani član -->
                <div
                    class="iskaznice relative mx-auto max-w-[830px] p-10 bg-[rgba(252,252,252,0.4)] rounded-2xl  max-xl:max-w-[700px]">
                    <div
                        class="grid justify-end grid-cols-[190px_358px_150px] gap-4 max-xl:flex max-xl:flex-col max-xl:items-center">
                        <div class="col-span-1">
                            <h4 class="mb-2 font-semibold text-right text-blue-600 uppercase font-saira text-h4-normal max-xl:pt-14">
                                Postani član</h4>
                        </div>

                        <div class="col-span-1">
                            <p class="font-normal text-blue-900 font-roboto text-body2 max-xl:text-center">Učlani se u
                                klub i ostvari popuste u našem WEB SHOPU i FAN SHOPU, na kupnju ulaznica te na proizvode
                                i usluge naših partnera.</p>
                        </div>

                        <div class="col-span-1">
                            <NuxtLink to="#" target="_blank" rel="noopener noreferrer"
                                class="inline-block uppercase btn-secondary large">Registriraj se</NuxtLink>
                        </div>
                    </div>
                </div>

                <!--slogan -->
                <div
                    class="flex flex-col items-center content-center justify-center pb-28 pt-28 max-2xl:pt-8 max-2xl:pb-8 max-xl:pt-8 max-xl:pb-8">
                    <img src="/assets/images/Slogan.png" class="pb-4 sm:pb-8">
                    <a href="https://nk-rijeka.hr/" target="_blank" rel="noopener noreferrer"
                        class="font-semibold font-saira text-h4-normal text-blue-50 link">nk-rijeka.hr</a>
                </div>

                <!-- footer meni  -->
                <div
                    class="mx-auto max-w-[1480px] grid grid-cols-1 text-center sm:text-left sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
                    <!-- Logo element -->
                    <div
                        class="flex items-start justify-center pb-0 sm:col-span-full lg:col-span-full 2xl:col-span-1 sm:pb-5">
                        <img class="w-full max-w-[108px]" src="~/assets/images/logos/hnk-rijeka-grb.svg"
                            alt="HNK Rijeka Grb" />
                    </div>

                    <!-- Društvene mreže -->
                    <div>
                        <h6 class="pt-3 footer-title sm:pt-0">Društvene mreže</h6>
                        <p class="mb-4 footer-text">Budi dio HNK Rijeka zajednice na društvenim mrežama</p>
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
                        <h6 class="pt-3 footer-title sm:pt-0">O nama</h6>
                        <p class="mb-4 footer-text link">
                            <NuxtLink to="#">Kontakt</NuxtLink>
                        </p>
                        <p class="footer-text link">
                            <NuxtLink to="#">Fan Shop HNK Rijeka</NuxtLink>
                        </p>
                    </div>

                    <!-- Korisničke usluge -->
                    <div>
                        <h6 class="pt-3 footer-title sm:pt-0">Korisničke usluge</h6>
                        <p class="mb-4 footer-text link">
                            <NuxtLink to="/korisnicke-usluge">Dostava unutar RH</NuxtLink>
                        </p>
                        <p class="footer-text link">
                            <NuxtLink to="/korisnicke-usluge">Međunarodna dostava</NuxtLink>
                        </p>
                    </div>

                    <!-- Uvjeti korištenja -->
                    <div>
                        <h6 class="pt-3 footer-title sm:pt-0">Uvjeti korištenja</h6>
                        <p class="mb-4 footer-text link">
                            <NuxtLink to="/nacini-placanja">Način plaćanja</NuxtLink>
                        </p>
                        <p class="mb-4 footer-text link">
                            <NuxtLink to="/opci-uvjeti">Opći uvjeti kupnje</NuxtLink>
                        </p>
                        <p class="mb-4 footer-text link">
                            <NuxtLink to="/zastita-podataka">Zaštita podataka</NuxtLink>
                        </p>
                        <p class="footer-text link">
                            <NuxtLink to="/politika-kolacica">Politika o kolačićima</NuxtLink>
                        </p>
                    </div>

                    <!-- Newsletter -->
                    <div>
                        <h6 class="pt-3 footer-title sm:pt-0">Newsletter</h6>
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
                class="flex flex-col-reverse items-center justify-between gap-5 p-6 mx-auto border-t border-blue-800 sm:flex-row sm:gap-0">
                <div class="font-normal text-blue-400 text-roboto text-body4">
                    Copyright © {{ new Date().getFullYear() }} HNK Rijeka
                </div>
                <div class="font-normal text-blue-400 text-roboto text-body4">
                    Design and development by:
                    <a href="https://prospekt.hr" target="_blank" rel="noopener noreferrer"
                        class="font-bold text-white hover:underline">Prospekt</a>
                </div>
            </div>

        </footer>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>