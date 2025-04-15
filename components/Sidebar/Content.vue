<template>
    <div>
      <button @click="show = true" class="bg-blue-500 text-white px-4 py-2 rounded">
        Otvori
      </button>
  
      <Offcanvas  :isOpen="show" @close="show = false">
        <div>
            <div v-if="cartStore.cart_products.length > 0">
                <div
                v-for="(item, index) in cartStore.cart_products"
                :key="index"
                class="border-b"
                >
						<!-- PROIZVOD -->
						<div class="flex gap-3">
							<img :src="item.gallery[0]" class="object-contain w-24 h-24" />
							<div class="flex flex-col gap-4">
                                <p class="font-saira font-bold text-h6-normal text-blue-900">{{ item.title }}</p>
                                <div class="flex flex-col gap-1">
                                    <p class="font-roboto text-body3 text-gray-900"><span class="font-bold">MODEL:</span> TEST</p>
                                    <p class="font-roboto text-body3 text-gray-900"><span class="font-bold">BROJ: </span>{{ item.variationName }}</p>
							    </div>
                            </div>
                            <!-- DELETE -->
						<div>
							<UIcon name="heroicons:trash" class="h-6 ml-3 cursor-pointer w-7" @click="cartStore.removeCartProduct(item, item.variationId)" />
						</div>
                                
						</div>
						<!-- UKUPNO -->
						<div>
							{{ (item.orderQuantity * item.price).toFixed(2) }}
						</div>

						
					</div>
                    <p class="header-text text-red-300">{{ cartStore.totalPriceQuantity.total.toFixed(2) }} €</p>
				</div>
				<div v-else class="text-center">
					<p>Tvoja košarica je prazna</p>
				</div>
			</div>

            
      </Offcanvas >
    </div>
  </template>
  
  <script setup>
  import Offcanvas  from '~/components/Sidebar/Offcanvas.vue'
  import { ref } from 'vue'
  import { useCartStore } from '~/composables/useCart';

    const cartStore = useCartStore();
  
  const show = ref(false)
  </script>