
<script setup lang="ts">
	import type { IUser } from '~/types/user';
	
	const user = useSanctumUser() as Ref<IUser | null>;

	const dropdownItems = computed(() => {
		if (user.value != null) {
			return [
				[{
					label: `Pozdrav ${user.value.name}`,
					class: 'font-roboto font-normal account-frame pl-3 pt-0 pb-3 account-transparent',
				}],
				[{
					label: 'Narudžbe',
					to: '/profile/orders',
					icon: 'streamline:ticket-1',
					class: 'account-frame-items',
				}],
				[{
					label: 'Detalji profila',
					to: '/profile',
					icon: 'tdesign:user-circle',
					class: 'account-frame-items',
				}],
				[{
					label: 'Odjava',
					to: '/odjava',
					icon: 'uiw:login',
					class: 'account-frame-items',
				}]
			];
		} else {
			return [
				[{
					label: 'Prijavi se',
					to: '/login',
					class: 'account-login-btn w-[80%] mb-2 mx-auto rounded-md'
				}],
				[{
					label: 'Nemaš račun?',
					custom: '<div class="flex flex-row gap-3 pt-4 border-t border-blue-800"> <p class="mb-0 mb-1 text-sm font-normal text-white font-roboto">Nemaš račun?</p> <nuxt-link to="/register" class="font-bold underline uppercase link-plavi">Registriraj se</nuxt-link></div>',
					class: 'justify-center w-full mx-auto text-center account-transparent',
				}]
			];
		}
	});
</script>

<template>
	<!--Login/Account Dropdown-->
	<UDropdown
		:items="dropdownItems"
		:ui="{
			width: 'w-[245px]',
			background: 'bg-header-gradient dark:bg-header-gradient pt-6 pb-3',
			container: '!top-8',
			rounded: 'rounded-2xl',
			padding: 'p-0',
			divide: 'divide-none',
			shadow: 'shadow-lg',
			ring: 'ring-0',
			item: {
				inactive: 'text-white dark:text-white',
				active:  'rounded-none bg-blue-500 dark:bg-blue-500 dark:bg-opacity-10 bg-opacity-10 text-white dark:text-white',
			}
		}"
	>
		<UButton
			icon="i-heroicons-user-circle"
			size="sm"
			variant="neutral"
			square
			class="p-0 text-white transition-colors duration-200 ease-in-out dark:text-white hover:text-blue-500" 
		/>
		<!-- Stavke dropdowna -->
		<template #item="{ item, isActive }">
			<div class="px-2 py-1">
				<span v-if="item.custom" v-html="item.custom"></span>
				<span v-else>
					<span v-if="item.icon" class="mr-1">
						<Icon :name="item.icon" class="w-5 h-5 ml-5 -mb-1 text-blue-500 " />
					</span>   
					{{ item.label }}
				</span>
			</div>
		</template>
	</UDropdown>
</template>