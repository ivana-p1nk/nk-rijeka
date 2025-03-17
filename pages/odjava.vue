<script setup lang="ts">
    const { logout } = useSanctumAuth();

    // Simulacija ulogiranog korisnika
    const logoutUser = async () => {
        await logout()
    }

    onMounted(logoutUser);
</script>