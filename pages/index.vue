<script setup lang="ts">
    import type { IProduct } from '~/types/product';
    const config = useRuntimeConfig();

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


    /*search*/
    const router = useRouter()
    const searchTerm = ref('')

    const submitSearch = () => {
        if (searchTerm.value.trim()) {
            router.push({ path: '/search', query: { q: searchTerm.value.trim() } })
        }
    }
    
</script>

<template>

    <div class="px-4 bg-top bg-no-repeat bg-auto pt-32 lg:pt-72 pb-74 bg-home1 bg-players">
        <div class="container mx-auto xl:max-w-[1120px] relative z-[1] xl:px-2 px-5">
            <div class="w-full lg:w-1/2">
                <img src="~/assets/images/players-mobile.png" class="block lg:hidden pb-5">
                <h1 class="font-bold font-saira text-h1-display text-neutralBlue-950">POGLEDAJ NOVE DRESOVE</h1>
                <p class="mt-2 mb-6 font-normal text-gray-900 font-roboto text-body1">Prepoznatljiv dizajnerski potpis Juraja Zigmana <br>ponovno donosi svježinu i inovaciju našim dresovima.</p>
                <NuxtLink to="#" class="uppercase btn-primary large">Kupi sad</NuxtLink>
            </div>
            <div class="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-3 pt-20 lg:pt-52">
                <NuxtLink
                    to="#"
                    class="group relative bg-dresovi bg-cover bg-center rounded-lg h-80 lg:h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4"
                > 
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></div>   
                    <p class="relative font-bold text-blue-300 font-saira text-h6-normal">DRESOVI</p>
                    <h2 class="relative font-bold text-white font-saira text-h3-normal">2024./25.</h2>
                </NuxtLink>
            
                <NuxtLink
                    to="#"
                    class="group relative bg-odjeca bg-cover bg-center rounded-lg h-80 lg:h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4"
                >
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></div>
                    <p class="relative font-bold text-blue-300 font-saira text-h6-normal">ODJEĆA</p>
                    <h2 class="relative font-bold text-white font-saira text-h3-normal">NOVE HUDICE</h2>
                </NuxtLink>
            
                <NuxtLink
                    to="#"
                    class="group relative bg-pokloni bg-cover bg-center rounded-lg h-80 lg:h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4"
                >  
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

        <div class="container mx-auto px-5">
            <div class="flex flex-col items-center gap-1 pb-10">
                <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">BESTSELLERI</h1>
                <p class="font-normal text-blue-900 font-roboto text-body1">Počasti se novim dresom, odabri atraktivan <br>poklon, ne propusti promotivne cijene...</p>
            </div>
            
            <Carousel :products="products" />
        </div>

        <!--PERSONALIZIRAJ dekstop -->
        <div class="relative mx-3 my-40 md:container md:mx-auto px-5 hidden md:block">
            <div class="bg-dark-blue-gradient2 p-20 rounded-2xl xl:max-w-[980px] w-full">
                <h1 class="mb-2 font-bold uppercase font-saira text-h2-display text-blue-50">PERSONALIZIRAJ <br>SVOJ DRES</h1>
                <p class="font-normal text-white font-roboto text-body1 mb-7">Tvoj dres, tvoja pravila. Personaliziraj svoj <br>omiljeni dres i učini ga jedinstvenim.</p>
                <NuxtLink to="/" class="uppercase btn-primary small">Naruči svoj dres</NuxtLink>
            </div>
            <img class="absolute right-0 w-[45%] top-[12%] lg:w-[53%] lg:top-[-3%] xl:w-auto xl:top-[-20%]" src="~/assets/images/dresovi.png" alt="Dresovi" />
        </div>
        
        <!--PERSONALIZIRAJ mobile -->
        <div class="relative mx-3 mb-20 mt-36 block md:hidden">
            <div class="mx-5 bg-dark-blue-gradient2 p-20 rounded-2xl flex flex-col items-center">
                <img class="-mt-36 w-full mb-8" src="~/assets/images/dresovi.png" alt="Dresovi" />
                <h1 class="mb-2 font-bold uppercase font-saira text-h2-display text-blue-50 text-center">PERSONALIZIRAJ <br>SVOJ DRES</h1>
                <p class="font-normal text-white font-roboto text-body1 mb-7 text-center">Tvoj dres, tvoja pravila. Personaliziraj svoj omiljeni dres i učini ga jedinstvenim.</p>
                <NuxtLink to="/" class="uppercase btn-primary small">Naruči svoj dres</NuxtLink>
            </div>
        </div>
    

        <!-- NOVO U PONUDI -->
        <div class="container pb-6 mx-auto px-5">
            <div class="flex flex-col md:flex-row justify-between gap-4">
                <div class="flex flex-col gap-2 md:flex-row md:gap-9">
                    <div class="flex flex-row justify-between items-center">
                        <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">
                        NOVO U PONUDI
                        </h1>
                        <NuxtLink
                        to="/products"
                        class="uppercase btn-secondary xs h-fit md:hidden"
                        >
                        Pogledaj sve
                        </NuxtLink>
                    </div>
                    <p class="font-normal text-blue-900 font-roboto text-body1">
                        Naš se asortiman stalno proširuje novim <br />
                        atraktivnim artiklima, ovo su samo neki od njih.
                    </p>
                </div>
                <NuxtLink
                to="/products"
                class="uppercase btn-secondary xs h-fit hidden md:block self-center"
                >
                Pogledaj sve
                </NuxtLink>
            </div>
            <Carousel :products="products" />
        </div>


    </div>

    <div class="mx-5 my-20 md:container md:mx-auto px-5">
        <div class="flex flex-wrap items-center justify-between">
            <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">kupi dresove igrača</h1>
            <NuxtLink to="/products" class="uppercase btn-secondary xs h-fit">Pogledaj sve</NuxtLink>
        </div>
        <div class="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-4 md:grid-cols-2">
            <div class="group relative rounded-2xl overflow-hidden bg-[linear-gradient(13.73deg,_#012436_15.68%,_#006296_54.1%,_#0083C9_85.54%)] shadow-xl h-[400px]">
                <span class="absolute z-10 font-saira -rotate-90 top-7 left-5 text-[#D9F1FD] font-bold text-5xl">
                    29
                </span>
                <div class="absolute z-10 flex items-end h-auto origin-bottom-left -rotate-90 bottom-7 left-[4.3rem]">
                    <span class="font-saira text-[#D9F1FD] font-bold text-5xl whitespace-nowrap uppercase">
                        <span style="-webkit-text-stroke:1px white;color:transparent;">andro</span> babić
                    </span>
                </div>

                <!-- Default slika -->
                <img src="~/assets/images/player.png" alt="player"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform right-[-0.75rem] group-hover:translate-x-2 group-hover:opacity-0" />

                <!-- Hover slika -->
                <img src="~/assets/images/player-bg.png" alt="player-hover"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 right-[-0.75rem]" />

            </div>
            <div class="group relative rounded-2xl overflow-hidden bg-[linear-gradient(13.73deg,_#012436_15.68%,_#006296_54.1%,_#0083C9_85.54%)] shadow-xl h-[400px]">
                <span class="absolute z-10 font-saira -rotate-90 top-7 left-5 text-[#D9F1FD] font-bold text-5xl">
                    29
                </span>
                <div class="absolute z-10 flex items-end h-auto origin-bottom-left -rotate-90 bottom-7 left-[4.3rem]">
                    <span class="font-saira text-[#D9F1FD] font-bold text-5xl whitespace-nowrap uppercase">
                        <span style="-webkit-text-stroke:1px white;color:transparent;">andro</span> babić
                    </span>
                </div>

                <!-- Default slika -->
                <img src="~/assets/images/player.png" alt="player"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform right-[-0.75rem] group-hover:translate-x-2 group-hover:opacity-0" />

                <!-- Hover slika -->
                <img src="~/assets/images/player-bg.png" alt="player-hover"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 right-[-0.75rem]" />
            </div>
            <div class="group relative rounded-2xl overflow-hidden bg-[linear-gradient(13.73deg,_#012436_15.68%,_#006296_54.1%,_#0083C9_85.54%)] shadow-xl h-[400px]">
                <span class="absolute z-10 font-saira -rotate-90 top-7 left-5 text-[#D9F1FD] font-bold text-5xl">
                    29
                </span>
                <div class="absolute z-10 flex items-end h-auto origin-bottom-left -rotate-90 bottom-7 left-[4.3rem]">
                    <span class="font-saira text-[#D9F1FD] font-bold text-5xl whitespace-nowrap uppercase">
                        <span style="-webkit-text-stroke:1px white;color:transparent;">andro</span> babić
                    </span>
                </div>

                <!-- Default slika -->
                <img src="~/assets/images/player.png" alt="player"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform right-[-0.75rem] group-hover:translate-x-2 group-hover:opacity-0" />

                <!-- Hover slika -->
                <img src="~/assets/images/player-bg.png" alt="player-hover"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 right-[-0.75rem]" />

            </div>
            <div class="group relative rounded-2xl overflow-hidden bg-[linear-gradient(13.73deg,_#012436_15.68%,_#006296_54.1%,_#0083C9_85.54%)] shadow-xl h-[400px]">
                <span class="absolute z-10 font-saira -rotate-90 top-7 left-5 text-[#D9F1FD] font-bold text-5xl">
                    29
                </span>
                <div class="absolute z-10 flex items-end h-auto origin-bottom-left -rotate-90 bottom-7 left-[4.3rem]">
                    <span class="font-saira text-[#D9F1FD] font-bold text-5xl whitespace-nowrap uppercase">
                        <span style="-webkit-text-stroke:1px white;color:transparent;">andro</span> babić
                    </span>
                </div>

                <!-- Default slika -->
                <img src="~/assets/images/player.png" alt="player"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform right-[-0.75rem] group-hover:translate-x-2 group-hover:opacity-0" />

                <!-- Hover slika -->
                <img src="~/assets/images/player-bg.png" alt="player-hover"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 right-[-0.75rem]" />

            </div>
        </div>

    <div>
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

    @media(max-width:2140px){
        .bg-players::after {right: 0%;}
    }

    @media(max-width:1650px){
        .bg-players::after {content: url('/assets/images/players-laptop.png');}
    }

    @media(max-width:1100px){
        .bg-players::after {
            content: url('/assets/images/players-tablet.png');
            top:27%;
        }
    }

    @media(max-width:1024px){
        .bg-players::after {display: none;}
        .bg-home1 { background-size: contain;}
    }

</style>