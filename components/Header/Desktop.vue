<script setup lang="ts">
    import { useCartStore } from '~/composables/useCart';

    const cartStore = useCartStore();

    const activeTab = ref('') ;
    const openMenu = ref<boolean>(false);

    const setActive = (tab: string) => {
        if(activeTab.value === tab) {
            openMenu.value = false; 
            activeTab.value = '';
            return;
        }

        activeTab.value = tab;
        openMenu.value = true; 
    }

    const dropdownWrapper = ref<HTMLElement | null>(null);
    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });
    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
    });
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownWrapper.value && !dropdownWrapper.value.contains(event.target as Node)) {
            openMenu.value = false;
            activeTab.value = '';
        }
    };

    const activeTabContentRef = ref<HTMLElement | null>(null);
    const dropdownRef = ref<HTMLElement | null>(null);
    const dropdownHeight = ref('0px');

    watch([openMenu, activeTab], () => {
        if (openMenu.value) {
            setTimeout(() => {
                if (!activeTabContentRef.value) return;

                const el = activeTabContentRef.value;
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
        <!-- HEADER -->
        <header ref="dropdownWrapper" class="hidden lg:block container mx-auto bg-customColors-100 rounded-[40px] z-1 mt-11 fixed top-0 left-0 right-0 z-50">
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
                            <NuxtLink to="#">
                                <Icon name="akar-icons:search" class="text-white icon-extra link-bijeli" />
                            </NuxtLink>
                            <NuxtLink to="/favorites"> 
                                <Icon name="line-md:heart" class="text-white icon-extra link-bijeli" />
                            </NuxtLink>
        
                            <HeaderAccountDropdown />
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
                
                <div
                    ref="dropdownRef"
                    :style="{ height: dropdownHeight }"
                    class="overflow-hidden transition-all duration-300 ease-in-out will-change-[height]"
                >
                    <!-- Dropdown sekcija za navigaciju -->
                    <div class="max-w-[575px] mx-auto pt-7 pb-12 border-t border-customColors-200">
                        
                        <div v-if="activeTab === 'dresovi'" :key="activeTab" ref="activeTabContentRef" class="flex gap-4" id="dresovi">
                            <ul class="flex flex-col gap-3">
                                <li class="heading-sub"><NuxtLink to="/categories/dresovi/2024-2025">2024./2025.</NuxtLink></li>
                                <li class="heading-sub"><NuxtLink to="/categories/dresovi/2023-2024">2023./2024.</NuxtLink></li>
                                <li class="heading-sub"><NuxtLink to="/categories/dresovi">Starije sezone</NuxtLink></li>
                            </ul>
                        </div>
            
                        <div v-if="activeTab === 'odjeca'" :key="activeTab" ref="activeTabContentRef" class="flex justify-between gap-4" id="odjeca">
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
            
            
                        <div v-if="activeTab === 'kolekcije'" :key="activeTab" ref="activeTabContentRef" class="flex justify-between gap-4" id="kolekcije">
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
            
            
                        <div v-if="activeTab === 'pokloni'" :key="activeTab" ref="activeTabContentRef" class="flex gap-4" id="pokloni">
                            <ul class="flex flex-col gap-3">
                                <li class="heading-sub"><NuxtLink to="#">Školski asortiman</NuxtLink></li>
                                <li class="heading-sub"><NuxtLink to="#">Kućni asortiman</NuxtLink></li>
                                <li class="heading-sub"><NuxtLink to="#">Privjesci</NuxtLink></li>
                                <li class="heading-sub"><NuxtLink to="#">Zastave</NuxtLink></li>
                                <li class="heading-sub"><NuxtLink to="#">Čestitke</NuxtLink></li>
                                <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                            </ul>
                        </div>
            
                        <div v-if="activeTab === 'akcije'" :key="activeTab" ref="activeTabContentRef" class="flex gap-4" id="akcije">
                            <ul class="flex flex-col gap-3">
                                <li class="heading-sub"><NuxtLink to="#">Dresovi</NuxtLink></li>
                                <li class="heading-sub"><NuxtLink to="#">JOMA</NuxtLink></li>
                                <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>