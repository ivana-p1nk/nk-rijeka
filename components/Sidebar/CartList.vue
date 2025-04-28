<template>
    <div>
        <!-- košarica DEKSTOP -->
        <button @click="show = true" class="hidden lg:inline-block">
            <UChip
                :text="cartStore.totalPriceQuantity.quantity"
                size="2xl"
                inset
                :ui="{
                    base: 'mx-2 -my-1 ring-0',
                    background: 'bg-gold-50 dark:bg-gold-50 dark:text-white text-white text-2xs',
                }"
                class="rounded-3xl flex items-center gap-2 py-[7px] px-4 bg-blue-500 text-white"
            >
                <p class="header-text hover:text-white">
                    {{ cartStore.totalPriceQuantity.total.toFixed(2).replace('.', ',') }}
                    €
                </p>
                <Icon name="ci:shopping-cart-01" class="text-white" />
            </UChip>
        </button>

        <!-- košarica MOBILE -->
        <button @click="show = true" class="inline-block lg:hidden">
            <UChip
                :text="cartStore.totalPriceQuantity.quantity"
                size="lg"
                inset
                :ui="{
                    base: 'ring-0 !-top-1 py-2 px-[6px]',
                    background: 'bg-gold-50 dark:bg-gold-50 dark:text-white text-white text-2xs',
                }"
                class="flex items-center gap-2 px-2 py-2 text-white bg-blue-500 rounded-3xl"
            >
                <Icon name="ci:shopping-cart-01" class="text-white" />
            </UChip>
        </button>

        <!-- Sadržaj sidebara-->
        <Offcanvas :isOpen="show" @close="show = false">
            <div>
                <div v-if="cartStore.cart_products.length > 0" class="flex flex-col gap-4">
                    <div v-for="(item, index) in cartStore.cart_products" :key="index" class="border-b pb-4">
                        <div class="grid gap-3" style="grid-template-columns: 96px 1fr 38px">
                            <!-- PRVI STUPAC: Slika proizvoda-->
                            <NuxtLink :to="`/products/${item.id}`" @click="show = false">
                                <img :src="item.gallery[0]" class="object-contain w-24 h-24" />
                            </NuxtLink>

                            <!-- DRUGI STUPAC: Detalji o proizvodu -->
                            <div class="flex flex-col gap-4">
                                <p class="font-saira font-bold text-h6-normal text-blue-900">
                                    {{ item.title }}
                                </p>
                                <div class="flex flex-col gap-1">
                                    <p class="font-roboto text-body3 text-gray-900">
                                        <span class="font-bold">MODEL:</span>
                                        TEST
                                    </p>
                                    <p
                                        v-if="item.variationId && item.variations"
                                        class="font-roboto text-body3 text-gray-900"
                                    >
                                        <span class="font-bold">VELIČINA:</span>
                                        {{ item.variations.find((v) => v.id === item.variationId)?.packaging }}
                                    </p>

                                    <div v-if="item.textInput || item.numberInput">
                                        <p class="font-roboto text-body3 text-blue-600">
                                            <span class="font-bold"> PERSONALIZIRANO </span>
                                        </p>
                                        <p class="font-roboto text-body3 text-gray-900">
                                            <span class="font-bold">IME:</span>
                                            {{ item.textInput }}
                                            -
                                            {{ item.textInputAddonPrice?.toFixed(2).replace('.', ',') }} €
                                        </p>
                                        <p class="font-roboto text-body3 text-gray-900">
                                            <span class="font-bold">BROJ:</span>
                                            {{ item.numberInput }}
                                            -
                                            {{ item.numberInputAddonPrice?.toFixed(2).replace('.', ',') }} €
                                        </p>
                                    </div>
                                </div>
                                <!-- dvojna cijena -->
                                <div>
                                    <p class="font-bold">
                                        {{ item.orderQuantity }} x

                                        <template v-if="isLoggedIn && user?.role === 'member'">
                                            <span class="line-through text-blue-900 mr-2">
                                                {{ item.price.toFixed(2).replace('.', ',') }}
                                                €
                                            </span>
                                            <span class="text-blue-500">
                                                {{ item.member_price.toFixed(2).replace('.', ',') }}
                                                €
                                            </span>
                                        </template>
                                        <template v-else>
                                            <span class="line-through text-blue-900 mr-2">
                                                {{ item.price.toFixed(2).replace('.', ',') }}
                                                €
                                            </span>
                                            <span class="text-blue-500">
                                                {{ item.discountPrice?.toFixed(2).replace('.', ',') }}
                                                €
                                            </span>
                                        </template>
                                    </p>
                                </div>
                                <!-- Količina -->
                                <div class="flex items-center space-x-2">
                                    <div class="flex items-center p-1 space-x-1">
                                        <button
                                            class="btn-icon-secondary square-medium rounded-md border-[1.5px]"
                                            @click="cartStore.quantityDecrement(item, item.variationId)"
                                        >
                                            <UIcon name="heroicons:minus" />
                                        </button>
                                        <input
                                            class="bg-white border-blue-500 border-[1.5px] square-medium rounded-lg text-center"
                                            type="text"
                                            :value="item.orderQuantity"
                                            :v-model="item.orderQuantity"
                                            disabled
                                        />
                                        <button
                                            class="btn-icon-secondary square-medium rounded-md border-[1.5px]"
                                            @click="cartStore.addCartProduct(item, item.variationId)"
                                        >
                                            <UIcon name="heroicons:plus" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- TREĆI STUPAC: Gumb za brisanje proizvoda-->
                            <div class="flex items-center justify-end">
                                <button
                                    class="btn-icon-secondary circle-medium"
                                    @click="
                                        () => {
                                            cartStore.removeCartProduct(item, item.variationId)
                                        }
                                    "
                                >
                                    <UIcon name="heroicons:trash" class="h-4 cursor-pointer w-4 text-red-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="border-b pb-4 grid grid-cols-2" style="grid-template-columns: 2fr 100px">
                        <p class="font-saira font-bold text-h6-normal text-blue-900 text-center pl-12">Ukupno:</p>
                        <p class="font-saira font-bold text-h6-normal text-blue-900 text-right">
                            {{ cartStore.totalPriceQuantity.total.toFixed(2).replace('.', ',') }}
                            €
                        </p>
                    </div>
                    <div>
                        <NuxtLink to="/cart" class="btn-primary large uppercase block text-center"
                            >Pregledaj košaricu i naruči</NuxtLink
                        >
                    </div>
                </div>
                <div v-else class="text-center">
                    <p>Tvoja košarica je prazna</p>
                </div>
            </div>
        </Offcanvas>
    </div>
</template>

<script setup lang="ts">
import Offcanvas from '~/components/Sidebar/Offcanvas.vue'
import { ref } from 'vue'
import { useCartStore } from '~/composables/useCart'

import type { IUser } from '~/types/user'
const user = useSanctumUser() as Ref<IUser | null>
const isLoggedIn = computed(() => !!user.value)

const cartStore = useCartStore()
const show = ref(false)
</script>
