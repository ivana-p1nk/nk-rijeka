<template>
    <div class="flex flex-row gap-2 pt-8 pb-5">
      <template v-for="link in links" :key="link.to">
        <NuxtLink 
          v-if="currentRoute !== link.to" 
          :to="link.to" 
          class="uppercase btn-secondary medium"
        >
          {{ link.label }}
        </NuxtLink>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const currentRoute = route.path; 
  
  const links = [
    { to: "/zastita-podataka", label: "Zaštita podataka" },
    { to: "/politika-kolacica", label: "Politika kolačića" },
    { to: "/nacini-placanja", label: "Načini plaćanja" },
    { to: "/opci-uvjeti", label: "Opći uvjeti kupnje" },
  ];
  </script>
  