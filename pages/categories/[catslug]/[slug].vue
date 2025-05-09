<script setup lang="ts">
import { useCategoryProducts } from '@/composables/useCategoryProducts'
import { useRoute, createError } from '#imports'

const route = useRoute()
const catslug = route.params.catslug as string

const { 
    category, 
    products, 
    activeFilters, 
    loadingCat, 
    sort, 
    page, 
    totalPages, 
    totalProducts, 
    fetchAll,
    updateSort,
    updatePage,
    updateFilters,
} = useCategoryProducts(catslug)

await fetchAll()

if (!category.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Kategorija nije pronađena',
    })
}
</script>

<template>
    <div class="bg-igraci">
        <div class="container mx-auto con-height pb-5 px-5" v-if="!loadingCat && category">
            <CategoryPage 
                :category="category" 
                :products="products"
                :active-filters="activeFilters" 
                :sort="sort" 
                :page="page"
                :totalPages="totalPages"
                :totalProducts="totalProducts"
                @update:activeFilters="updateFilters($event)" 
                @update:sort="updateSort($event)" 
                @update:page="updatePage($event)" 
            />
        </div>
    </div>
</template>
