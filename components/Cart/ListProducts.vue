<script setup lang="ts">
import { useCartStore } from '~/composables/useCart'
const cartStore = useCartStore()
</script>

<template>
    <div v-if="cartStore.cart_products.length > 0" class="px-12 py-10 bg-white shadow-lg rounded-2xl">
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
                <img :src="item.gallery[0]" class="object-contain w-16 h-16" />
                <div>
                    <p class="font-bold font-saira text-h6-normal pb-3">{{ item.title }}</p>

                    <p class="text-sm text-blue-900"><span class="font-bold">ŠIFRA:</span> TEST</p>

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
                        </p>
                        <p class="font-roboto text-body3 text-gray-900">
                            <span class="font-bold">BROJ:</span>
                            {{ item.numberInput }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Prikaz cijene s popustom, ako postoji -->
            <div v-if="item.price_discount > 0">
                <span class="text-lg font-bold text-red-500">
                    {{ item.price_discount.toFixed(2).replace('.', ',') }} €{{ ' ' }}
                </span>
                <span class="font-normal text-white line-through text-md">
                    {{ item.price.toFixed(2).replace('.', ',') }} €
                </span>
            </div>
            <span v-else class="mb-4 text-lg font-bold text-green-600">
                {{ item.price.toFixed(2).replace('.', ',') }} €
            </span>

            <!-- KOLIČINA -->
            <div class="flex items-center space-x-2">
                <div class="flex items-center p-1 space-x-1 rounded-lg bg-slate-100">
                    <button class="px-3 py-1 rounded" @click="cartStore.quantityDecrement(item, item.variationId)">
                        <UIcon name="heroicons:minus" />
                    </button>
                    <input
                        class="w-5 text-center"
                        type="text"
                        :value="item.orderQuantity"
                        :v-model="item.orderQuantity"
                        disabled
                    />
                    <button class="px-3 py-1 rounded" @click="cartStore.addCartProduct(item, item.variationId)">
                        <UIcon name="heroicons:plus" />
                    </button>
                </div>
            </div>

            <!-- UKUPNO -->
            <div>{{ (item.orderQuantity * item.price).toFixed(2).replace('.', ',') }} €</div>

            <!-- DELETE -->
            <div>
                <UIcon
                    name="heroicons:trash"
                    class="h-6 ml-3 cursor-pointer w-7"
                    @click="cartStore.removeCartProduct(item, item.variationId)"
                />
            </div>
        </div>
    </div>
    <div v-else class="px-12 py-10 text-center bg-white shadow-lg rounded-2xl">
        <p>Tvoja košarica je prazna</p>
    </div>
</template>
