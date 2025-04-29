<script setup lang="ts">
const { logout } = useSanctumAuth()
import type { IUser } from '~/types/user'
import type { IOrder } from '~/types/order'

const config = useRuntimeConfig()
const user = useSanctumUser() as Ref<IUser | null>

const loading = ref(true)
const orders = ref<IOrder[]>([])

const fetchOrders = async () => {
    loading.value = true

    try {
        // @ts-ignore
        const { data: orderData } = await useFetch(`${config.public.url}/orders/${user.value.id}`)

        // @ts-ignore
        orders.value = orderData.value
    } catch (error) {
        console.error(error)
        orders.value = []
    } finally {
        loading.value = false
    }
}

onMounted(fetchOrders)

const statusColors = {
    processing: 'amber',
    shipped: 'blue',
    delivered: 'lime',
    cancelled: 'red',
}

const logoutUser = async () => {
    await logout()
}
</script>

<template>
    <section class="w-full">
        <div class="flex flex-col items-start space-y-10">
            <div class="flex items-center justify-between w-full">
                <div class="relative flex flex-col items-start gap-2 md:flex-row md:items-center">
                    <UAvatar
                        size="2xl"
                        :alt="user?.name"
                        class="shadow"
                        :ui="{
                            size: {
                                '2xl': 'h-16 w-16 text-2xl object-cover',
                            },
                        }"
                    />
                    <h4 v-if="user" class="text-xl font-semibold text-left text-background">{{ user.name ?? '' }}!</h4>
                </div>

                <div class="flex items-center gap-2">
                    <a
                        href="https://nk-rijeka.hr/klub/clanstvo/"
                        target="_blank"
                        class="inline-block uppercase btn-secondary py-1 px-4"
                    >
                        Učlani se
                    </a>

                    <button
                        class="px-5 py-1 text-white transition bg-red-500 rounded-md hover:bg-red-600"
                        @click="logoutUser"
                    >
                        Odjavi se
                    </button>
                </div>
            </div>

            <div>
                <div class="flex items-center gap-2 font-bold">
                    <p>Status:</p>
                    <p class="text-[#D93434] uppercase">Neaktivno članstvo</p>
                </div>

                <hr class="my-4 border-gray-200 max-w-20" />

                <p>
                    Iz svoje nadzorne ploče možete pregledati svoje posljednje narudžbe, urediti svoje adrese za naplatu
                    i dostavu i urediti svoju lozinku i detalje korisničkog računa.
                </p>
            </div>

            <div class="flex flex-wrap gap-10">
                <UCard>
                    <template #header>
                        <h4 class="text-xl font-semibold text-left text-background">Ukupni broj narudžbi</h4>
                    </template>
                    <p class="font-bold text-background">
                        {{ orders.length }}
                    </p>
                </UCard>

                <UCard>
                    <template #header>
                        <h4 class="text-xl font-semibold text-left text-background">Narudžbe u procesu</h4>
                    </template>
                    <p class="font-bold text-background">
                        {{ orders.filter((order) => order.status === 'processing').length }}
                    </p>
                </UCard>

                <UCard>
                    <template #header>
                        <h4 class="text-xl font-semibold text-left text-background">Završene narudžbe</h4>
                    </template>
                    <p class="font-bold text-background">
                        {{ orders.filter((order) => order.status === 'delivered').length }}
                    </p>
                </UCard>

                <UCard>
                    <template #header>
                        <h4 class="text-xl font-semibold text-left text-background">Otkazane narudžbe</h4>
                    </template>
                    <p class="font-bold text-background">
                        {{ orders.filter((order) => order.status === 'cancelled').length }}
                    </p>
                </UCard>
            </div>
        </div>
    </section>
</template>
