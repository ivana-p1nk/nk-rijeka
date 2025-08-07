export default defineNuxtRouteMiddleware((to, from) => {
    const config = useRuntimeConfig()
  
    const maintenanceEnabled = config.public.maintenanceMode === 'true'
    const bypassToken = config.public.maintenanceBypassToken
  
    // Ako korisnik dođe s tokenom u queryju, postavi kolačić
    if (process.client && to.query.token === bypassToken) {
      const tokenCookie = useCookie('maintenance_token', {
        maxAge: 60 * 60, // 1 sat
        path: '/',
        sameSite: 'lax',
      })
      tokenCookie.value = to.query.token as string
    }
  
    const tokenFromCookie = useCookie('maintenance_token').value
    const isBypassed = tokenFromCookie === bypassToken
  
    if (maintenanceEnabled && !isBypassed && to.path !== '/maintenance') {
      return navigateTo('/maintenance')
    }
  })
  