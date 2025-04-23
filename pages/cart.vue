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

const applyCoupon = (coupon: string) => {
	toast.add({
		title: 'Test kupon',
		description: coupon,
		timeout: 1000,
	})
}

const loadingForm = ref<boolean>(false);

const formRef = ref();
const terms = ref(false);
const termValidationMessage = ref('');

const updateTerms = () => {
	terms.value = !terms.value;
}

const schema = z.object({
	firstName: z.string({ required_error: "Ime je obavezan podatak" }).min(1, 'Ime je obavezan podatak'),
	lastName: z.string({ required_error: "Prezime je obavezan podatak" }).min(1, 'Prezime je obavezan podatak'),
	company: z.string().optional(),
	country: z.string({ required_error: "Država je obavezan podatak" }).min(1, 'Država je obavezan podatak'),
	city: z.string({ required_error: "Grad je obavezan podatak" }).min(1, 'Grad je obavezan podatak'),
	zipCode: z.string({ required_error: "Poštanski broj je obavezan podatak" }).min(1, 'Poštanski broj je obavezan podatak'),
	address: z.string({ required_error: "Adresa je obavezan podatak" }).min(1, 'Adresa je obavezan podatak'),
	phone: z.string({ required_error: "Telefon je obavezan podatak" }).min(10, 'Telefon mora imati najmanje 10 znakova'),
	email: z.string({ required_error: "Email je obavezan podatak" }).email('Pogrešna email adresa'),
	orderNote: z.string().optional(),

	anotherAddress: z.boolean(),
	anotherCompany: z.string().optional(),
	anotherCountry: z.string().optional(),
	anotherCity: z.string().optional(),
	anotherZipCode: z.string().optional(),
	anotherStreetAddress: z.string().optional(),
	anotherPhone: z.string().optional(),
}).refine((data) => {
	if (!data.anotherAddress) return true;

	return !!(data.anotherCountry?.length &&
		data.anotherCity?.length &&
		data.anotherZipCode?.length &&
		data.anotherStreetAddress?.length);
}, {
	message: "Sva polja za dodatnu adresu su obavezna kada je uključena opcija 'Dostavi na drugu adresu'",
	path: ['anotherAddress'],
});

type Schema = z.output<typeof schema>

const state = reactive({
	firstName: undefined,
	lastName: undefined,
	company: undefined,
	country: undefined,
	city: undefined,
	zipCode: undefined,
	address: undefined,
	phone: undefined,
	email: undefined,
	orderNote: undefined,

	anotherAddress: false,
	anotherCompany: undefined,
	anotherCountry: undefined,
	anotherCity: undefined,
	anotherZipCode: undefined,
	anotherStreetAddress: undefined,
});

const submitForm = () => formRef.value?.submit()

async function handleOnSubmit(event: FormSubmitEvent<Schema>) {
	termValidationMessage.value = '';
	if (!terms.value) {
		termValidationMessage.value = 'Ovo polje je obavezno';
		return;
	};

	loadingForm.value = true;

	const params = {
		user: user.value != null ? user.value : null,
		data: event.data,
		items: cartStore.cart_products,
		total: cartStore.totalPriceQuantity.total.toFixed(2),
	}

	api.post("/create-orders", { ...params }).then(({ data }) => {
		if (data.status != 'error') {
			toast.add({
				title: 'Narudžba uspješno kreirana!',
				color: 'green',
				timeout: 2000,
			})
			cartStore.clear_cart();
			navigateTo(`/`);
		} else {
			toast.add({
				title: 'greška, javite se korisničkoj podršci.',
				color: 'red',
				timeout: 3000,
			})
		}

		loadingForm.value = false;
	}).catch(err => {
		toast.add({
			title: 'greška',
			color: 'red',
			timeout: 3000,
		})

		loadingForm.value = false;
	})
}
</script>

<template>
	<div class="py-20 mx-10 mt-20 xl:mx-auto max-w-7xl">
		<h1 class="mb-10 font-medium text-blue-900 font-saira text-h1-normal">Košarica</h1>

		<div class="grid grid-cols-12 gap-4" v-if="cartStore.cart_products.length > 0">
			<div class="col-span-12">
				<h2 class="font-medium text-blue-900 font-saira text-h2-normal">Trenutna narudžba</h2>
			</div>
			<div class="col-span-7 h-fit">
				<CartListProducts />

				<h2 class="pt-8 pb-4 font-medium text-blue-900 font-saira text-h2-normal">Adresa za naplatu</h2>

				<div class="px-12 py-10 bg-white shadow-lg rounded-2xl">
					<h2 class="text-xl font-bold text-blue-900 font-saira">Podaci o kupcu</h2>

					<div class="w-full pt-4">
						<UForm ref="formRef" @submit="handleOnSubmit" :schema="schema" :state="state">
							<CartBillingForm :form="state" />
						</UForm>
					</div>
				</div>
			</div>
			<div class="col-span-5">
				<CartTotal @useCoupon="applyCoupon" :submitForm="submitForm" :term="updateTerms"
					:termMessage="termValidationMessage" :loadingForm="loadingForm" />
			</div>
		</div>
		<div v-else class="flex flex-col justify-center items-center py-20">
			<h1 class="text-2xl font-bold text-blue-900 font-saira">Košarica je prazna</h1>
			<p class="text-gray-500">Dodaj proizvode u košaricu da bi nastavili s kupnjom</p>
			<NuxtLink to="/products" class="btn-primary large mt-10">Nastavi s kupnjom</NuxtLink>
		</div>
	</div>
</template>