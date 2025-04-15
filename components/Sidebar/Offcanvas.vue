<template>
    <div>
      <!-- Overlay -->
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/60 z-40"
        @click="closeOffcanvas"
      ></div>
  
      <!-- Offcanvas -->
      <div
        class="fixed top-0 right-0 w-96 h-full bg-blue-00 shadow-lg z-50 transform transition-transform duration-300"
        :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
      >
        <div class="p-6">
          <div class="w-full flex justify-end pb-4">
            <button @click="closeOffcanvas"><Icon name="line-md:close" class="medium text-gray-900" /></button>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    isOpen: Boolean,
  })
  
  const emit = defineEmits(['close'])
  
  const closeOffcanvas = () => {
    emit('close')
  }
  </script>