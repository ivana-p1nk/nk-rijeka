<script setup lang="ts">
import { useCartStore } from '~/composables/useCart'
const cartStore = useCartStore()

import type { IUser } from '~/types/user'
const user = useSanctumUser() as Ref<IUser | null>
const isLoggedIn = computed(() => !!user.value)
</script>

<template>
  <div v-if="cartStore.cart_products.length > 0" class="lg:px-12 lg:py-10 py-6 px-8 bg-white rounded-2xl">
    <!-- DESKTOP HEADER -->
    <div class="hidden lg:grid lg:grid-cols-[1.2fr_1fr_1fr_1fr_40px] 2xl:grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 pb-2 mb-4 font-semibold text-gray-700 border-b">
      <div class="text-left">PROIZVOD</div>
      <div class="text-center">CIJENA</div>
      <div class="text-center">KOLIČINA</div>
      <div class="text-center">UKUPNO</div>
      <div></div>
    </div>

    <div
    v-for="(item, index) in cartStore.cart_products"
    :key="index"
    class="py-4 border-b lg:border-b"
    :class="{ 'border-b-0 lg:border-b': index === cartStore.cart_products.length - 1 }"
    >

        <!-- DESKTOP GRID -->
        <div class="hidden lg:grid lg:grid-cols-[1.2fr_1fr_1fr_1fr_40px] 2xl:grid-cols-[2fr_1fr_1fr_1fr_40px] items-center gap-4">
            <div class="flex flex-col 2xl:flex-row items-start gap-3 text-left">
                <img :src="item.gallery[0]" class="object-contain w-16 h-16" />
                <div>
                    <p class="font-bold font-saira text-base lg:text-h6-normal pb-3">{{ item.title }}</p>
                    <p v-if="item.sku" class="text-sm text-blue-900"><span class="font-bold">MODEL:</span> {{ item.sku }}</p>
                    <p v-if="item.variationName" class="text-sm text-blue-900"><span class="font-bold">VELIČINA:</span> {{ item.variationName }}</p>
                    <div v-if="item.textInput || item.numberInput" class="mt-2">
                    <p class="font-roboto text-body3 text-blue-600 font-bold">PERSONALIZIRANO</p>
                    <p class="font-roboto text-body3 text-gray-900"><span class="font-bold">IME:</span> {{ item.textInput }} - {{ item.textInputAddonPrice?.toFixed(2).replace('.', ',') }} €</p>
                    <p class="font-roboto text-body3 text-gray-900"><span class="font-bold">BROJ:</span> {{ item.numberInput }} - {{ item.numberInputAddonPrice?.toFixed(2).replace('.', ',') }} €</p>
                    </div>
                </div>
            </div>

            <p class="font-bold text-center">
            <template v-if="isLoggedIn && user?.role === 'member'">
                <span v-if="item.discountPrice">
                <span class="line-through text-blue-900 mr-2">{{ item.price.toFixed(2).replace('.', ',') }} €</span>
                <span class="text-blue-300">{{ item.discountPrice.toFixed(2).replace('.', ',') }} €</span>
                </span>
                <div v-else class="flex flex-col">
                <span class="line-through text-blue-900">{{ item.price.toFixed(2).replace('.', ',') }} €</span>
                <span class="text-blue-500">{{ item.member_price.toFixed(2).replace('.', ',') }} €</span>
                </div>
            </template>
            <template v-else>
                <span v-if="item.discountPrice" class="flex flex-col">
                <span class="line-through text-blue-900">{{ item.price.toFixed(2).replace('.', ',') }} €</span>
                <span class="text-blue-300">{{ item.discountPrice.toFixed(2).replace('.', ',') }} €</span>
                </span>
                <span v-else class="text-blue-900">{{ item.price.toFixed(2).replace('.', ',') }}€</span>
            </template>
            </p>

            <div class="flex justify-center items-center space-x-1 lg:space-x-2">
            <button class="btn-icon-secondary square-medium rounded-md border-[1.5px]" @click="cartStore.quantityDecrement(item, item.variationId)">
                <UIcon name="heroicons:minus" />
            </button>
            <input class="w-9 text-center bg-white border-blue-500 border-[1.5px] square-medium rounded-lg" type="text" :value="item.orderQuantity" disabled />
            <button class="btn-icon-secondary square-medium rounded-md border-[1.5px]" @click="cartStore.addCartProduct(item, item.variationId)">
                <UIcon name="heroicons:plus" />
            </button>
            </div>

            <div class="text-center font-semibold">
            {{ (item.orderQuantity * item.totalPrice).toFixed(2).replace('.', ',') }}€
            </div>

            <div class="btn-icon-secondary circle-medium">
            <UIcon
                name="heroicons:trash"
                class="h-4 cursor-pointer w-4 text-red-600"
                @click="cartStore.removeCartProduct(item, item.variationId)"
            />
            </div>
        </div>

        <!-- MOBILE LAYOUT -->
        <div class="grid grid-cols-[auto_1fr_auto] gap-3 lg:hidden items-stretch">
        
            <div>
                <img :src="item.gallery[0]" class="object-contain w-24 h-24" />
            </div>

            <div class="flex flex-col gap-2">
                <div>
                    <p class="font-bold">{{ item.title }}</p>
                    <p v-if="item.sku" class="text-sm text-blue-900"><span class="font-bold">MODEL:</span> {{ item.sku }}</p>
                    <p v-if="item.variationName" class="text-sm text-blue-900"><span class="font-bold">VELIČINA:</span> {{ item.variationName }}</p>
                </div>

                <div v-if="item.textInput || item.numberInput" class="text-sm">
                    <p class="text-blue-600 font-bold">PERSONALIZIRANO</p>
                    <p><span class="font-bold">IME:</span> {{ item.textInput }} - {{ item.textInputAddonPrice?.toFixed(2).replace('.', ',') }} €</p>
                    <p><span class="font-bold">BROJ:</span> {{ item.numberInput }} - {{ item.numberInputAddonPrice?.toFixed(2).replace('.', ',') }} €</p>
                </div>

                <div class="text-sm font-semibold">
                    <p>{{ item.orderQuantity }} x
                        {{
                        (isLoggedIn && user?.role === 'member' && item.member_price)
                            ? item.member_price.toFixed(2).replace('.', ',')
                            : (item.discountPrice || item.price).toFixed(2).replace('.', ',')
                        }} €
                    </p>
                </div>

                <div class="flex items-center gap-2">
                    <button class="btn-icon-secondary square-medium rounded-md border-[1.5px]" @click="cartStore.quantityDecrement(item, item.variationId)">
                        <UIcon name="heroicons:minus" />
                    </button>
                    <input class="w-9 text-center bg-white border-blue-500 border-[1.5px] square-medium rounded-lg" type="text" :value="item.orderQuantity" disabled />
                    <button class="btn-icon-secondary square-medium rounded-md border-[1.5px]" @click="cartStore.addCartProduct(item, item.variationId)">
                        <UIcon name="heroicons:plus" />
                    </button>
                </div>

                <div class="text-sm font-semibold">
                    <p><strong>Ukupno:</strong> {{ (item.orderQuantity * item.totalPrice).toFixed(2).replace('.', ',') }} €</p>
                </div>
            </div>

            <div class="flex items-center justify-center h-full">
                <div class="btn-icon-secondary circle-medium">
                    <UIcon
                        name="heroicons:trash"
                        class="h-4 w-4 cursor-pointer text-red-600"
                        @click="cartStore.removeCartProduct(item, item.variationId)"
                    />
                </div>
            </div>
        </div>
    
    </div>
  </div>

    <div v-else class="px-12 py-10 text-center bg-white shadow-lg rounded-2xl">
     <p>Tvoja košarica je prazna</p>
    </div>
</template>
