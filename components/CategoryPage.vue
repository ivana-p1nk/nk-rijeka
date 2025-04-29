<script setup lang="ts">
import type { ICategory } from '@/types/category';
import type { IProduct } from '@/types/product';

const props = defineProps<{
  category: ICategory;
  parentCategory?: ICategory;
  products: IProduct[];
  filteredProducts: IProduct[];
  activeFilters: Record<string, string>;
}>();

const emit = defineEmits<{
  (e: 'update:activeFilters', value: Record<string, string>): void;
  (e: 'update:sort', value: string): void;
}>();

const sort = ref('Najnoviji');

watch(sort, (value) => {
  emit('update:sort', value);
});

const route = useRoute();
const { catslug, slug } = route.params;

const subcategories = computed(() => {
  return props.parentCategory?.sub_categories ?? props.category.sub_categories ?? [];
});
</script>

<template>
  <div class="pb-16 mb-8 border-b border-1 border-gray-200">
    <div class="pb-16 mb-8 border-b border-1 border-gray-200">
        <p class="font-normal text-blue-900 font-roboto text-body2">
        <NuxtLink class="text-blue-400 link-color" to="/">Početna / </NuxtLink>
        <template v-if="parentCategory">
            <NuxtLink class="text-blue-400 link-color" :to="`/categories/${catslug}`">
            {{ parentCategory.title }} /
            </NuxtLink>
        </template>
        <span>{{ category.title }}</span>
        </p>

        <p class="pb-8 text-h1-normal font-medium uppercase text-blue-900 font-saira">
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
                    { active: slug === item.slug }
                ]"
                >
                {{ item.title }}
                </NuxtLink>
            </div>
            </div>
        </div>

        <!-- Filteri -->
        <div class="w-full lg:flex-1 flex flex-col sm:flex-row flex-wrap gap-2 justify-start lg:justify-end items-start">
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
        class="border border-gray-300 px-3 py-2 rounded text-sm"
        >
        <option value="Najnoviji">Poredaj po najnovijem</option>
        <option value="Cijena: Rastuće">Poredaj po cijeni: od najniže do najviše</option>
        <option value="Cijena: Opadajuće">Poredaj po cijeni: od najviše do najniže</option>
      </USelect>
    </div>
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4 pt-8">
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
    </div>
  </div>
</template>

