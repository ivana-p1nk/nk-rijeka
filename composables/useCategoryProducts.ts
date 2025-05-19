import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRuntimeConfig, useFetch } from '#imports'
import type { ICategory } from '@/types/category'
import type { IProduct } from '@/types/product'

type ProductResponse = {
    data: IProduct[]
    total: number
}

export function useCategoryProducts(catslug: string | string[], slug?: string | string[]) {
    const config = useRuntimeConfig()

    const category = ref<ICategory>()
    const parentCategory = ref<ICategory>()
    const products = ref<IProduct[]>([])

    const loadingCat = ref(true)
    const loadingParentCat = ref(!!slug)
    const loadingProduct = ref(false)

    const page = ref(1)
    const totalProducts = ref(0)
    const perPage = 12
    const totalPages = computed(() => Math.ceil(totalProducts.value / perPage))

    const categoriy = ref<number[]>([])
    const sort = ref('Najnoviji')
    const activeFilters = ref<Record<string, string>>({})

    const fetchCategory = async () => {
        loadingCat.value = true
        try {
            const slugToFetch = slug ?? catslug
            const { data: categoryData } = await useFetch(`${config.public.url}/categories/${slugToFetch}`)
            // @ts-ignore
            category.value = categoryData.value[0]
        } catch (err) {
            console.error('Greška pri učitavanju kategorije:', err)
        } finally {
            loadingCat.value = false
        }
    }

    const fetchParentCategory = async () => {
        if (!slug) return
        loadingParentCat.value = true
        try {
            const { data: parentData } = await useFetch(`${config.public.url}/categories/${catslug}`)
            // @ts-ignore
            parentCategory.value = parentData.value[0]
        } catch (err) {
            console.error('Greška pri učitavanju glavne kategorije:', err)
        } finally {
            loadingParentCat.value = false
        }
    }

    function buildQueryParams(params: Record<string, any>) {
        const query = new URLSearchParams()

        for (const [key, value] of Object.entries(params)) {
            if (value === undefined || value === null) {
                continue
            }

            if (value === '') {
                query.append(key, '')
            } else {
                query.append(key, value)
            }
        }

        return query.toString()
    }

    const fetchProducts = async (filtersOverride?: Record<string, string>) => {
        loadingProduct.value = true

        try {
            const route = useRoute()
            const { slug } = route.params
            const queryFilters = route.query

            let filters = filtersOverride ?? activeFilters.value;

            if(Object.keys(activeFilters.value).length === 0 && Object.keys(queryFilters).length > 0) {
                filters = queryFilters as Record<string, string>
                activeFilters.value = queryFilters as Record<string, string>
            }

            let catIds: number[] = []

            if (slug && category.value?.sub_categories) {
                const match = category.value.sub_categories.find((e) => e.slug === slug)
                if (match) catIds = [match.id]
            } else {
                catIds = category.value?.sub_categories?.map((c) => c.id) ?? []
                if (category.value?.id) catIds.unshift(category.value.id)
            }

            const queryParams = {
                ...filters,
                a: queryFilters.a,
                categories: categoriy.value.length > 0 ? categoriy.value : catIds.join(','),
                page: page.value,
                sort: sort.value,
            }

            const queryString = buildQueryParams(queryParams)

            const productData = await $fetch<ProductResponse>(`${config.public.url}/products?${queryString}`)

            products.value = productData.data || []
            totalProducts.value = productData.total || 0
        } catch (err) {
            console.error('Greška pri učitavanju proizvoda:', err)
        } finally {
            loadingProduct.value = false
        }
    }

    const fetchAll = async () => {
        await Promise.all([fetchCategory(), fetchParentCategory()])
        fetchProducts()
    }

    const updateSort = async (value: string) => {
        sort.value = value;
        page.value = 1;
        fetchProducts()
    }
    const updatePage = async (value: number) => {
        page.value = value;
        fetchProducts()
    }
    const updateFilters = async (value: Record<string, string>) => {
        activeFilters.value = value;
        page.value = 1;
        fetchProducts(value)
    }

    return {
        category,
        parentCategory,
        products,
        sort,
        activeFilters,
        categoriy,
        page,
        perPage,
        totalProducts,
        totalPages,
        loadingCat,
        loadingParentCat,
        loadingProduct,
        fetchAll,
        updateSort,
        updatePage,
        updateFilters,
    }
}
