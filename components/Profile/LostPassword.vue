<script setup lang="ts">
    import { z } from 'zod';
    import type { FormSubmitEvent } from '#ui/types';

    const { api } = useAxios(true);
    type Schema = z.output<typeof schema>

    useSeoMeta({
        title: 'Zaboravljena lozinka',
    });

    const schema = z.object({
		email: z.string({ message: 'Ovo polje je obavezno!' }).email('Invalid email'),
	})

	const state = reactive({
		email: undefined,
	})

    const errors = ref('');
	const loading = ref(false);
    const message = ref('');

	async function onSubmit (event: FormSubmitEvent<Schema>) {
        loading.value = true;

        errors.value = '';
        message.value = '';

		api.post("/forgot-password", event.data).then(({data}) => {
            message.value = data.status;
            loading.value = false;
		}).catch(err => {
			loading.value = false;
            errors.value = err.response.data.errors.email[0];
		})
	}
</script>

<template>
    <section id="form" aria-labelledby="form" class="container justify-center pt-20 pb-32">

        <div class="pb-12 sm:mx-auto sm:w-full sm:max-w-7xl">
            <h2 class="text-4xl font-bold leading-9 tracking-tight text-center">Resetiranje lozinke</h2>
        </div>

        <UContainer :ui="{constrained: 'mx-auto w-full sm:max-w-2xl'}">
            <UCard>
                <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <div class="text-red-500" v-if="errors">{{ errors }}</div>

                    <UFormGroup label="Email" name="email">
                        <UInput v-model="state.email" />
                    </UFormGroup>

                    <p class="text-green" v-if="message != ''">{{ message }}</p>

                    <UButton :disabled="loading" type="submit" class="disabled:bg-red-500 disabled:text-white">
                        Pošalji email za resetiranje lozinke
                    </UButton>
                </UForm>
            </UCard>
        </UContainer>
    </section>
</template>