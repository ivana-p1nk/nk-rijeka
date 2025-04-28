<template>
  <div v-for="filter in filterConfigs" :key="filter.key" class="w-full sm:w-48">
    <USelect  class="w-full sm:w-48"
      v-model="filters[filter.key as FilterKey]"
      :options="filter.options"
      :placeholder="filter.label"
      :ui="selectUI"
    />
  </div>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue';
  import type { IProduct } from '~/types/product';

  const props = defineProps<{products: IProduct[];}>();
    
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
    
  const products = computed(() => props.products);
    
  /*VELIČINA*/
  const availableVariations = computed(() => {
    const allVariations = products.value
      .flatMap(p => p.variations || [])
      .map(v => v.packaging);

      return Array.from(new Set(allVariations));
  });

  /*CIJENA*/
  const availablePriceRanges = computed(() => {
    const allPrices = products.value
      .map(p => p.price)
      .filter(price => price !== undefined && price !== null);

    if (allPrices.length === 0) return [];

    const ranges = [
      '0-15€',
      '15-30€',
      '30-50€',
      '50-100€',
      '100-150€',
      '150-200€',
      '200€+',
    ];

    const matchedRanges = new Set<string>();

    allPrices.forEach(price => {
      if (price >= 0 && price < 15) matchedRanges.add('0-15€');
      else if (price >= 15 && price < 30) matchedRanges.add('15-30€');
      else if (price >= 30 && price < 50) matchedRanges.add('30-50€');
      else if (price >= 50 && price < 100) matchedRanges.add('50-100€');
      else if (price >= 100 && price < 150) matchedRanges.add('100-150€');
      else if (price >= 150 && price < 200) matchedRanges.add('150-200€');
      else if (price >= 200) matchedRanges.add('200€+');
    });

    return Array.from(matchedRanges);
  });
    

  /*Konfiguracija USelect komponente*/
  const filterConfigs = computed(() => {
    const configs = [];

    if (availableVariations.value.length > 0) {
      configs.push({
        key: 'size',
        label: 'Veličina',
        options: availableVariations.value
      });
    }

    configs.push(
      {
        key: 'gender',
        label: 'Spol',
        options: ['Muškarci', 'Žene']
      },
      {
        key: 'age',
        label: 'Dob',
        options: ['Odrasli', 'Djeca']
      }
    );

    if (availablePriceRanges.value.length > 0) { 
      configs.push({
        key: 'price',
        label: 'Cijena',
        options: availablePriceRanges.value
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
  