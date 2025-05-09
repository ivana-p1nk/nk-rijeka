<script setup lang="ts">
import { useCartStore } from '~/composables/useCart'

const props = defineProps({
    activeTab: String,
})

const { logout } = useSanctumAuth()
const cartStore = useCartStore()

const emit = defineEmits(['update:activeTab'])

const logoutUser = async () => {
    cartStore.setUserRole(null);
    await logout()
}
</script>

<template>
    <nav>
        <div class="flex flex-col" role="tablist">
            <NuxtLink
                class="flex items-center p-3 text-[#012436] font-medium bg-white rounded-tl-xl rounded-tr-xl focus:outline-none"
                :class="{ 'active !bg-[#D9F1FD]': activeTab === 'nav-profile' }" to="/profile">
                <UIcon name="i-heroicons-home" class="size-5 mr-2" />
                Moj profil
            </NuxtLink>
            <NuxtLink class="flex items-center p-3 text-[#012436] font-medium bg-white focus:outline-none"
                :class="{ 'active !bg-[#D9F1FD]': activeTab === 'nav-address' }" to="/profile/address">
                <UIcon name="i-heroicons-map-pin" class="size-5 mr-2" />
                Adresa
            </NuxtLink>
            <NuxtLink class="flex items-center p-3 text-[#012436] font-medium bg-white focus:outline-none"
                :class="{ 'active !bg-[#D9F1FD]': activeTab === 'nav-order' }" to="/profile/orders">
                <UIcon name="i-heroicons-clipboard-document-list" class="size-5 mr-2" />
                Narudžbe
            </NuxtLink>
            <NuxtLink class="flex items-center p-3 text-[#012436] font-medium bg-white focus:outline-none"
                :class="{ 'active !bg-[#D9F1FD]': activeTab === 'nav-password' }" to="/profile/change-password">
                <UIcon name="i-heroicons-lock-closed" class="size-5 mr-2" />
                Promijeni lozinku
            </NuxtLink>

            <button
                class="flex items-center p-3 mt-10 text-[#012436] rounded-xl hover:bg-[#D9F1FD] font-medium bg-white focus:outline-none"
                @click="logoutUser">
                <UIcon name="i-heroicons-arrow-right-on-rectangle" class="size-5 mr-2" />
                Odjavi se
            </button>
        </div>
    </nav>
</template>
