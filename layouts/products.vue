<template>
    <div>
        <header class="shadow-sm bg-white  text-black">
            <nav class="container mx-auto p-4">
                <NuxtLink to="/products" class="font-bold font-saira">PRODUCTS</NuxtLink>
            </nav>
        </header>

        <!-- output page content -->
         <div class="container mx-auto p-4">
            <slot />
         </div>


         <footer class="container mx-auto p-4 flex justify-between border-t-2">
            <ul class="flex gap-4 text-black">
                <li><NuxtLink to="/">HOME</NuxtLink></li>
                <li><NuxtLink to="/about">ABOUT</NuxtLink></li>
                <li><NuxtLink to="/theme-config">THEME CONFIG</NuxtLink></li>
                <li><NuxtLink to="/products">PRODUCTS</NuxtLink></li>
            </ul>
         </footer>
    </div>
</template>