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
            <NuxtLink to="/">
                <img src="/assets/images/grbrijeka.svg" alt="logo" class="w-20 h-20 mx-auto" />
            </NuxtLink>
            <h2 class="text-5xl mt-8 font-medium uppercase font-saira leading-9 tracking-tight text-center">
                Račun kreiran
            </h2>

        </div>

        <div class="text-center max-w-[376px] mx-auto">
            <img src="/assets/images/racun-kreiran.jpg" class="w-full rounded-md">
            <p class="px-5 text-body2 font-bold text-blue-900 py-4">Kako bi završili registraciju vašeg računa aktivirajte link koji je poslan na vašu email adresu.</p>
            <p class="px-5 text-body3 text-blue-900 pb-4">Lozinku i email adresu možete promjeniti u postavkama računa</p>
            <hr class="border-t-[1.4px] border-gray-200" />
            <p class="px-5 text-body3 font-bold text-blue-500 py-4">Hvala Vam na podršci kluba</p>
            <NuxtLink
                to="/login"
                class="block w-full px-5 py-3 uppercase text-white font-bold font-saira bg-blue-600 hover:bg-blue-700 rounded-[6px] text-center transition-colors duration-200 ease-in-out"
                >
                Prijavi se
            </NuxtLink>
        </div>
         
    </section>

</template>


<style scoped>
    :deep(.form-input:focus),
    :deep(.form-input:focus-visible),
    :deep(.form-select:focus),
    :deep(.form-select:focus-visible),
    :deep(textarea:focus),
    :deep(textarea:focus-visible) {
        --tw-ring-color: #009FF5 !important;
        --tw-border-color: #009FF5 !important;
        border-color: #009FF5 !important;
    }

    :deep(.form-input),
    :deep(.form-select),
    :deep(textarea) {
        padding-top: 10px;
        padding-bottom: 10px;
        height: 42px;
    }
</style>