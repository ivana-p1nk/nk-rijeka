<script setup lang="ts">
	const props = defineProps({
		activeTab: String
	})

	const emit = defineEmits(['update:activeTab'])
</script>

<template>
	<nav>
		<div class="flex flex-col space-y-4" role="tablist">
			<NuxtLink
				class="flex items-center p-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-green-600"
				:class="{ 'active ring-4': activeTab === 'nav-profile' }"
				to="/profile"
			>
				<span class="mr-2"><i class="fa-regular fa-user-pen"></i></span>
				Moj profil
			</NuxtLink>
			<NuxtLink
				class="flex items-center p-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-green-600"
				:class="{ 'active ring-4': activeTab === 'nav-address' }"
				to="/profile/address"
			>
				<span class="mr-2"><i class="fa-light fa-location-dot"></i></span>
				Adresa
			</NuxtLink>
			<NuxtLink
				class="flex items-center p-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-green-600"
				:class="{ 'active ring-4': activeTab === 'nav-order' }"
				to="/profile/orders"
			>
				<span class="mr-2"><i class="fa-light fa-clipboard-list-check"></i></span>
				Narudžbe
			</NuxtLink>
			<NuxtLink
				class="flex items-center p-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-green-600"
				:class="{ 'active ring-4': activeTab === 'nav-password' }"
				to="/profile/change-password"
			>
				<span class="mr-2"><i class="fa-regular fa-lock"></i></span>
				Promijeni lozinku
			</NuxtLink>
		</div>
	</nav>
</template>