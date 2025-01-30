<template>
    <div>
        <header>
            <nav>
                <li><NuxtLink to="/products" class="text-blue-700 underline">PRODUCTS</NuxtLink></li>
            </nav>
        </header>

        <!-- output page content -->
         <div>
            <slot />
         </div>


         <footer>
            <ul class="flex gap-8">
                <li><NuxtLink to="/" class="text-blue-700 underline" >HOME</NuxtLink></li>
                <li><NuxtLink to="/about" class="text-blue-700 underline" >ABOUT</NuxtLink></li>
                <li><NuxtLink to="/theme-config" class="text-blue-700 underline">THEME CONFIG</NuxtLink></li>
                <li><NuxtLink to="/products" class="text-blue-700 underline">PRODUCTS</NuxtLink></li>
            </ul>
         </footer>
    </div>
</template>