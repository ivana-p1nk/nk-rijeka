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
                class="flex font-saira items-center p-3 text-blue-900 font-medium bg-white rounded-tl-xl rounded-tr-xl uppercase focus:outline-none"
                :class="{ 'active !bg-blue-50': activeTab === 'nav-profile' }" to="/profile">
                <UIcon name="tdesign:user-circle" class="size-5 mr-2 text-blue-500" />
                PROFIL
            </NuxtLink>
            <NuxtLink class="flex font-saira items-center p-3 text-blue-900 font-medium bg-white uppercase focus:outline-none"
                :class="{ 'active !bg-blue-50': activeTab === 'nav-address' }" to="/profile/address">
                <UIcon name="i-heroicons-map-pin" class="size-5 mr-2 text-blue-500" />
                Adresa
            </NuxtLink>
            <NuxtLink class="flex font-saira items-center p-3 text-blue-900 font-medium bg-white uppercase focus:outline-none"
                :class="{ 'active !bg-blue-50': activeTab === 'nav-order' }" to="/profile/orders">
                <UIcon name="streamline:ticket-1" class="size-5 mr-2 text-blue-500" />
                Narudžbe
            </NuxtLink>
            <NuxtLink class="flex font-saira items-center p-3 text-blue-900 font-medium bg-white uppercase focus:outline-none"
                :class="{ 'active !bg-blue-50': activeTab === 'nav-password' }" to="/profile/change-password">
                <UIcon name="i-heroicons-lock-closed" class="size-5 mr-2 text-blue-500" />
                Promijeni lozinku
            </NuxtLink>

            <button
                class="flex items-center p-3 mt-10 text-blue-900 rounded-xl hover:bg-[#D9F1FD] font-medium bg-white uppercase focus:outline-none"
                @click="logoutUser">
                <UIcon name="uiw:login" class="size-5 mr-2 text-blue-500" />
                Odjavi se
            </button>
        </div>
    </nav>
</template>
