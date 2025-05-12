<script setup lang="ts">
import type { IUser } from '~/types/user'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

useSeoMeta({ title: 'Moj profil' })

definePageMeta({
    title: 'Moj profil',
    middleware: 'sanctum:auth',
})


const { api } = useAxios()
type Schema = z.output<typeof schema>
const user = useSanctumUser() as Ref<IUser | null>
const toast = useToast()

useSeoMeta({
    title: 'Zaboravljena lozinka',
})

const schema = z.object({
    email: z.string({ message: 'Ovo polje je obavezno!' }).email('Invalid email'),
})

const state = reactive({
    email: user.value?.email,
})

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
    loading.value = true

    api.post('/forgot-password', event.data)
        .then(({ data }) => {
            loading.value = false
            toast.add({
                title: 'Uspješno Vam je poslan email!',
                color: 'green',
                timeout: 3000,
            })
        })
        .catch((err) => {
            loading.value = false
            toast.add({
                title: 'Error',
                description: 'Greška',
                color: 'red',
                timeout: 3000,
            })
        })
}
</script>

<template>
    <section class="py-40">
        <div class="container mx-auto">
            <div class="relative mx-10">
                <div class="flex flex-wrap">
                    <div class="w-full mb-8 lg:w-1/3 lg:mb-0">
                        <div class="lg:mr-10">
                            <ProfileNav activeTab="nav-password" />
                        </div>
                    </div>

                    <div class="w-full px-10 py-10 bg-white rounded lg:w-2/3 custom-shadow">
                        <div class="pb-12 sm:mx-auto sm:w-full sm:max-w-7xl">
                            <h2 class="text-4xl font-bold leading-9 tracking-tight text-center">Resetiranje lozinke</h2>
                        </div>

                        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                            <UFormGroup label="Email" name="email">
                                <UInput v-model="state.email" />
                            </UFormGroup>

                            <UButton
                                :disabled="loading"
                                type="submit"
                                class="disabled:bg-red-500 disabled:text-white btn btn-primary !bg-blue-600"
                            >
                                Pošalji email za resetiranje lozinke
                            </UButton>
                        </UForm>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
