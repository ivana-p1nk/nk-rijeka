<script setup lang="ts">
    import { z } from 'zod';
    import type { FormSubmitEvent } from '#ui/types';
    import { useCartStore } from '~/composables/useCart'

    const route = useRoute();
    const toast = useToast();
    const { logout } = useSanctumAuth();
    const cartStore = useCartStore()

    const { api } = useAxios();
    type Schema = z.output<typeof schema>

    useSeoMeta({
        title: 'Nova lozinka',
    });

    const schema = z.object({
		email: z.string({ message: 'Ovo polje je obavezno!' }).email('Invalid email'),
        password: z.string({ message: 'Ovo polje je obavezno!' }).min(8, 'Must be at least 8 characters'),
        password_confirmation: z.string({ message: 'Ovo polje je obavezno!' }).min(8, 'Must be at least 8 characters')
	})

	const state = reactive({
		token: route.params.slug,
		email: typeof route.query.email === 'string' ? route.query.email : undefined,
		password: undefined,
		password_confirmation: undefined,
	})

	const loading = ref(false);

	async function onSubmit (event: FormSubmitEvent<Schema>) {
        loading.value = true;

		api.post("/reset-password", state).then(({data}) => {
            loading.value = false;
            toast.add({
                title: 'Uspješno ažurirana lozinka!',
                color: 'green',
                timeout: 3000,
            })
            logoutUser();
		}).catch(err => {
			loading.value = false;
            toast.add({
                title: 'Error',
                description: 'Greška',
                color: 'red',
                timeout: 3000,
            })
		})
	}

    const logoutUser = async () => {
        cartStore.setUserRole(null)
        await logout()
    }
</script>

<template>
    <section id="form" aria-labelledby="form" class="container mx-auto justify-center pt-20 pb-32">

        <div class="pb-12 sm:mx-auto sm:w-full sm:max-w-7xl">
            <h2 class="text-4xl font-bold leading-9 tracking-tight text-center">Postavi novu lozinku</h2>
        </div>

        <UContainer :ui="{constrained: 'mx-auto w-full sm:max-w-2xl'}">
            <UCard>
                <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

                    <UFormGroup label="Email" name="email">
                        <UInput v-model="state.email" type="email" />
                    </UFormGroup>

                    <UFormGroup label="Nova lozinka" name="password">
                        <UInput v-model="state.password" type="password" />
                    </UFormGroup>

                    <UFormGroup label="Ponovi lozinku" name="password_confirmation">
                        <UInput v-model="state.password_confirmation" type="password" />
                    </UFormGroup>

                    <UButton :disabled="loading" type="submit" class="disabled:bg-red-500 disabled:text-white btn btn-primary !bg-blue-600">
                        Pošalji
                    </UButton>
                </UForm>
            </UCard>
        </UContainer>
    </section>
</template>