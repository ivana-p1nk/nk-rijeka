<script setup lang="ts">
	import { z } from 'zod';
	import type { FormSubmitEvent } from '#ui/types'
	import { useCartStore } from "~/composables/useCart";

	useSeoMeta({
		title: 'Košarica',
	})

	const user = useSanctumUser();
	const { api } = useAxios()
	const toast = useToast()
	const cartStore = useCartStore();

	const coupon = ref('');
	const useCoupon = () => {
		console.log('ok')
		toast.add({
			title: 'O fuck jea',
			description: 'bibibibibi',
			timeout: 1000,
		})
	}

	const terms = ref(false);

	const schema = z.object({
		firstName: z.string().min(1, 'First name is required'),
		lastName: z.string().min(1, 'Last name is required'),
		company: z.string().optional(),
		country: z.string().optional(),
		address: z.string().min(1, 'Street address is required'),
		apartment: z.string().optional(),
		city: z.string().min(1, 'City is required'),
		state: z.string().min(1, 'State is required'),
		zipCode: z.string().min(1, 'ZIP code is required'),
		phone: z.string().min(10, 'Phone number must be at least 10 characters'),
		email: z.string().email('Invalid email address'),
		orderNote: z.string().optional(),
	});

	const countries = ['United States', 'Canada', 'Mexico']

	type Schema = z.output<typeof schema>

	const state = reactive({
		firstName: undefined,
		lastName: undefined,
		company: undefined,
		country: undefined,
		address: undefined,
		apartment: undefined,
		city: undefined,
		state: countries[0],
		zipCode: undefined,
		phone: undefined,
		email: undefined,
		orderNote: undefined,
	});

	async function handleOnSubmit (event: FormSubmitEvent<Schema>) {
		const params = {
			user: user.value != null ? user.value : null,
			data: event.data,
			items: cartStore.cart_products,
			total: cartStore.totalPriceQuantity.total.toFixed(2),
		}

		console.log(params);
		
		toast.add({
			title: 'test slanje',
			timeout: 1000,
		})

		// api.post("/create-orders", {...params}).then(({data}) => {
		// 	if(data == 'ok'){
		// 		cartStore.clear_cart();
		// 		navigateTo(`/order`);
		// 	}
		// }).catch(err => {
		// 	toast.add({
		// 		title: 'test slanje'
		// 	})
		// })
	}
</script>

