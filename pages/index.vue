    <script setup lang="ts">
    import type { IProduct } from '~/types/product';
    const config = useRuntimeConfig();
    import ProductCard from '@/components/productCard.vue'

    const products = ref<IProduct[]>([]);
	const loading = ref(false);

	const fetchData = async () => {
		loading.value = true;

		try {
			const { data: productData } = await useFetch(`${config.public.url}/products`);

			// @ts-ignore
			products.value = productData.value.data || [];
		
		} catch (error) {
		loading.value = false;
			console.error('Došlo je do greške pri učitavanju proizvoda:', error);
		} finally {
			loading.value = false;
		}
	};

    const carouselNew = ref()

	onMounted(() => {
		fetchData();

        setInterval(() => {
            if (!carouselNew.value) return
            if (carouselNew.value.page === carouselNew.value.pages) {
                return carouselNew.value.select(0)
            }
            carouselNew.value.next()
        }, 3000)
	});
</script>

<template>

    <div class="px-4 bg-top bg-no-repeat bg-auto pt-72 pb-74 bg-home1 bg-players">
        <div class="max-w-[1120px] mx-auto relative z-[1]">
            <div class="w-1/2">
                <h1 class="font-bold font-saira text-h1-display text-neutralBlue-950">POGLEDAJ NOVE DRESOVE</h1>
                <p class="mt-2 mb-6 font-normal text-gray-900 font-roboto text-body1">Prepoznatljiv dizajnerski potpis Juraja Zigmana <br>ponovno donosi svježinu i inovaciju našim dresovima.</p>
                <NuxtLink to="#" class="uppercase btn-primary large">Kupi sad</NuxtLink>
            </div>
            <div class="relative z-10 grid grid-cols-3 gap-6 pt-52">
                <NuxtLink
                to="#"
                class="group relative bg-dresovi bg-cover bg-center rounded-lg h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4"> 
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></div>   
                    <p class="relative font-bold text-blue-300 font-saira text-h6-normal">DRESOVI</p>
                    <h2 class="relative font-bold text-white font-saira text-h3-normal">2024./25.</h2>
                </NuxtLink>
            
                <NuxtLink
                to="#"
                class="group relative bg-odjeca bg-cover bg-center rounded-lg h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></div>
                    <p class="relative font-bold text-blue-300 font-saira text-h6-normal">ODJEĆA</p>
                    <h2 class="relative font-bold text-white font-saira text-h3-normal">NOVE HUDICE</h2>
                </NuxtLink>
            
                <NuxtLink
                    to="#"
                    class="group relative bg-pokloni bg-cover bg-center rounded-lg h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4">  
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></div>
                        <p class="relative font-bold text-blue-300 font-saira text-h6-normal">POKLONI</p>
                        <h2 class="relative font-bold text-white font-saira text-h3-normal">ŠKOLSKI ASORTIMAN</h2>
                </NuxtLink>
            </div>
        </div>
        
    </div>

    <div class="bg-home2 pt-20 mt-[-80px]">

   
    <!-- Vertikalni divider -->
    <div class="relative w-px mx-auto my-20 bg-blue-700 h-14"></div>

    <div class="container mx-auto">
        <div class="flex flex-col items-center gap-1 pb-10">
            <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">BESTSELLERI</h1>
            <p class="font-normal text-blue-900 font-roboto text-body1">Počasti se novim dresom, odabri atraktivan <br>poklon, ne propusti promotivne cijene...</p>
        </div>
        
        <Carousel :products="products" />
    </div>

    <div class="relative mx-auto my-40 container2">
        <div class="bg-dark-blue-gradient2 p-20 rounded-2xl  max-w-[920px]">
            <h1 class="mb-2 font-bold uppercase font-saira text-h2-display text-blue-50">PERSONALIZIRAJ <br>SVOJ DRES</h1>
            <p class="font-normal text-white font-roboto text-body1 mb-7">Tvoj dres, tvoja pravila. Personaliziraj svoj <br>omiljeni dres i učini ga jedinstvenim.</p>
            <NuxtLink to="/" class="uppercase btn-primary small">Naruči svoj dres</NuxtLink>
        </div>
        <img class="absolute top-[-20%] right-0" src="~/assets/images/dresovi.png" alt="Dresovi" />
    </div>
  

    <div class="container pb-6 mx-auto">
        <div class="flex flex-row items-center justify-between">
            <div class="flex flex-row gap-9">
                <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">NOVO U PONUDI</h1>
                <p class="font-normal text-blue-900 font-roboto text-body1">Naš se asortiman stalno proširuje novim <br>atraktivnim artiklima, ovo su samo neki od njih.</p>
            </div>
            <NuxtLink to="/products" class="uppercase btn-secondary xs h-fit">Pogledaj sve</NuxtLink>
        </div>          
        
        <Carousel :products="products" />
    </div>

</div>

</template>

<style scoped>
    .bg-dresovi {
    background-image: url('/assets/images/bg-dresovi.png');
    }
    .bg-odjeca {
    background-image: url('/assets/images/bg-hoodice.png');
    }
    .bg-pokloni {
    background-image: url('/assets/images/bg-skolski-pribor.png');
    }

    .bg-home1 {
    background-image: url('/assets/images/backgrounds/bg-home1.png');
    }

    .bg-home2 {
        background-image: url('/assets/images/backgrounds/bg-home2.jpg');
        background-repeat: no-repeat;
        background-position: top;
    }

    .bg-players::after {
        position: absolute;
        content: url('/assets/images/players-home.png');
        right: 9%;
        top: 20%;
        z-index: 0;
    }

</style>