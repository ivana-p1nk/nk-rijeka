<script setup lang="ts">
    const emit = defineEmits(['toggleHamburgerAccount']);
</script>

<template>
    <div class="flex">
        <UButton
            icon="i-heroicons-user-circle"
            size="sm"
            variant="ghost"
            square
            :ui="{
                variant: {
                ghost: 'bg-transparent hover:bg-transparent text-white hover:text-blue-500'
                }
            }"
            class="p-0 transition-colors duration-200 ease-in-out" 
            @click="$emit('toggleHamburgerAccount')"
        />
    </div>
</template>