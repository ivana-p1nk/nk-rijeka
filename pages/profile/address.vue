<script setup lang="ts">
import { z } from 'zod'
import type { IUser } from '~/types/user'

useSeoMeta({ title: 'Moj profil' })

definePageMeta({
    title: 'Moj profil',
    middleware: 'sanctum:auth',
})

const { api } = useAxios()
const toast = useToast()
const user = useSanctumUser() as Ref<IUser | null>

const state = reactive({
    firstName: user.value?.name?.split(' ')[0] || '',
    lastName: user.value?.name?.split(' ')[1] || '',
    company: user.value?.address?.company || '',
    country: user.value?.address?.state || '',
    city: user.value?.address?.city || '',
    zipCode: user.value?.address?.zip || '',
    address: user.value?.address?.address || '',
    phone: user.value?.address?.phone || '',
    email: user.value?.email || '',
})

const updateAddress = async () => {
    api.put(`/user-address/${user.value?.id}`, {
        name: `${state.firstName} ${state.lastName}`,
        email: state.email,
        company: state.company,
        state: state.country,
        city: state.city,
        zip: state.zipCode,
        address: state.address,
        phone: state.phone,
    })
        .then((res) => {
            toast.add({
                icon: 'solar:check-circle-broken',
                title: `Uspješno ažurirani podaci`,
                color: 'green',
            })
        })
        .catch((err) => {
            toast.add({
                icon: 'solar:check-circle-broken',
                title: `Greška prilikom ažuriranja podataka`,
                color: 'red',
            })
        })
}
</script>

<template>
    <section class="py-40" v-if="user">
        <div class="container mx-auto">
            <div class="relative mx-10">
                <div class="flex flex-wrap">
                    <div class="w-full mb-8 lg:w-1/3 lg:mb-0">
                        <div class="lg:mr-10">
                            <ProfileNav activeTab="nav-address" />
                        </div>
                    </div>

                    <div class="w-full px-10 py-10 bg-white rounded lg:w-2/3 custom-shadow">
                        <h1 class="text-2xl font-bold pb-10">ADRESA</h1>

                        <form @submit.prevent="updateAddress">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="firstName">Ime</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        v-model="state.firstName"
                                        class="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label for="lastName">Prezime</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        v-model="state.lastName"
                                        class="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label for="company">Firma</label>
                                    <input
                                        type="text"
                                        id="company"
                                        v-model="state.company"
                                        class="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label for="country">Država</label>
                                    <input
                                        type="text"
                                        id="country"
                                        v-model="state.country"
                                        class="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label for="city">Grad</label>
                                    <input
                                        type="text"
                                        id="city"
                                        v-model="state.city"
                                        class="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label for="zipCode">Poštanski broj</label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        v-model="state.zipCode"
                                        class="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label for="address">Adresa</label>
                                    <input
                                        type="text"
                                        id="address"
                                        v-model="state.address"
                                        class="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label for="phone">Telefon</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        v-model="state.phone"
                                        class="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label for="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        v-model="state.email"
                                        class="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary mt-5">Spremi</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
