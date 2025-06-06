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
                <p class="font-normal text-blue-900 font-roboto text-body2 pb-1 pt-10">
					<NuxtLink class="text-blue-400 link-color" to="/"> Početna / </NuxtLink>
					<span>Moj račun</span>
				</p>
				<h1 class="font-saira font-medium text-h1-normal text-gray-900 pb-6 md:pb-10">
					Moj račun
				</h1>
                
                <div class="flex flex-wrap">
                    <div class="w-full mb-8 lg:w-1/3 lg:mb-0">
                        <div class="lg:mr-10">
                            <ProfileNav activeTab="nav-password" />
                        </div>
                    </div>

                    <div class="w-full px-10 py-10 bg-white rounded lg:w-2/3 custom-shadow">
                        <div class="pb-12 sm:mx-auto sm:w-full sm:max-w-7xl">
                            <h2 class="text-2xl font-bold uppercase">Resetiranje lozinke</h2>
                        </div>
 
                        <UForm :schema="schema" :state="state" class="space-y-4 max-w-xl mx-auto" @submit="onSubmit">
                            <UFormGroup label="Email" name="email" :ui="{
                                label: {
                                    base: 'text-[#111827] font-roboto font-normal text-sm',
                                },
                            }">
                                <UInput v-model="state.email" variant="outline" size="lg" />
                            </UFormGroup>

                            <UButton :disabled="loading" :loading="loading" type="submit" block size="lg" :ui="{
                                base: '!font-saira !bg-blue-600 uppercase !font-bold !text-white !rounded-[6px]',
                            }">
                                Pošalji email za resetiranje lozinke
                            </UButton>
                        </UForm>
                    </div>
                </div>
            </div>
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
    box-shadow: 0 0 0 1px #009FF5 !important;
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