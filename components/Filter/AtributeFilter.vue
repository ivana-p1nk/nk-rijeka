<template>
    <div>
        <!-- Dugme za otvaranje filtera na mobilnim uređajima -->
        <button
            @click="isSidebarOpen = true"
            :class="[
                'group flex flex-row items-center justify-center  gap-2 uppercase filter-width w-full  transition-colors duration-300 md:hidden',
                isSidebarOpen ? 'btn-secondary-focus' : 'btn-secondary',
            ]"
        >
            <Icon
                name="mage:filter"
                :class="[
                    'icon-large transition-colors duration-300 group-active:text-white',
                    isSidebarOpen ? 'text-white' : 'text-gray-900',
                ]"
            />
            Filter
        </button>

        <!-- Sidebar za mobilne uređaje -->
        <USlideover v-model="isSidebarOpen" side="right" :ui="slideOverUI">
            <template #default>
                <div class="flex flex-col h-full bg-blue-00 shadow-lg">
                    <div class="w-full flex justify-end pt-6 px-4">
                        <button @click="isSidebarOpen = false">
                            <Icon name="line-md:close" class="medium text-gray-900" />
                        </button>
                    </div>
                    <div class="space-y-4 overflow-y-auto grow p-6">
                        <h1 class="text-h4-normal font-semibold font-saira mb-8 text-blue-900">Filter</h1>
                        <div v-for="filter in filterConfigs" :key="filter.key" class="w-full">
                            <USelect
                                v-model="filters[filter.key as FilterKey]"
                                :options="filter.options"
                                :ui="selectUI"
                                class="w-full -mt-2"
                            />
                        </div>
                        <hr />
                        <UButton
                            block
                            size="lg"
                            variant="solid"
                            :ui="{
                                base: 'text-white font-saira font-semibold',
                                variant: {
                                    solid: 'bg-blue-600 hover:bg-blue-700 active:bg-800',
                                },
                            }"
                            class="px-5 uppercase text-[15px] flex justify-center focus:outline-none focus:ring-0 active:bg-blue-800 transition-colors duration-200 font-saira font-semibold"
                            @click="applyFilters"
                        >
                            Primijeni filter
                        </UButton>
                    </div>
                </div>
            </template>
        </USlideover>

        <!-- Desktop prikaz filtera -->
        <div class="hidden md:flex gap-2 flex-wrap">
            <div v-for="filter in filterConfigs" :key="filter.key" class="w-full sm:w-48">
                <USelect
                    v-model="filters[filter.key as FilterKey]"
                    :options="filter.options"
                    :ui="selectUI"
                    class="w-full"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import type { IProduct } from '~/types/product'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{
    products: IProduct[]
    filters: Record<string, string>
}>()

const emit = defineEmits<{
    (e: 'update:filters', value: Record<FilterKey, string>): void
}>()

type FilterKey = 'size' | 'ageGender' | 'price'

const router = useRouter()
const route = useRoute()
const isSidebarOpen = ref(false)

const initialFilters = route.query as Partial<Record<FilterKey, string>>

const filters = reactive<Record<FilterKey, string>>({
    size: initialFilters.size ?? '',
    ageGender: initialFilters.ageGender ?? '',
    price: initialFilters.price ?? '',
})

watch(
    filters,
    () => {
        const query = { ...route.query }

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                query[key] = value
            } else {
                delete query[key]
            }
        })

        router.replace({ query })

        emit('update:filters', { ...filters })
    },
    { deep: true }
)

const availableVariations = ref<string[]>([])

onMounted(() => {
    const allVariations = props.products.flatMap((p) => p.variations || []).map((v) => v.packaging)
    availableVariations.value = Array.from(new Set(allVariations))
})

watch(
    () => props.products,
    (newProducts) => {
        if (availableVariations.value.length === 0 && newProducts.length > 0) {
            const allVariations = newProducts.flatMap((p) => p.variations || []).map((v) => v.packaging)
            availableVariations.value = Array.from(new Set(allVariations))
        }
    },
    { immediate: true }
)

const availablePriceRanges = computed(() => {
    const ranges = [
        { label: '0-15€', value: '0-15' },
        { label: '15-30€', value: '15-30' },
        { label: '30-50€', value: '30-50' },
        { label: '50-100€', value: '50-100' },
        { label: '100-150€', value: '100-150' },
        { label: '150-200€', value: '150-200' },
        { label: '200+€', value: '200-1000' },
    ]

    return [{ label: 'Cijena', value: '' }, ...ranges]
})

function applyFilters() {
    const query = { ...route.query }

    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            query[key] = value
        } else {
            delete query[key]
        }
    })

    router.replace({ query })
    emit('update:filters', { ...filters })
    isSidebarOpen.value = false
}

/*Konfiguracija USelect komponente*/
const filterConfigs = computed(() => [
    {
        key: 'size',
        label: 'Veličina',
        options: [{ label: 'Veličina', value: '' }, ...availableVariations.value.map((v) => ({ label: v, value: v }))],
    },
    {
        key: 'ageGender',
        label: 'Spol i dob',
        options: [
            { label: 'Spol i dob', value: '' },
            { label: 'Muškarci', value: 'muskarci' },
            { label: 'Žene', value: 'zene' },
            { label: 'Djeca', value: 'djeca' },
        ],
    },
    {
        key: 'price',
        label: 'Cijena',
        options: availablePriceRanges.value,
    },
])

const selectUI = {
    color: {
        white: {
            outline: `
            border border-gray-300
            bg-white
            text-black
            placeholder-black
            dark:bg-white
            dark:text-black
            dark:placeholder-black  
            shadow-none
            ring-0
            focus:ring-0
            focus:ring-blue-500
            `,
        },
    },
}

const slideOverUI = {
    wrapper: 'left-14',
    overlay: {
        base: 'fixed inset-0 z-1',
        background: 'bg-black/60',
    },
    content: 'fixed top-0 right-0 z-50 w-96 h-full bg-red-600 shadow-xl flex flex-col focus:outline-none',
}
</script>

<style>
.form-select {
    @apply text-black placeholder-black !important;
}

.dark .form-select {
    @apply text-black placeholder-black !important;
}
</style>
