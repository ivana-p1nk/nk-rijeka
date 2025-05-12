<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useCartStore } from '~/composables/useCart'
import type { IUser } from '~/types/user'

type Schema = z.output<typeof schema>

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

definePageMeta({
    layout: false,
})

useSeoMeta({
    title: 'Prijava',
})

const { login } = useSanctumAuth()

const schema = z.object({
    email: z.string({ message: 'Ovo polje je obavezno!' }),
    password: z.string({ message: 'Ovo polje je obavezno!' }),
})

const state = reactive({
    email: undefined,
    password: undefined,
})

const loading = ref(false)

const user = useSanctumUser() as Ref<IUser | null>

async function onSubmit(event: FormSubmitEvent<Schema>) {
    loading.value = true
    try {
        await login(state)

        if (user.value?.role == 'member') {
            cartStore.setUserRole('member');
        } else {
            cartStore.setUserRole(null)
        }

        loading.value = false
        navigateTo(`/profile`)
    } catch (e) {
        loading.value = false
        toast.add({
            title: 'Error',
            description: "Greška kod prijave, provjerite svoje podatke.",
            color: 'red',
            timeout: 3000,
        })
        console.log(e)
    }
}

const typePass = ref('password')
const showPassword = () => {
    typePass.value = 'text'
}
const hidePassword = () => {
    typePass.value = 'password'
}

const goToPreviousPage = () => {
    router.go(-1)
}
</script>

<template>
    <section id="form" aria-labelledby="form" class="container mx-auto justify-center pt-20 pb-32">
        <div class="absolute top-7 left-7">
            <button @click="goToPreviousPage" class="uppercase btn-secondary py-3 xs flex items-center w-fit h-fit">
                <Icon name="i-heroicons-chevron-left" />
            </button>
        </div>

        <div class="pb-12 sm:mx-auto sm:w-full sm:max-w-7xl">
            <img src="/assets/images/grbrijeka.svg" alt="logo" class="w-20 h-20 mx-auto" />
            <h2 class="text-5xl mt-8 font-medium uppercase font-saira leading-9 tracking-tight text-center">Prijava</h2>

            <p class="text-center pt-4">
                Nemaš račun?
                <NuxtLink to="/register" class="font-bold underline uppercase link-plavi"> Registriraj se </NuxtLink>
            </p>
        </div>

        <UContainer :ui="{ constrained: 'mx-auto w-full sm:max-w-lg' }">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Korisničko ime ili email" required name="email" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                    <UInput v-model="state.email" :name="state.email" placeholder="Korisničko ime" variant="outline"
                        size="lg" />
                </UFormGroup>

                <UFormGroup label="Lozinka" required name="password" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                    <UInput v-model="state.password" :name="state.password" placeholder="Lozinka" size="lg"
                        :type="typePass" :ui="{ icon: { trailing: { pointer: '' } } }">
                        <template #trailing>
                            <UButton v-show="typePass == 'password' && state.password !== undefined" color="gray"
                                variant="link" icon="i-heroicons-eye" :padded="false" @click="showPassword" />
                            <UButton v-show="typePass == 'text' && state.password !== undefined" color="gray"
                                variant="link" icon="i-heroicons-eye-slash" :padded="false" @click="hidePassword" />
                        </template>
                    </UInput>
                </UFormGroup>

                <UButton :disabled="loading" :loading="loading" type="submit" block size="lg" :ui="{
                    base: '!font-saira !bg-blue-600 uppercase !font-bold !text-white !rounded-[6px]',
                }">
                    Prijavi se
                </UButton>

                <div>
                    <NuxtLink to="/lost-password" class="text-sm font-bold text-[#0083C9] hover:underline">
                        Izgubili ste lozinku?
                    </NuxtLink>
                </div>
            </UForm>
        </UContainer>
    </section>

    <UNotifications />
</template>
