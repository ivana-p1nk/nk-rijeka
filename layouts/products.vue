<template>
    <div>
        <header class="text-black bg-white shadow-sm">
            <nav class="container p-4 mx-auto">
                <NuxtLink to="/products" class="font-bold font-saira">PRODUCTS</NuxtLink>
            </nav>
        </header>

        <!-- output page content -->
         <div class="container p-4 mx-auto">
            <slot />
         </div>


         <div class="container flex justify-between p-4 mx-auto border-t-2">
            <ul class="flex gap-4 text-black">
                <li><NuxtLink to="/">HOME</NuxtLink></li>
                <li><NuxtLink to="/about">ABOUT</NuxtLink></li>
                <li><NuxtLink to="/theme-config">THEME CONFIG</NuxtLink></li>
                <li><NuxtLink to="/products">PRODUCTS</NuxtLink></li>
                <li><NuxtLink to="/categories">CATEGORIES</NuxtLink></li>
            </ul>
         </div>
    </div>
</template>