<template>
	<div class="py-20 mx-5 mt-20 xl:mx-auto max-w-7xl">
		<h1 class="mb-10 font-medium text-blue-900 font-saira text-h1-normal">Košarica</h1>
		
		<div class="grid grid-cols-12 gap-4">
			<div class="col-span-12">
				<h2 class="font-medium text-blue-900 font-saira text-h2-normal">Trenutna narudžba</h2>
			</div>
			<div class="col-span-7 h-fit">
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
				<div v-else class="px-12 py-10 text-center bg-white shadow-lg rounded-2xl">
					<p>Tvoja košarica je prazna</p>
				</div>

				<h2 class="pt-8 pb-4 font-medium text-blue-900 font-saira text-h2-normal">Adresa za naplatu</h2>

				<div class="px-12 py-10 bg-white shadow-lg rounded-2xl">
					<h2 class="text-xl font-bold text-blue-900 font-saira">Podaci o kupcu</h2>

					<div class="w-full pt-4">
						<UForm @submit="handleOnSubmit" :schema="schema" :state="state" class="grid grid-cols-2 gap-4">
							<!-- First Name -->
							<UFormGroup label="Ime" name="firstName" class="col-span-2 sm:col-span-1">
								<UInput v-model="state.firstName" placeholder="Ime" required />
							</UFormGroup>
	
							<!-- Last Name -->
							<UFormGroup label="Prezime" name="lastName" class="col-span-2 sm:col-span-1">
								<UInput v-model="state.lastName" placeholder="Prezime" />
							</UFormGroup>
	
							<!-- Company Name (optional) -->
							<UFormGroup label="Naziv firme (opcionalno)" name="company" class="col-span-2">
								<UInput v-model="state.company" placeholder="Naziv firme" />
							</UFormGroup>
	
							<!-- Country/Region -->
							<UFormGroup label="Država" name="country" class="col-span-2">
								<UInput v-model="state.country" placeholder="Croatia" />
							</UFormGroup>
	
							<!-- City -->
							<UFormGroup label="Grad" name="city" class="col-span-2">
								<UInput v-model="state.city" placeholder="Grad" />
							</UFormGroup>

							<!-- ZIP/Postcode -->
							<UFormGroup label="Poštanski broj" name="zipCode" class="col-span-2">
								<UInput v-model="state.zipCode" placeholder="Poštanski broj" />
							</UFormGroup>

							<!-- Street Address -->
							<UFormGroup label="Adresa" name="address" class="col-span-2 space-y-2">
								<UInput v-model="state.address" placeholder="Ime ulice i broj" />
							</UFormGroup>
	
							<!-- Phone -->
							<UFormGroup label="Telefon" name="phone" class="col-span-2">
								<UInput v-model="state.phone" placeholder="Phone" />
							</UFormGroup>
	
							<!-- Email -->
							<UFormGroup label="Email" name="email" class="col-span-2">
								<UInput v-model="state.email" placeholder="Email" type="email" />
							</UFormGroup>
	
							<!-- Order Notes -->
							<UFormGroup label="Order Notes (optional)" name="orderNote" class="col-span-2">
								<UTextarea v-model="state.orderNote" placeholder="Notes about your order, e.g. special instructions for delivery." />
							</UFormGroup>
						</UForm>
					</div>
				</div>
			</div>
			<div class="col-span-5">
				<div class="p-10 rounded-lg bg-[#D9F1FD]">
					<p class="pb-10 text-xl font-bold">VAŠA NARUDŽBA</p>

					<p class="flex items-center justify-between text-xl font-normal">
						<span>Ukupno:</span> <span>{{ cartStore.totalPriceQuantity.total.toFixed(2) }} €</span>
					</p>
					<p class="flex items-center justify-between text-xl font-normal">
						<span>Dostava:</span> <span>Besplatna dostava iznad 26,54 €</span>
					</p>
					<p class="flex items-center justify-between text-xl font-normal">
						<span>Dostava:</span> <span>Besplatna dostava iznad 26,54 €</span>
					</p>

					<div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

					<div class="flex items-center gap-2">
						<UInput icon="cuida:ticket-outline" v-model="coupon" size="md" class="w-full" variant="outline" />
						<button @click="useCoupon" class="uppercase btn-secondary xs w-36">
							Iskoristi kupon
						</button>
					</div>
					
					<div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

					<p class="flex items-center justify-between text-xl font-normal">
						<span>Ukupno za plaćanje:</span> <span>{{ cartStore.totalPriceQuantity.total.toFixed(2) }} €</span>
					</p>

					<div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

					<p>
						Vaši osobni podaci koristit će se za obradu vaše narudžbe, pružanja boljeg iskustva na web stranici i u 
						druge svrhe opisane u našoj <a href="#" class="text-blue-500 underline">pravilima privatnosti</a>.
					</p>

					<UCheckbox class="mt-4">
						<template #label>
							<span class="italic">
								Prihvaćam i slažem se sa 
								<a href="#" class="text-blue-500 underline">uvjetima prodaje i pravilima primatnosti</a>
								<span class="text-red-500"> *</span>
							</span>
						</template>
					</UCheckbox>

					<button class="w-full px-5 py-3 mt-4 font-bold text-white uppercase rounded-lg" style="background: linear-gradient(79.46deg, #0083C9 3.18%, #58B6E7 107.55%);">
						naruči i plati
					</button>
				</div>
			</div>
		</div>
	</div>
</template>