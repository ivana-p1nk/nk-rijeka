<script setup lang="ts">
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

    const setActive = (tab: string) => {
        activeTab.value = activeTab.value === tab ? '' : tab;
        subActive.value = ''; 
    }

    const setSubActive = (subTab: string) => {
        subActive.value = subActive.value === subTab ? '' : subTab;
    };

    const activeDropdownRef = ref<HTMLElement | null>(null);
    const dropdownHeight = ref('0px');

    watch([isHamburgerOpen, activeTab, subActive], () => {
        if (isHamburgerOpen.value) {
            setTimeout(() => {
                if (!activeDropdownRef.value) return;

                const el = activeDropdownRef.value;
                const newHeight = (el.scrollHeight + 70) + 'px';
                dropdownHeight.value = newHeight;
            }, 10);
        } else {
            dropdownHeight.value = '0px';
        }
    });
</script>

<template>
    <div>
        <!-- MOBILE HEADER -->
        <header class="block lg:hidden container  mx-auto w-auto max-w-[calc(100%-1rem)] bg-customColors-100 rounded-[40px] z-1 mt-11 fixed top-0 left-0 right-0 z-50">
            <nav>
                <div class="p-5 flex-between items-center rounded-[40px] bg-header-gradient">
                    <div class="flex flex-row items-center gap-6">
                        <!-- Ikona za otvaranje hamburger menu -->
                        <NuxtLink to="#" @click.prevent="toggleHamburger" class="flex items-center gap-2 group">
                            <Icon 
                                :name="isHamburgerOpen ? 'radix-icons:cross-2' : 'radix-icons:hamburger-menu'" 
                                :class="[isHamburgerOpen ? 'text-white' : 'text-white', 'icon-link icon-xl']" 
                            />
                        </NuxtLink>


                        <NuxtLink to="#" class="flex">
                            <Icon name="akar-icons:search" class="text-white link-bijeli icon-lg" />
                        </NuxtLink>
                    </div>

                    <NuxtLink to="/" class="ml-3"><img src="/assets/images/logos/logo.svg" alt="Logo"></NuxtLink>
                    <div class="flex flex-row items-center gap-6">
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
                                class="flex items-center gap-2 px-2 py-2 text-white bg-blue-500 rounded-3xl">
                                    <Icon name="ci:shopping-cart-01" class="text-white" />
                            </UChip>
                        </NuxtLink>
                    </div>
                </div>

                <div 
                    ref="dropdownRef"
                    :style="{ height: dropdownHeight }"
                    class="overflow-hidden transition-all duration-300 ease-in-out will-change-[height]"
                >
                    <!-- Dropdown sekcija za navigaciju -->
                    <div class="px-6 pt-5 pb-5 border-t border-customColors-200">
                        <ul class="flex flex-col gap-4" ref="activeDropdownRef">
                            <!-- DRESOVI -->
                            <li>
                                <NuxtLink to="#" @click.prevent="setActive('dresovi')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'dresovi' ? 'text-blue-500' : ''">DRESOVI</span>
                                    <Icon :name="activeTab === 'dresovi' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </NuxtLink>
                            </li>
                            <template v-if="activeTab === 'dresovi'">
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">2024./2025.</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">2023./2024.</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Starije sezone</NuxtLink></li>
                            </template>

                            <!-- ODJEĆA -->
                            <li>
                                <NuxtLink to="#" @click.prevent="setActive('odjeca')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'odjeca' ? 'text-blue-500' : ''">ODJEĆA</span>
                                    <Icon :name="activeTab === 'odjeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </NuxtLink>
                            </li>
                            <template v-if="activeTab === 'odjeca'">
                                <!-- Muškarci -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('muskarci')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'muskarci' ? 'text-blue-500' : ''">MUŠKARCI</span>
                                        <Icon :name="subActive === 'muskarci' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'muskarci'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Hoodice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Ostalo</NuxtLink></li>
                                </template>
                                <!-- Žene -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('zene')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'zene' ? 'text-blue-500' : ''">ŽENE</span>
                                        <Icon :name="subActive === 'zene' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'zene'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Hoodice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Ostalo</NuxtLink></li>
                                </template>
                                <!-- Djeca -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('djeca')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'djeca' ? 'text-blue-500' : ''">DJECA</span>
                                        <Icon :name="subActive === 'djeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'djeca'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Hoodice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Ostalo</NuxtLink></li>
                                </template>
                                <!-- Modni dodaci -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('dodaci')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'dodaci' ? 'text-blue-500' : ''">MODNI DODACI</span>
                                        <Icon :name="subActive === 'dodaci' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'dodaci'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Kape</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Šalovi</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Ostalo</NuxtLink></li>
                                </template>
                            </template>


                            <!-- KOLEKCIJE -->
                            <li>
                                <NuxtLink to="#" @click.prevent="setActive('kolekcije')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'kolekcije' ? 'text-blue-500' : ''">KOLEKCIJE</span>
                                    <Icon :name="activeTab === 'kolekcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </NuxtLink>
                            </li>
                            <template v-if="activeTab === 'kolekcije'">
                                <!-- Joma -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('joma')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'joma' ? 'text-blue-500' : ''">JOMA</span>
                                        <Icon :name="subActive === 'joma' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'joma'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Hlače</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Majice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Trenerke</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Jakne</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Lopte</NuxtLink></li>
                                </template>
                                <!-- Nove hudice -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('novehudice')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'novehudice' ? 'text-blue-500' : ''">NOVE HOODICE</span>
                                        <Icon :name="subActive === 'novehudice' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'novehudice'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Muškarci</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Žene</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Djeca</NuxtLink></li>
                                </template>
                                <!-- Forza fiume premium-->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('forza')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'forza' ? 'text-blue-500' : ''">FORZA FIUME PREMIUM</span>
                                        <Icon :name="subActive === 'forza' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'forza'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Pogledaj kolekciju</NuxtLink></li>
                                </template>

                                <!-- Forza fiume premium-->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('zigman')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'zigman' ? 'text-blue-500' : ''">ZIGMAN & HNK RIJEKA</span>
                                        <Icon :name="subActive === 'zigman' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'zigman'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Pogledaj kolekciju</NuxtLink></li>
                                </template>
                                

                            </template>

                            <!-- POKLONI -->
                            <li>
                                <NuxtLink to="#" @click.prevent="setActive('pokloni')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'pokloni' ? 'text-blue-500' : ''">POKLONI</span>
                                    <Icon :name="activeTab === 'pokloni' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </NuxtLink>
                            </li>
                            <template v-if="activeTab === 'pokloni'">
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Školski asortiman</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Kućni asortiman</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Privjesci</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Zastave</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Čestitke</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                            </template>


                            <!-- AKCIJE -->
                            <li>
                                <NuxtLink to="#" @click.prevent="setActive('akcije')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'akcije' ? 'text-blue-500' : ''">AKCIJE</span>
                                    <Icon :name="activeTab === 'akcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </NuxtLink>
                            </li>
                            <template v-if="activeTab === 'akcije'">
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Dresovi</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">JOMA</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                            </template>
                        </ul>
                        <NuxtLink to="/favorites" class="flex items-center justify-between px-6 pt-2 mt-2 -mx-6 border-t mobile-nav border-customColors-200">
                            <span class="">FAVORITI</span>
                            <Icon name="line-md:heart" />
                        </NuxtLink>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>


