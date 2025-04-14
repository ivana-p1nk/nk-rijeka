<script setup>
	import { useCartStore } from "~/composables/useCart";

	useSeoMeta({
		title: 'Košarica',
	})

	const cartStore = useCartStore();
</script>

<template>
	<div class="py-20 mx-5 mt-20 xl:mx-auto max-w-7xl">
		<h1 class="mb-10 font-medium text-blue-900 font-saira text-h1-normal">Košarica</h1>
		
		<div class="grid grid-cols-12 gap-4">
			<div class="col-span-12">
				<h2 class="font-medium text-blue-900 font-saira text-h2-normal">Trenutna narudžba</h2>
			</div>
			<div class="col-span-7 px-12 py-10 bg-white shadow-lg rounded-2xl">
				<div v-if="cartStore.cart_products.length > 0">
					<div class="grid grid-cols-[2fr_1fr_1fr_1fr_40px] pb-2 mb-4 font-semibold text-gray-700 border-b">
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
							<p class="font-bold">{{ item.title }}</p>
							<p class="text-sm text-gray-500">MODEL: TEST</p>
							<p class="text-sm text-gray-500">{{ item.variationName }}</p>
							</div>
						</div>

						<!-- Prikaz cijene s popustom, ako postoji -->
						<div v-if="item.price_discount > 0">
							<span class="text-lg font-bold text-red-500">
								{{ item.price_discount.toFixed(2) }} €{{ " " }}
							</span>
							<span
								class="font-normal text-white line-through text-md"
							>
								{{ item.price.toFixed(2) }} €
							</span>
						</div>
						<span
							v-else
							class="mb-4 text-lg font-bold text-green-600"
						>
							{{ item.price.toFixed(2) }} €
						</span>

						<!-- KOLIČINA -->
						<div class="flex items-center space-x-2">
							<div class="flex items-center p-1 space-x-1 rounded-lg bg-slate-100">
								<button
									class="px-3 py-1 rounded"
									@click="cartStore.quantityDecrement(item, item.variationId)"
								>
									<UIcon name="heroicons:minus"  />
								</button>
								<input
									class="w-5 text-center"
									type="text"
									:value="item.orderQuantity"
									:v-model="item.orderQuantity"
									disabled
								/>
								<button
									class="px-3 py-1 rounded"
									@click="cartStore.addCartProduct(item, item.variationId)"
								>
									<UIcon name="heroicons:plus"  />
								</button>
							</div>
						</div>

						<!-- UKUPNO -->
						<div>
							{{ (item.orderQuantity * item.price).toFixed(2) }}
						</div>

						<!-- DELETE -->
						<div>
							<UIcon name="heroicons:trash" class="h-6 ml-3 cursor-pointer w-7" @click="cartStore.removeCartProduct(item, item.variationId)" />
						</div>
					</div>
				</div>
				<div v-else class="text-center">
					<p>Tvoja košarica je prazna</p>
				</div>
			</div>
			<div class="col-span-5">
				<div class="p-10 rounded-lg bg-[#D9F1FD]">
					<p>VAŠA NARUDŽBA</p>
				</div>
			</div>
		</div>
	</div>
</template>