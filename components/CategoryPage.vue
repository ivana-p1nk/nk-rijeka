<script setup lang="ts">
import type { ICategory } from '@/types/category'
import type { IProduct } from '@/types/product'
import Pagination from '@/components/Pagination.vue'
import { ref } from 'vue'

const mobileFilterOpen = ref(false)

const props = defineProps<{
    category: ICategory
    parentCategory?: ICategory
    products: IProduct[]
    activeFilters: Record<string, string>
    sort: string
    page: number
    totalPages: number
    totalProducts: number
}>()

const emit = defineEmits<{
    (e: 'update:activeFilters', value: Record<string, string>): void
    (e: 'update:sort', value: string): void
    (e: 'update:page', value: number): void
}>()

const sort = computed({
  get: () => props.sort,
  set: (value) => emit('update:sort', value),
})

const page = computed({
  get: () => props.page,
  set: (value) => emit('update:page', value),
})

const route = useRoute()
const { catslug, slug } = route.params

const subcategories = computed(() => {
    return props.parentCategory?.sub_categories ?? props.category.sub_categories ?? []
})


</script>

<template>
    <div class="pb-16 mb-8 border-b border-1 border-gray-200">
        <div class="pb-0 md:pb-10 lg:pb-16 mb-8 border-b-0 md:border-b border-1 border-gray-200">
            <p class="font-normal text-blue-900 font-roboto text-body2">
                <NuxtLink class="text-blue-400 link-color" to="/">Početna / </NuxtLink>
                <template v-if="parentCategory">
                    <NuxtLink class="text-blue-400 link-color" :to="`/categories/${catslug}`">
                        {{ parentCategory.title }} /
                    </NuxtLink>
                </template>
                <span>{{ category.title }}</span>
            </p>

            <p class="pt-1 text-h1-normal font-medium uppercase text-blue-900 font-saira">
                {{ category.title }}
            </p>
            <!-- OPIS KATEGORIJE -->
            <p class="max-w-xl pb-8 text-body2 text-gray-900">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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

                <hr class="block md:hidden border-t-[1.35px] border-gray-200" />
                <!-- FILTERS -->
                <div
                    class="w-full lg:flex-1 flex flex-row sm:flex-row flex-wrap gap-2 justify-start lg:justify-end items-start"
                >
               

                    <FilterAtributeFilter
                        :products="products"
                        :filters="activeFilters"
                        @update:filters="emit('update:activeFilters', $event)"
                    />

                     <!-- SORT ON MOBILE - SIDEBAR -->
                    <FilterSortFilter
                        v-if="products.length > 0"
                        :products="products"
                        :filters="activeFilters"
                        @update:filters="emit('update:activeFilters', $event)"
                        class="block md:hidden"
                        v-model="sort"
                    />

                </div>
            </div>
        </div>

        <!-- Proizvodi -->
        <div class="col-span-1 products md:col-span-4 mt-8">
            <div class="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
                <p class="text-body2 text-neutralBlue-950">Prikazujemo {{ products.length }} proizvoda od {{ totalProducts }}</p>

                <!-- SORT DESKTOP-->
                <USelect
                        v-model="sort"
                        class="hidden md:block"
                        :options="[
                            { value: 'Najnoviji', label: 'Poredaj po najnovijem' },
                            { value: 'S nižom cijenom', label: 'Poredaj po cijeni: od najniže do najviše' },
                            { value: 'S višom cijenom', label: 'Poredaj po cijeni: od najviše do najniže' },
                        ]"
                        :ui="{
                            color: {
                                white: {
                                    outline:
                                        'shadow-none dark:shadow-none dark:text-gray-900 text-gray-900 dark:bg-white bg-white dark:focus:ring-blue-500 focus:ring-blue-500 dark:ring-neutralBlue-200 ring-neutralBlue-200 font-roboto font-normal text-body3',
                                },
                            },
                            icon: {
                                base: 'text-neutralBlue-600 dark:text-neutralBlue-600',
                            },
                        }"
                    />
            </div>

            <div
                v-if="products.length > 0"
                class="pt-8 -mx-3 sm:mx-0 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 sm:gap-x-4 gap-y-10"
            >
                <ProductCard
                    v-for="(product, index) in products"
                    :key="index"
                    :product="product"
                    class="w-full"
                />

            </div>
            
            <div v-else class="pb-12 text-body2 text-neutralBlue-950">
                Nažalost, trenutno nema dostupnih proizvoda u ovoj kategoriji.
            </div>

            <!-- PAGINACIJA -->
            <Pagination v-model="page" :totalPages="props.totalPages" />
        </div>
    </div>
</template>
