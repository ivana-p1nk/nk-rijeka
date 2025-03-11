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
				<div class="flex flex-wrap">
					<div class="w-full mb-8 lg:w-1/3 lg:mb-0">
						<div class="lg:mr-10">
							<ProfileNav activeTab="nav-order" />
						</div>
					</div>

					<div class="w-full px-10 py-10 bg-white rounded lg:w-2/3 custom-shadow">
						<div>
							NARUDŽBE
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>