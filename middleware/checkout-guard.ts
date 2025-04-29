export default defineNuxtRouteMiddleware((to, from) => {
    if (from.name !== 'cart') {
        return navigateTo('/')
    }
})
