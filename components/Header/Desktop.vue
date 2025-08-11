<script setup lang="ts">
import { useCartStore } from '~/composables/useCart'
import { activetab, setActiveTab, openMenu } from '~/composables/activeTabNavigation'
import { SidebarCartList } from '#components'
import { useFavoritesStore } from '~/composables/favorites'

const cartStore = useCartStore()
const favoriteStore = useFavoritesStore()

const setActive = (tab: string) => {
  if (activetab.value === tab) {
    openMenu.value = false
    activetab.value = '' 
  } else {
    activetab.value = tab
    openMenu.value = true
  }
}

const dropdownWrapper = ref<HTMLElement | null>(null)

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node

    const isClickInsideDropdown = dropdownWrapper.value?.contains(target)
        || document.querySelector('.dropdown-content')?.contains(target)

    if (!isClickInsideDropdown) {
        openMenu.value = false
        activetab.value = ''
    }
}
</script>

<template>
    <div>
        <!-- HEADER -->
        <header
            class="hidden lg:block container mx-auto bg-customColors-100 rounded-[40px] z-1 mt-11 fixed top-0 left-0 right-0 z-50"
        >
            <nav>
                <div ref="dropdownWrapper" class="p-5 flex-between rounded-[40px] bg-header-gradient">
                    <NuxtLink to="/" class="ml-3"><img src="/assets/images/logos/logo.svg" alt="Logo" /></NuxtLink>

                    <!--navigacija-->
                    <div>
                        <ul class="flex gap-5 xl:gap-10 ml-0 xl:ml-11">
                            <li class="heading">
                                <NuxtLink
                                    to="#"
                                    @click.prevent="setActive('dresovi')"
                                    class="flex items-center gap-2 group"
                                >
                                    <span :class="activetab === 'dresovi' ? 'text-blue-500' : ''">DRESOVI</span>
                                    <Icon
                                        :name="activetab === 'dresovi' ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                                        :class="[activetab === 'dresovi' ? 'text-blue-500' : 'text-white', 'icon-link']"
                                    />
                                </NuxtLink>
                            </li>
                            <li class="heading">
                                <NuxtLink
                                    to="/c/forza-fiume-premium"
                                    class="flex items-center gap-2 group"
                                >
                                    <span>FORZA FIUME</span>
                                </NuxtLink>
                            </li>
                            <li class="heading">
                                <NuxtLink
                                    to="#"
                                    @click.prevent="setActive('odjeca')"
                                    class="flex items-center gap-2 group"
                                >
                                    <span :class="activetab === 'odjeca' ? 'text-blue-500' : ''">ODJEĆA</span>
                                    <Icon
                                        :name="activetab === 'odjeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                                        :class="[activetab === 'odjeca' ? 'text-blue-500' : 'text-white', 'icon-link']"
                                    />
                                </NuxtLink>
                            </li>
                            <li class="heading">
                                <NuxtLink
                                    to="#"
                                    @click.prevent="setActive('joma')"
                                    class="flex items-center gap-2 group"
                                >
                                    <span :class="activetab === 'joma' ? 'text-blue-500' : ''">JOMA</span>
                                    <Icon
                                        :name="activetab === 'joma' ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                                        :class="[
                                            activetab === 'joma' ? 'text-blue-500' : 'text-white',
                                            'icon-link',
                                        ]"
                                    />
                                </NuxtLink>
                            </li>
                            <li class="heading">
                                <NuxtLink
                                    to="#"
                                    @click.prevent="setActive('pokloni')"
                                    class="flex items-center gap-2 group"
                                >
                                    <span :class="activetab === 'pokloni' ? 'text-blue-500' : ''">POKLONI</span>
                                    <Icon
                                        :name="activetab === 'pokloni' ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                                        :class="[activetab === 'pokloni' ? 'text-blue-500' : 'text-white', 'icon-link']"
                                    />
                                </NuxtLink>
                            </li>
                            <li class="heading">
                                <NuxtLink
                                    to="#"
                                    @click.prevent="setActive('akcije')"
                                    class="flex items-center gap-2 group"
                                >
                                    <span :class="activetab === 'akcije' ? 'text-blue-500' : ''">OUTLET</span>
                                    <Icon
                                        :name="activetab === 'akcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                                        :class="[activetab === 'akcije' ? 'text-blue-500' : 'text-white', 'icon-link']"
                                    />
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <div class="flex flex-row gap-7">
                        <div class="flex items-center gap-4">
                            <NuxtLink to="#" class="flex" @click.prevent="setActiveTab('search')">
                                <Icon
                                    :name="activetab === 'search' && openMenu ? 'akar-icons:cross' : 'akar-icons:search'"
                                    class="p-0 m-0 text-white icon-extra link-bijeli"
                                />
                            </NuxtLink>
                            <NuxtLink to="/favorites" class="relative flex">
                                <UChip
                                    :text="favoriteStore.favorite_products.length ?? 0"
                                    size="2xl"
                                    inset
                                    :ui="{
                                        base: '-mx-7 -my-2 ring-0',
                                        background: 'bg-gold-50 dark:bg-gold-50 dark:text-white text-white text-2xs',
                                    }"
                                />
                                <Icon name="heroicons:heart" class="p-0 m-0 text-white icon-extra link-bijeli" />
                            </NuxtLink>
                            
                            <HeaderAccountDropdown />
                        </div>

                        <!--ikona košarice-->
                        <SidebarCartList />
                    </div>
                    
                </div>

                <HeaderDesktopDropDown />
            </nav>
        </header>
    </div>
</template>

<style>
.container {
    width: 98%;
}
</style>
