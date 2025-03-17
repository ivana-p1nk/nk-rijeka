<script setup lang="ts">
	import { z } from 'zod';
	import type { FormSubmitEvent } from '#ui/types';

	type Schema = z.output<typeof schema>

	useSeoMeta({
		title: 'Prijava',
	})

	const { login } = useSanctumAuth();

	const schema = z.object({
		email: z.string({ message: 'Ovo polje je obavezno!' }),
		password: z.string({ message: 'Ovo polje je obavezno!' })
	})

	const state = reactive({
		email: undefined,
		password: undefined
	})

	const errors = ref({});
	const loading = ref(false);

	async function onSubmit (event: FormSubmitEvent<Schema>) {
		loading.value = true;
		try {
			await login(state);
			loading.value = false;
			navigateTo(`/profile`);
		} catch (e) {
			loading.value = false;
			console.log(e);
		}
	}

	const typePass = ref('password');
	const showPassword = () => {
		typePass.value = 'text';
	}
	const hidePassword = () => {
		typePass.value = 'password';
	}
</script>

<template>
  <section id="form" aria-labelledby="form" class="container justify-center pt-20 pb-32">

    <div class="pb-12 sm:mx-auto sm:w-full sm:max-w-7xl">
      <h2 class="text-4xl font-bold leading-9 tracking-tight text-center">Prijava</h2>
    </div>

    <UContainer :ui="{constrained: 'mx-auto w-full sm:max-w-2xl'}">
      <UCard>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

          <div class="text-red-500" v-for="(item, index) in errors">{{ item[0] }}</div>

          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Lozinka" name="password">
            <UInput v-model="state.password" :name="state.password" :type="typePass" :ui="{ icon: { trailing: { pointer: '' } } }">
				<template #trailing>
					<UButton
						v-show="typePass == 'password' && state.password !== undefined"
						color="gray"
						variant="link"
						icon="i-heroicons-eye"
						:padded="false"
						@click="showPassword"
					/>
					<UButton
						v-show="typePass == 'text' && state.password !== undefined"
						color="gray"
						variant="link"
						icon="i-heroicons-eye-slash"
						:padded="false"
						@click="hidePassword"
					/>
				</template>
			</UInput>
          </UFormGroup>

          <div>
            <NuxtLink to="/lost-password" class="text-sm text-cyan-800 hover:underline">Zaboravljena lozinka</NuxtLink>
          </div>

          <UButton :disabled="loading" :loading="loading" type="submit" class="disabled:bg-red-500 disabled:text-white">
            Prijavi se
          </UButton>
        </UForm>
      </UCard>
    </UContainer>
  </section>
</template>