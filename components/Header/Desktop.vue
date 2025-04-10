<script setup lang="ts">
    import { useCartStore } from '~/composables/useCart';
    import { activetab, setActiveTab, openMenu } from "~/composables/activeTabNavigation";

    const cartStore = useCartStore();

    const setActive = (tab: string) => setActiveTab(tab);

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
            activetab.value = '';
        }
    };
</script>

<template>
    <div>
        <!-- HEADER -->
        <header class="hidden lg:block container mx-auto bg-customColors-100 rounded-[40px] z-1 mt-11 fixed top-0 left-0 right-0 z-50">
            <nav> 
                <div class="p-5 flex-between rounded-[40px] bg-header-gradient">
                    <NuxtLink to="/" class="ml-3"><img src="/assets/images/logos/logo.svg" alt="Logo"></NuxtLink>
                    
                    <!--navigacija-->
                    <div ref="dropdownWrapper">
                        <ul class="flex gap-10">
                            <li class="heading">
                                <NuxtLink to="#" @click.prevent="setActive('dresovi')" class="flex items-center gap-2 group">
                                    <span :class="activetab === 'dresovi' ? 'text-blue-500' : ''">DRESOVI</span>
                                    <Icon :name="activetab === 'dresovi' ? 'mdi:chevron-up' : 'mdi:chevron-down'" :class="[ activetab === 'dresovi' ? 'text-blue-500' : 'text-white', 'icon-link']" />
                                </NuxtLink>
                            </li>
                            <li class="heading">
                                <NuxtLink to="#" @click.prevent="setActive('odjeca')" class="flex items-center gap-2 group">
                                    <span :class="activetab === 'odjeca' ? 'text-blue-500' : ''">ODJEĆA</span>
                                    <Icon :name="activetab === 'odjeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" :class="[ activetab === 'odjeca' ? 'text-blue-500' : 'text-white', 'icon-link']" />
                                </NuxtLink>
                            </li>
                            <li class="heading">
                                <NuxtLink to="#" @click.prevent="setActive('kolekcije')" class="flex items-center gap-2 group">
                                    <span :class="activetab === 'kolekcije' ? 'text-blue-500' : ''">KOLEKCIJE</span>
                                    <Icon :name="activetab === 'kolekcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" :class="[ activetab === 'kolekcije' ? 'text-blue-500' : 'text-white', 'icon-link']" />
                                </NuxtLink>
                            </li>
                            <li class="heading">
                                <NuxtLink to="#" @click.prevent="setActive('pokloni')" class="flex items-center gap-2 group">
                                    <span :class="activetab === 'pokloni' ? 'text-blue-500' : ''">POKLONI</span>
                                    <Icon :name="activetab === 'pokloni' ? 'mdi:chevron-up' : 'mdi:chevron-down'" :class="[ activetab === 'pokloni' ? 'text-blue-500' : 'text-white', 'icon-link']" />
                                </NuxtLink>
                            </li>
                            <li class="heading">
                                <NuxtLink to="#" @click.prevent="setActive('akcije')" class="flex items-center gap-2 group">
                                    <span :class="activetab === 'akcije' ? 'text-blue-500' : ''">AKCIJE</span>
                                    <Icon :name="activetab === 'akcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" :class="[ activetab === 'akcije' ? 'text-blue-500' : 'text-white', 'icon-link']" />
                                </NuxtLink>
                            </li>
        
                        </ul>
                    </div>
        
                    <div class="flex flex-row gap-7">
                        <div class="flex items-center gap-4">
                            <NuxtLink to="#" class="flex">
                                <Icon name="akar-icons:search" class="p-0 m-0 text-white icon-extra link-bijeli" />
                            </NuxtLink>
                            <NuxtLink to="/favorites" class="flex"> 
                                <Icon name="heroicons:heart" class="p-0 m-0 text-white icon-extra link-bijeli" />
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
                
                <HeaderDesktopDropDown />
            </nav>
        </header>
    </div>
</template>