<script setup>
import ErrorPage from '~/error.vue'
import { _white } from '#tailwind-config/theme/accentColor'
</script>

<template>
    <div>
        <div>
            <HeaderDesktop />
            <HeaderMobile />

            <template v-if="error">
                <ErrorPage :error="error" />
            </template>
            <template v-else>
                <slot />
            </template>

            <Footer />
            <UNotifications />
        </div>
    </div>
</template>
