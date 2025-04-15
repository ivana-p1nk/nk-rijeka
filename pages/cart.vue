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
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	company: z.string().optional(),
	country: z.string().optional(),
	city: z.string().min(1, 'City is required'),
	zipCode: z.string().min(1, 'ZIP code is required'),
	address: z.string().min(1, 'Street address is required'),
	phone: z.string().min(10, 'Phone number must be at least 10 characters'),
	email: z.string().email('Invalid email address'),
	orderNote: z.string().optional(),
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

	api.post("/create-orders", {...params}).then(({data}) => {
		if(data.status != 'error') {
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

		<div class="grid grid-cols-12 gap-4">
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
				<CartTotal 
					@useCoupon="applyCoupon" 
					:submitForm="submitForm" 
					:term="updateTerms" 
					:termMessage="termValidationMessage" 
					:loadingForm="loadingForm" 
				/>
			</div>
		</div>
	</div>
</template>