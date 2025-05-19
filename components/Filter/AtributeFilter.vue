<template>
  <div v-for="filter in filterConfigs" :key="filter.key" class="w-full sm:w-48">
    <USelect class="w-full sm:w-48" v-model="filters[filter.key as FilterKey]" :options="filter.options"
      :ui="selectUI" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IProduct } from '~/types/product';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps<{
  products: IProduct[];
  filters: Record<string, string>
}>();

const emit = defineEmits<{
  (e: 'update:filters', value: Record<FilterKey, string>): void;
}>();

type FilterKey = 'size' | 'gender' | 'age' | 'price';

const initialFilters = route.query as Partial<Record<FilterKey, string>>;

const filters = reactive<Record<FilterKey, string>>({
  size: initialFilters.size ?? '',
  gender: initialFilters.gender ?? '',
  age: initialFilters.age ?? '',
  price: initialFilters.price ?? ''
});

watch(filters, () => {
  const query = { ...route.query };

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      query[key] = value;
    } else {
      delete query[key];
    }
  });

  router.replace({ query });

  emit('update:filters', { ...filters });
}, { deep: true });

import { ref, onMounted } from 'vue'

const availableVariations = ref<string[]>([])

onMounted(() => {
  const allVariations = props.products
    .flatMap(p => p.variations || [])
    .map(v => v.packaging)
  availableVariations.value = Array.from(new Set(allVariations))
})

watch(() => props.products, (newProducts) => {
  if (availableVariations.value.length === 0 && newProducts.length > 0) {
    const allVariations = newProducts
      .flatMap(p => p.variations || [])
      .map(v => v.packaging)
    availableVariations.value = Array.from(new Set(allVariations))
  }
}, { immediate: true })

const availablePriceRanges = computed(() => {
  const ranges = [
    { label: '0-15€', value: '0-15' },
    { label: '15-30€', value: '15-30' },
    { label: '30-50€', value: '30-50' },
    { label: '50-100€', value: '50-100' },
    { label: '100-150€', value: '100-150' },
    { label: '150-200€', value: '150-200' },
    { label: '200+€', value: '200-1000' }
  ];

  return [{ label: 'Cijena', value: '' }, ...ranges];
});

/*Konfiguracija USelect komponente*/
const filterConfigs = computed(() => [
  {
    key: 'size',
    label: 'Veličina',
    options: [
      { label: 'Veličina', value: '' },
      ...availableVariations.value.map(v => ({ label: v, value: v }))
    ]
  },
  {
    key: 'gender',
    label: 'Spol',
    options: [
      { label: 'Spol', value: '' },
      { label: 'Muškarci', value: 'muskarci' },
      { label: 'Žene', value: 'zene' }
    ]
  },
  {
    key: 'age',
    label: 'Dob',
    options: [
      { label: 'Dob', value: '' },
      { label: 'Odrasli', value: 'odrasli' },
      { label: 'Djeca', value: 'djeca' }
    ]
  },
  {
    key: 'price',
    label: 'Cijena',
    options: availablePriceRanges.value
  }
]);

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
          `
    }
  }
};

</script>

<style>
.form-select {
  @apply text-black placeholder-black !important;
}

.dark .form-select {
  @apply text-black placeholder-black !important;
}
</style>