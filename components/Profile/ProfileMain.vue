<script setup lang="ts">
    const { logout } = useSanctumAuth();
    import type { IUser } from '~/types/user';

	const config = useRuntimeConfig();
	const user = useSanctumUser() as Ref<IUser | null>;

    const logoutUser = async () => {
		await logout()
    }
</script>


<template>
	<section class="w-full">
		<div class="flex flex-col items-start space-y-10">

			<div class="flex items-center justify-between w-full">
				<div class="relative flex flex-col items-start gap-2 md:flex-row md:items-center">
					<UAvatar
						size="2xl"
						:alt="user?.name"
						class="shadow"
						:ui="{
							size: {
								'2xl': 'h-16 w-16 text-2xl object-cover'
							}
						}"
					/>
					<h4 v-if="user" class="text-xl font-semibold text-left text-background">
						{{ user.name ?? '' }}!
					</h4>
				</div>
				<button class="px-5 py-1 text-white transition bg-red-500 rounded-md hover:bg-red-600" @click="logoutUser">
					Odjavi se
				</button>
			</div>
		</div>
	</section>
 </template>