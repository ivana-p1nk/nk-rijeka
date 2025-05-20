<script setup lang="ts">
import { useCartStore } from '~/composables/useCart'
const cartStore = useCartStore()

import type { IUser } from '~/types/user'
const user = useSanctumUser() as Ref<IUser | null>
const isLoggedIn = computed(() => !!user.value)
</script>

<template>
    <div v-if="cartStore.cart_products.length > 0" class="md:px-12 md:py-10 py-5 px-3 bg-white rounded-2xl">
        <div class="grid grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 pb-2 mb-4 font-semibold text-gray-700 border-b">
            <div>PROIZVOD</div>
            <div>CIJENA</div>
            <div>KOLIČINA</div>
            <div>UKUPNO</div>
            <div></div>
        </div>

        <div
            v-for="(item, index) in cartStore.cart_products"
            :key="index"
            class="grid items-center grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 py-4 border-b"
        >
            <!-- PROIZVOD -->
            <div class="flex items-center gap-3">
                <img :src="item.gallery[0]" class="object-contain hidden md:block w-16 h-16" />
                <div>
                    <p class="font-bold font-saira text-base md:text-h6-normal pb-3">{{ item.title }}</p>

                    <p v-if="item.sku != null" class="text-sm text-blue-900">
                        <span class="font-bold">MODEL:</span> {{ item.sku }}
                    </p>

                    <p v-if="item.variationName" class="text-sm text-blue-900">
                        <span class="font-bold">VELIČINA:</span> {{ item.variationName }}
                    </p>

                    <div v-if="item.textInput || item.numberInput" class="mt-2">
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
            </div>

            <p class="font-bold">
                <template v-if="isLoggedIn && user?.role === 'member'">
                    <span v-if="item.discountPrice">
                        <span class="line-through text-blue-900 mr-2">
                            {{ item.price.toFixed(2).replace('.', ',') }}
                            €
                        </span>
                        <span class="text-blue-300"> {{ item.discountPrice.toFixed(2).replace('.', ',') }} € </span>
                    </span>
                    <div v-else class="flex flex-col">
                        <span class="line-through text-blue-900">
                            {{ item.price.toFixed(2).replace('.', ',') }}
                            €
                        </span>
                        <span class="text-blue-500">
                            {{ item.member_price.toFixed(2).replace('.', ',') }}
                            €
                        </span>
                    </div>
                </template>
                <template v-else>
                    <span v-if="item.discountPrice" class="flex flex-col">
                        <span class="line-through text-blue-900">
                            {{ item.price.toFixed(2).replace('.', ',') }}
                            €
                        </span>
                        <span class="text-blue-300"> {{ item.discountPrice.toFixed(2).replace('.', ',') }} € </span>
                    </span>
                    <span v-else class="text-blue-900"> {{ item.price.toFixed(2).replace('.', ',') }}€ </span>
                </template>
            </p>

            <!-- KOLIČINA -->
            <div class="flex items-center space-x-1 md:space-x-2">
                <div class="flex items-center p-0 md:p-1 space-x-1 rounded-lg">
                    <button class="btn-icon-secondary square-medium rounded-md border-[1.5px]" @click="cartStore.quantityDecrement(item, item.variationId)">
                        <UIcon name="heroicons:minus" />
                    </button>
                    <input
                        class="w-9 text-center bg-white border-blue-500 border-[1.5px] square-medium rounded-lg"
                        type="text"
                        :value="item.orderQuantity"
                        :v-model="item.orderQuantity"
                        disabled
                    />
                    <button class="btn-icon-secondary square-medium rounded-md border-[1.5px]" @click="cartStore.addCartProduct(item, item.variationId)">
                        <UIcon name="heroicons:plus" />
                    </button>
                </div>
            </div>

            <!-- UKUPNO -->
            <div v-if="item.orderQuantity && item.totalPrice">
                {{ (item.orderQuantity * item.totalPrice).toFixed(2).replace('.', ',') }}€
            </div>

            <!-- DELETE -->
            <div class="btn-icon-secondary circle-medium">
                <UIcon
                    name="heroicons:trash"
                    class="h-4 cursor-pointer w-4 text-red-600"
                    @click="cartStore.removeCartProduct(item, item.variationId)"
                />
            </div>
        </div>
    </div>
    <div v-else class="px-12 py-10 text-center bg-white shadow-lg rounded-2xl">
        <p>Tvoja košarica je prazna</p>
    </div>
</template>
