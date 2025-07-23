<script setup lang="ts">
import type { IUser } from '~/types/user'
// const { logout } = useSanctumAuth()
// import type { IOrder } from '~/types/order'

const user = useSanctumUser() as Ref<IUser | null>
// const config = useRuntimeConfig()
// const { api } = useAxios()

// const loading = ref(true)
// const orders = ref<IOrder[]>([])

// const fetchOrders = async () => {
//     loading.value = true

//     try {
//         // @ts-ignore
//         const response = await api.get(`/orders/${user.value.id}`)

//         // @ts-ignore
//         orders.value = response.data
//     } catch (error) {
//         console.error(error)
//         orders.value = []
//     } finally {
//         loading.value = false
//     }
// }

// onMounted(fetchOrders)
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

                <a
                    href="https://nk-rijeka.hr/klub/clanstvo/"
                    target="_blank"
                    class="inline-block uppercase btn-secondary py-1 px-4"
                >
                    Učlani se
                </a>
            </div>

            <div>
                <div v-if="user?.role != 'admin'" class="flex items-center gap-2 font-bold">
                    <p>Status:</p>
                    <p v-if="user?.role == 'customer'" class="text-[#D93434] uppercase">Neaktivno članstvo</p>
                    <p v-else class="text-[#34d947] uppercase">Aktivno članstvo</p>
                </div>

                <hr class="my-4 border-gray-200 max-w-20" />

                <p>
                    Iz svoje nadzorne ploče možete pregledati svoje posljednje narudžbe, urediti svoje adrese za naplatu
                    i dostavu i urediti svoju lozinku i detalje korisničkog računa.
                </p>
            </div>

            <!-- <div class="flex flex-wrap gap-10">
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
            </div> -->
        </div>
    </section>
</template>
