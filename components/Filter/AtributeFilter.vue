<template>
  <div v-for="filter in filterConfigs" :key="filter.key" class="w-full sm:w-48">
    <USelect  class="w-full sm:w-48"
      v-model="filters[filter.key as FilterKey]"
      :options="filter.options"

      :ui="selectUI"
    />
  </div>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue';
  import type { IProduct } from '~/types/product';

  const props = defineProps<{
    products: IProduct[];
    filters: Record<string, string>
  }>();
    
  const emit = defineEmits<{
    (e: 'update:filters', value: Record<FilterKey, string>): void;
  }>();
    
  type FilterKey = 'size' | 'gender' | 'age' | 'price';
    
  const filters = reactive<Record<FilterKey, string>>({
    size: '',
    gender: '',
    age: '',
    price: ''
  });
    
  watch(filters, () => {
    emit('update:filters', { ...filters });
  }, { deep: true });
    
  const allProducts = computed(() => props.products);
    
  const availableVariations = computed(() => {
  const allVariations = allProducts.value
    .flatMap(p => p.variations || [])
    .map(v => v.packaging);

    return Array.from(new Set(allVariations));
  });
 
  const availablePriceRanges = computed(() => {
    const ranges = ['0-15', '15-30', '30-50', '50-100', '100-150', '150-200', '200+'];

    return ranges.map(range => ({
      label: `${range}€`,
      value: range
    }));
  });

  /*Konfiguracija USelect komponente*/
  const filterConfigs = computed(() => {
    const configs = [];

    if (availableVariations.value.length > 0) {
      configs.push({
        key: 'size',
        label: 'Veličina',
        options: [
          { label: 'Veličina', value: '' },
          ...availableVariations.value
        ]
      });
    }

    configs.push(
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
      }
    );

    if (availablePriceRanges.value.length > 0) {
  configs.push({
    key: 'price',
    label: 'Cijena',
    options: [
      { label: 'Cijena', value: '' },
      ...availablePriceRanges.value
    ]
  });
}
    return configs;
  });

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
  