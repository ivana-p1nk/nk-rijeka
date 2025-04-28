<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

type Schema = z.output<typeof schema>

const { api } = useAxios()
const router = useRouter()
const toast = useToast()

definePageMeta({
    layout: false,
})

useSeoMeta({
    title: 'Registracija',
})

const schema = z.object({
    email: z.string({ message: 'Ovo polje je obavezno!' }),
    name: z.string({ message: 'Ovo polje je obavezno!' }),
    password: z.string({ message: 'Ovo polje je obavezno!' }),
    password_confirmation: z.string({ message: 'Ovo polje je obavezno!' }),
})

const state = reactive({
    barcode: undefined,
    name: undefined,
    email: undefined,
    password: undefined,
    password_confirmation: undefined,
})

const errors = ref({})
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
    loading.value = true

    console.log(state)

    if (state.password !== state.password_confirmation) {
        toast.add({
            color: 'red',
            title: 'Greška',
            description: 'Lozinke se ne podudaraju.',
            timeout: 2500,
        })
        loading.value = false
        return
    }

    api.post('/register', state)
        .then(({ data }) => {
            loading.value = false

            if (data.status === 'error') {
                errors.value = data.errors
                toast.add({
                    color: 'red',
                    title: 'Greška',
                    description: data.message,
                    timeout: 2500,
                })
                return
            }

            if (data === 'ok') {
                errors.value = <
                    {
                        email: string
                        name: string
                        password: string
                        password_confirmation: string
                    }
                >{}
                toast.add({
                    title: 'Uspešno ste se registrirali',
                    timeout: 2500,
                })
                navigateTo('/login')
            }
        })
        .catch((err) => {
            loading.value = false
            errors.value = err.response.data.errors
            toast.add({
                color: 'red',
                title: 'Greška',
                description: 'Nešto nije kako treba, javite se korisničkoj podršci.',
                timeout: 2500,
            })
        })
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

        <div class="pb-12 mx-auto">
            <img src="/assets/images/grbrijeka.svg" alt="logo" class="w-20 h-20 mx-auto" />
            <h2 class="text-5xl mt-8 font-medium uppercase font-saira leading-9 tracking-tight text-center">
                Kreiraj račun
            </h2>

            <p class="text-center pt-4">
                Pridruži se zajednici navijača i ljubitelja HNK Rijeka

                <span class="block">
                    Već imaš račun?
                    <NuxtLink to="/login" class="font-bold underline uppercase link-plavi"> PRIJAVI SE </NuxtLink>
                </span>
            </p>
        </div>

        <UContainer :ui="{ constrained: 'mx-auto w-full sm:max-w-lg' }">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <div class="text-red-500" v-for="(item, index) in errors">
                    {{ item[0] }}
                </div>

                <UFormGroup
                    label="Članski Barkod"
                    name="barcode"
                    :ui="{
                        label: {
                            base: 'text-[#111827] font-roboto font-normal text-sm',
                        },
                    }"
                >
                    <UInput v-model="state.barcode" :name="state.barcode" placeholder="Kod" size="lg" />
                </UFormGroup>

                <UFormGroup
                    label="Ime i prezime"
                    required
                    name="name"
                    :ui="{
                        label: {
                            base: 'text-[#111827] font-roboto font-normal text-sm',
                        },
                    }"
                >
                    <UInput v-model="state.name" :name="state.name" placeholder="Ime i prezime" size="lg" />
                </UFormGroup>

                <UFormGroup
                    label="Adresa e-pošte"
                    required
                    name="email"
                    :ui="{
                        label: {
                            base: 'text-[#111827] font-roboto font-normal text-sm',
                        },
                    }"
                >
                    <UInput v-model="state.email" :name="state.email" placeholder="E-pošta" size="lg" />
                </UFormGroup>

                <UFormGroup
                    label="Lozinka"
                    required
                    name="password"
                    :ui="{
                        label: {
                            base: 'text-[#111827] font-roboto font-normal text-sm',
                        },
                    }"
                >
                    <UInput
                        v-model="state.password"
                        :name="state.password"
                        placeholder="Lozinka"
                        size="lg"
                        :type="typePass"
                        :ui="{ icon: { trailing: { pointer: '' } } }"
                    >
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
                <UFormGroup
                    label="Potvrdi lozinku"
                    required
                    name="password_confirmation"
                    :ui="{
                        label: {
                            base: 'text-[#111827] font-roboto font-normal text-sm',
                        },
                    }"
                >
                    <UInput
                        v-model="state.password_confirmation"
                        :name="state.password_confirmation"
                        placeholder="Potvrdi lozinku"
                        size="lg"
                        :type="typePass"
                        :ui="{ icon: { trailing: { pointer: '' } } }"
                    >
                        <template #trailing>
                            <UButton
                                v-show="typePass == 'password' && state.password_confirmation !== undefined"
                                color="gray"
                                variant="link"
                                icon="i-heroicons-eye"
                                :padded="false"
                                @click="showPassword"
                            />
                            <UButton
                                v-show="typePass == 'text' && state.password_confirmation !== undefined"
                                color="gray"
                                variant="link"
                                icon="i-heroicons-eye-slash"
                                :padded="false"
                                @click="hidePassword"
                            />
                        </template>
                    </UInput>
                </UFormGroup>

                <p>
                    Vaši će se osobni podaci koristiti za pružanje boljeg iskustvu na web stranici, za upravljanje
                    pristupom vašem računu i za druge svrhe opisane u našoj
                    <NuxtLink to="/politika-kolacica" class="link-plavi underline"> pravilima privatnosti</NuxtLink>.
                </p>

                <UButton
                    :disabled="loading"
                    :loading="loading"
                    type="submit"
                    block
                    size="lg"
                    :ui="{
                        base: '!font-saira !bg-blue-600 uppercase !font-bold !text-white !rounded-[6px]',
                    }"
                >
                    Registriraj se
                </UButton>
            </UForm>
        </UContainer>
    </section>

    <UNotifications />
</template>
