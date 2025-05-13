<script setup lang="ts">
    useSeoMeta({ title: "Moj profil" });
  
    definePageMeta({
        title: 'Moj profil',
        middleware: 'sanctum:auth',
    })
</script>

<template>
	<section class="py-40">
		<div class="container mx-auto">
			<div class="relative mx-10">
				<p class="font-normal text-blue-900 font-roboto text-body2 pb-1 pt-10">
					<NuxtLink class="text-blue-400 link-color" to="/"> Početna / </NuxtLink>
					<span>Moj račun</span>
				</p>
				<h1 class="font-saira font-medium text-h1-normal text-gray-900 pb-6 md:pb-10">
					Moj račun
				</h1>

				
				<div class="flex flex-wrap">
					<div class="w-full mb-8 lg:w-1/3 lg:mb-0">
						<div class="lg:mr-10">
							<ProfileNav activeTab="nav-profile" />
						</div>
					</div>

					<div class="w-full px-10 py-10 bg-white rounded lg:w-2/3 custom-shadow">
						<div>
							<ProfileMain />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>