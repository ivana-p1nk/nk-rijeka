<script setup lang="ts">
    import { activetab, openMenu } from "~/composables/activeTabNavigation";

    const activeTabContentRef = ref<HTMLElement | null>(null);
    const dropdownRef = ref<HTMLElement | null>(null);
    const dropdownHeight = ref('0px');

    watch([openMenu, activetab], () => { 
        if (openMenu.value) {
            setTimeout(() => {
                if (!activeTabContentRef.value) return;

                const el = activeTabContentRef.value;
                const newHeight = (el.scrollHeight + 70) + 'px';
                dropdownHeight.value = newHeight;
            }, 30);
        } else {
            dropdownHeight.value = '0px';
        }
    });
</script>


<template>
    <div
        ref="dropdownRef"
        :style="{ height: dropdownHeight }"
        class="overflow-hidden transition-all duration-300 ease-in-out will-change-[height]"
    >
        <!-- Dropdown sekcija za navigaciju -->
        <div class="max-w-[575px] mx-auto pt-7 pb-12 border-t border-customColors-200">
            <Transition name="reveal">
                <div v-if="activetab === 'dresovi' && openMenu" :key="activetab" ref="activeTabContentRef" class="flex gap-4" id="dresovi">
                    <ul class="flex flex-col gap-3">
                    <li class="heading-sub"><NuxtLink to="/categories/dresovi/2024-2025">2024./2025.</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="/categories/dresovi/2023-2024">2023./2024.</NuxtLink></li>
                    <li class="heading-sub"><NuxtLink to="/categories/dresovi">Starije sezone</NuxtLink></li>
                    </ul>
                </div>
            </Transition>

            <Transition name="reveal">
                <div v-if="activetab === 'odjeca' && openMenu" :key="activetab" ref="activeTabContentRef" class="flex justify-between gap-4" id="odjeca">
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">MUŠKARCI</h5>
                        <hr class="divider">
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub"><NuxtLink to="#">Hoodice</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                        </ul>
                    </div>
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">ŽENE</h5>
                        <hr class="divider">
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub"><NuxtLink to="#">Hoodice</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                        </ul>
                    </div>
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">DJECA</h5>
                        <hr class="divider">
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub"><NuxtLink to="#">Hoodice</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                        </ul>
                    </div>
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">MODNI DODACI</h5>
                        <hr class="divider">
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub"><NuxtLink to="#">Kape</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Šalovi</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                        </ul>
                    </div>
                </div>
            </Transition>


            <Transition name="reveal">
                <div v-if="activetab === 'kolekcije' && openMenu" :key="activetab" ref="activeTabContentRef" class="flex justify-between gap-4" id="kolekcije">
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">JOMA</h5>
                        <hr class="divider">
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub"><NuxtLink to="#">Hlače</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Majice</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Trenerke</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Jakne</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Lopte</NuxtLink></li>
                        </ul>
                    </div>
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">HOODICE</h5>
                        <hr class="divider">
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub"><NuxtLink to="#">Muškarci</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Žene</NuxtLink></li>
                            <li class="heading-sub"><NuxtLink to="#">Djeca</NuxtLink></li>
                        </ul>
                    </div>
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">FORZA FIUME PREMIUM</h5>
                        <hr class="divider">
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub"><NuxtLink to="/categories/ff">Pogledaj kolekciju</NuxtLink></li>
                        </ul>
                    </div>
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">ZIGMAN & HNK RIJEKA</h5>
                        <hr class="divider">
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub"><NuxtLink to="#">Pogledaj kolekciju</NuxtLink></li>
                        </ul>
                    </div>
                </div>
            </Transition>


            <Transition name="reveal">
                <div v-if="activetab === 'pokloni' && openMenu" :key="activetab" ref="activeTabContentRef" class="flex gap-4" id="pokloni">
                    <ul class="flex flex-col gap-3">
                        <li class="heading-sub"><NuxtLink to="#">Školski asortiman</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Kućni asortiman</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Privjesci</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Zastave</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Čestitke</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                    </ul>
                </div>
            </Transition>

            <Transition name="reveal">
                <div v-if="activetab === 'akcije' && openMenu" :key="activetab" ref="activeTabContentRef" class="flex gap-4" id="akcije">
                    <ul class="flex flex-col gap-3">
                        <li class="heading-sub"><NuxtLink to="/categories/popusti-akcija/dresovi-popusti-akcija">Dresovi</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="/categories/popusti-akcija/joma-popusti-akcija">JOMA</NuxtLink></li>
                        <li class="heading-sub"><NuxtLink to="/categories/popusti-akcija/dodaci-ostalo">Ostalo</NuxtLink></li>
                    </ul>
                </div>
            </Transition>
        </div>
    </div>
</template>