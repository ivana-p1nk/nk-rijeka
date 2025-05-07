<script setup lang="ts">
import type { ICategory } from '@/types/category'
import type { IProduct } from '@/types/product'

const props = defineProps<{
    category: ICategory
    parentCategory?: ICategory
    products: IProduct[]
    filteredProducts: IProduct[]
    activeFilters: Record<string, string>
    sort: string
    page: number
    totalPages: number
}>()

const emit = defineEmits<{
    (e: 'update:activeFilters', value: Record<string, string>): void
    (e: 'update:sort', value: string): void
    (e: 'update:page', value: number): void
}>()

const sort = ref(props.sort)
const page = ref(props.page)

watch(sort, (value) => {
    emit('update:sort', value)
})

watch(page, (value) => {
    emit('update:page', value)
})

const route = useRoute()
const { catslug, slug } = route.params

const subcategories = computed(() => {
    return props.parentCategory?.sub_categories ?? props.category.sub_categories ?? []
})
</script>

<template>
    <div class="pb-16 mb-8 border-b border-1 border-gray-200">
        <div class="pb-10 lg:pb-16 mb-8 border-b border-1 border-gray-200">
            <p class="font-normal text-blue-900 font-roboto text-body2">
                <NuxtLink class="text-blue-400 link-color" to="/">Početna / </NuxtLink>
                <template v-if="parentCategory">
                    <NuxtLink class="text-blue-400 link-color" :to="`/categories/${catslug}`">
                        {{ parentCategory.title }} /
                    </NuxtLink>
                </template>
                <span>{{ category.title }}</span>
            </p>

            <p class="pt-1 pb-8 text-h1-normal font-medium uppercase text-blue-900 font-saira">
                {{ category.title }}
            </p>

            <!-- Subkategorije -->
            <div class="flex flex-col lg:flex-row flex-wrap gap-5 md:gap-3">
                <div class="w-full lg:w-auto flex flex-wrap gap-2">
                    <div v-if="subcategories.length" class="flex flex-wrap gap-2">
                        <div v-for="(item, index) in subcategories" :key="index">
                            <NuxtLink
                                v-if="item.slug"
                                :to="`/categories/${catslug}/${item.slug}`"
                                :class="[
                                    'btn-secondary uppercase small px-5 inline-block',
                                    { active: slug === item.slug },
                                ]"
                            >
                                {{ item.title }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Filteri -->
                <div
                    class="w-full lg:flex-1 flex flex-col sm:flex-row flex-wrap gap-2 justify-start lg:justify-end items-start"
                >
                    <FilterAtributeFilter
                        :products="products"
                        :filters="activeFilters"
                        @update:filters="emit('update:activeFilters', $event)"
                    />
                </div>
            </div>
        </div>

        <!-- Proizvodi -->
        <div class="col-span-1 products md:col-span-4 mt-8">
            <div class="flex flex-row justify-between">
                <p class="text-body2 text-neutralBlue-950">Prikazujemo {{ filteredProducts.length }} proizvoda</p>

                <USelect
                    v-model="sort"
                    :options="[
                        { value: 'Najnoviji', label: 'Poredaj po najnovijem' },
                        { value: 'popular', label: 'Poredaj po popularnosti' },
                        { value: 'S nižom cijenom', label: 'Poredaj po cijeni: od najniže do najviše' },
                        { value: 'S višom cijenom', label: 'Poredaj po cijeni: od najviše do najniže' },
                    ]"
                    class="border border-gray-300 px-3 py-2 rounded text-sm"
                />
            </div>

            <div
                v-if="filteredProducts.length > 0"
                class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8"
            >
                <ProductCard
                    v-for="(product, index) in filteredProducts"
                    :key="index"
                    :product="product"
                    class="w-full"
                />
            </div>
            <div v-else class="pb-12 text-body2 text-neutralBlue-950">
                Nažalost, trenutno nema dostupnih proizvoda u ovoj kategoriji.
            </div>

            <!-- PAGINACIJA -->
            <div
                class="flex justify-center mt-10 gap-1 pt-8 border-t border-neutralBlue-200"
                v-if="props.totalPages > 1"
            >
                <button
                    @click="page--"
                    :disabled="page <= 1"
                    class="px-3 py-3 bg-white rounded-lg transition-colors duration-300 flex items-center shadow-sm disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-900 hover:bg-blue-800 hover:text-white"
                >
                    <Icon name="material-symbols:chevron-left" class="transition-colors duration-300 text-current" />
                </button>

                <div class="flex items-center gap-1">
                    <button
                        v-for="i in props.totalPages"
                        :key="i"
                        @click="page = i"
                        class="px-4 py-3 rounded-lg shadow-sm text-button3 font-bold transition-colors duration-300"
                        :class="page === i ? 'bg-blue-800 text-white' : 'bg-white text-gray-900 hover:bg-blue-800 hover:text-white'"
                    >
                        {{ i }}
                    </button>
                </div>

                <button
                    @click="page++"
                    :disabled="page >= props.totalPages"
                    class="px-3 py-3 bg-white rounded-lg transition-colors duration-300 flex items-center shadow-sm disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-900 hover:bg-blue-800 hover:text-white"
                >
                    <Icon name="material-symbols:chevron-right" class="transition-colors duration-300 text-current" />
                </button>
            </div>
        </div>
    </div>
</template>
