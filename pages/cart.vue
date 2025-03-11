<script setup>
    import { useCartStore } from "~/composables/useCart";
    
    useSeoMeta({
        title: 'Košarica',
    })
    
    const cartStore = useCartStore();
</script>

<template>
    <div class="p-10 py-20 mx-auto mt-40 rounded-md bg-slate-500 max-w-7xl">
      <h1 class="mb-8 text-3xl font-bold">Košarica</h1>
  
      <div v-if="cartStore.cart_products.length > 0">
        <div
          v-for="item in cartStore.cart_products"
          :key="`${item.id}-${item.variationId}`"
          class="flex flex-col items-start justify-between gap-4 py-4 border-b sm:gap-0 sm:items-center sm:flex-row"
        >
          <NuxtLink :to="`/products/${item.id}`">
            <div class="flex items-center">
              <!-- <img
                :src="item.gallery[0]"
                :alt="item.title"
                class="object-cover w-16 h-16 mr-4 rounded-md"
              /> -->
              <div>
                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
  
                <!-- Prikaz varijacije -->
                <p v-if="item.variationName" class="text-sm text-white">
                  Pakiranje: {{ item.variationName }}
                </p>
  
                <!-- Prikaz cijene s popustom, ako postoji -->
                <div v-if="item.price_discount > 0">
                  <span class="text-lg font-bold text-red-500">
                    {{ item.price_discount.toFixed(2) }} €{{ " " }}
                  </span>
                  <span
                    class="font-normal text-white line-through text-md"
                  >
                    {{ item.price }}€
                  </span>
                </div>
                <span
                  v-else
                  class="mb-4 text-lg font-bold text-green-600"
                >
                  {{ item.price.toFixed(2) }} €
                </span>
              </div>
            </div>
          </NuxtLink>
          <div class="flex items-center">
            <div class="flex items-center p-1 space-x-1 bg-white rounded-lg">
              <button
                class="px-3 py-1 rounded text-background"
                @click="cartStore.quantityDecrement(item, item.variationId)"
              >
                <UIcon name="heroicons:minus" class="text-red-500" />
              </button>
              <input
                class="w-5 text-center bg-red-500 text-background"
                type="text"
                :value="item.orderQuantity"
                :v-model="item.orderQuantity"
                disabled
              />
              <button
                class="px-3 py-1 rounded text-background"
                @click="cartStore.addCartProduct(item, item.variationId)"
              >
              <UIcon name="heroicons:plus" class="text-red-500" />
              </button>
            </div>

            <UIcon name="heroicons:trash" class="h-6 ml-3 text-red-600 cursor-pointer w-7" @click="cartStore.removeCartProduct(item, item.variationId)" />
          </div>
        </div>
        <div class="mt-8 text-right">
          <p class="mb-10 text-xl font-bold">
            Ukupno: {{ cartStore.totalPriceQuantity.total.toFixed(2) }} €
          </p>
          <NuxtLink
            to="/checkout"
            class="px-4 py-2 text-white transition-colors rounded-lg bg-green"
          >
            Nastavi na naplatu
          </NuxtLink>
        </div>
      </div>
      <div v-else class="text-center">
        <p>Tvoja košarica je prazna</p>
      </div>
      
    </div>
  </template>