<template>
    <transition name="fade">
      <div 
        v-if="show" 
        class="notification-banner"
      >
        <div class="flex items-start gap-2">
          <Icon name="solar:check-circle-broken" class="text-green-500 icon-large mt-[2px]" />
          <p>"{{ title }}" je dodan u vašu košaricu.</p>
        </div>
        <NuxtLink to="/cart" class="btn-secondary medium uppercase">Vidi košaricu</NuxtLink>
  
        <button @click="close" class="h-5 text-gray-500 hover:text-blue-900 transition-colors duration-200">
          <Icon name="material-symbols:close" class="icon-xl" />
        </button>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
    const props = defineProps<{
    show: boolean;
    title: string;
  }>();
  
  const emit = defineEmits(['close'])
  
  const close = () => {
    emit('close')
  }
  </script>

<style>
  .fade-enter-active,.fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,.fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,.fade-leave-from {
    opacity: 1;
  }
</style>