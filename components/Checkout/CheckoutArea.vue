<script setup lang="ts">
	import { z } from 'zod';
	import type { FormSubmitEvent } from '#ui/types'
	import { useCartStore } from "~/composables/useCart";

	const cartStore = useCartStore();
    const { api } = useAxios()

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
			// user: user.value,
			data: event.data,
			items: cartStore.cart_products,
			total: cartStore.totalPriceQuantity.total.toFixed(2).replace('.', ','),
		}

		api.post("/create-orders", {...params}).then(({data}) => {
			if(data == 'ok'){
				cartStore.clear_cart();
				navigateTo(`/order`);
			}
		}).catch(err => {
			console.log('Pogreška pri slanju narudzbe!');
		})
	}
</script>

<template>
  <section class="py-10 mx-4">
    <div class="container mx-auto">
      <!-- Checkout form -->
      <div class="flex flex-col gap-8 lg:flex-row">
        <UForm @submit="handleOnSubmit" :schema="schema" :state="state" class="w-full">
          <div class="flex flex-col gap-8 lg:flex-row">
            <!-- Billing details -->
            <div class="w-full lg:w-7/12">
              <div class="p-6 bg-white rounded-lg shadow-md">
                <h3 class="mb-4 text-xl font-semibold text-background">Billing Details</h3>
                <CheckoutBilling :form="state" :countries="countries" />
              </div>
            </div>

            <!-- Checkout order -->
            <div class="w-full lg:w-5/12">
              <CheckoutOrder :terms="terms" />
            </div>
          </div>
        </UForm>
      </div>
    </div>
  </section>
</template>