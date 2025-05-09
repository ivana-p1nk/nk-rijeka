<script setup lang="ts">
import { useCartStore } from '~/composables/useCart'

const { logout } = useSanctumAuth();
const cartStore = useCartStore()

const logoutUser = async () => {
    cartStore.setUserRole(null)
    await logout()
}

onMounted(logoutUser);
</script>