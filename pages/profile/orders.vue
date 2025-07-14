<script setup lang="ts">
import type { IOrder } from '~/types/order'

useSeoMeta({ title: 'Moj profil' })

definePageMeta({
    title: 'Moj profil',
    middleware: 'sanctum:auth',
})

const config = useRuntimeConfig()
const user = useSanctumUser()

const loading = ref(true)
const orders = ref<IOrder[]>([])

const fetchOrders = async () => {
    loading.value = true

    try {
        // @ts-ignore
        const { data: orderData, status } = await useFetch(`${config.public.url}/orders/${user.value.id}`, {
            headers: {
                'Authorization': `Bearer ${config.public.token}`
            }
        })

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

const columns = [
    { key: 'order_number', label: 'Narudžba' },
    { key: 'status', label: 'Status' },
    { key: 'total_price', label: 'Cijena' },
    { key: 'date', label: 'Datum' },
]

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
    if (!loading.value) {
        return orders.value.slice((page.value - 1) * pageCount, page.value * pageCount)
    }
    return []
})

const statusColors = {
    processing: 'amber',
    shipped: 'blue',
    delivered: 'lime',
    cancelled: 'red',
}

const expand = ref({
    openedRows: [orders.value[0]],
    row: {},
})

watch(orders, () => {
    if (page.value > pageCount) {
        page.value = pageCount
    }
})
</script>

<template>
    <section class="py-40">
        <div class="container mx-auto">
            <div class="relative mx-5">
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
                            <ProfileNav activeTab="nav-order" />
                        </div>
                    </div>

                    <div class="w-full px-3 py-4 md:px-10 md:py-10 bg-white rounded lg:w-2/3 custom-shadow">
                        <h1 class="text-2xl font-bold pb-10">NARUDŽBE</h1>

                        <div>
                            <div v-if="loading != true && orders.length === 0">
                                <p class="text-background">Nema dostupnih narudžbi.</p>
                            </div>
                            <div v-else>
                                <UTable v-model:expand="expand" :rows="rows" :columns="columns" :loading="loading">
                                    <template #status-data="{ row }">
                                        <UBadge size="xs" :label="row.status" :color="statusColors[row.status]" />
                                    </template>
                                    <template #total_price-data="{ row }">
                                        <p>{{ row.total_price }} €</p>
                                    </template>
                                    <template #expand="{ row }">
                                        <div class="px-20 text-sm text-background">
                                            <div
                                                class="py-4 border-b border-gray-500"
                                                v-for="(item, index) in row.item_orders"
                                                :key="index"
                                            >
                                                <p>Naziv proizvoda: {{ item.product.title }}</p>
                                                <p>Cijena: {{ item.price }} €</p>
                                                <p>Količina: {{ item.quantity }}</p>
                                                <div v-if="item.personalization_price > 0" class="mt-2">
                                                    <p>Cijena personalizacije: {{ item.personalization_price }} €</p>
                                                    <p>
                                                        Broj inputa: {{ item.number_input }} -
                                                        {{ item.number_input_price }} €
                                                    </p>
                                                    <p>
                                                        Tekst inputa: {{ item.text_input }} -
                                                        {{ item.text_input_price }} €
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </UTable>
                                <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                                    <UPagination
                                        v-model="page"
                                        :page-count="pageCount"
                                        :total="orders.length"
                                        size="sm"
                                        show-last
                                        show-first
                                        :active-button="{ variant: 'outline', color: 'gray' }"
                                        :inactive-button="{ color: 'gray' }"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
