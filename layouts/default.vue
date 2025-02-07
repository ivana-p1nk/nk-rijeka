<template>
    <div>
        <header class="shadow-sm bg-white">
            <nav class="container mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-saira font-bold">Logo</NuxtLink>
                <ul class="flex gap-4">
                    <li><NuxtLink to="/">HOME</NuxtLink></li>
                    <li><NuxtLink to="/about" >ABOUT</NuxtLink></li>
                    <li><NuxtLink to="/theme-config">THEME CONFIG</NuxtLink></li>
                    <li><NuxtLink to="/products" class="btn">PRODUCTS</NuxtLink></li>
                    
                </ul>
            </nav>
        </header>

        <!-- output page content -->
         <div class="container mx-auto p-4">
            <slot />
         </div>

         

         <footer class="mx-auto border-t-2 bg-blue-300">

            <div class="">

                <div>
                <!-- POSTANI ČLAN-->
                </div>

                <div>
                  <img src="/assets/images/Slogan.png">
                  <a href="https://nk-rijeka.hr/" target="blank" class="font-saira font-semibold text-h4-normal text-blue-100">nk-rijeka.hr</a>
                </div>

                <!--footer menu-->
                <div class="mx-auto max-w-[1480px] flex gap-3.5">
                    <div class="w-1/6">
                        <img src="~/assets/images/hnk-rijeka-grb.svg" alt="HNK Rijeka Grb"  />
                    </div>

                    <div class="w-1/6">
                        <h6 class="footer-title">Društvene mreže</h6>
                        <p class="footer-text mb-4">Budi dio HNK Rijeka zajednice na društvenim mrežama</p>
                        <ul class="inline-flex gap-1">
                            <li>
                                <a class="circle-footer" href="https://www.facebook.com/nk.rijeka" target="_blank">
                                    <Icon name="brandico:facebook" class="custom-blue" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-footer" href="https://www.youtube.com/user/hnkrijekasluzbeni" target="_blank">
                                    <Icon name="mdi:youtube" class="custom-blue" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-footer" href="https://www.tiktok.com/@hnkrijeka" target="_blank">
                                    <Icon name="famicons:logo-tiktok" class="custom-blue" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-footer" href="https://www.instagram.com/nk_rijeka" target="_blank">
                                    <Icon name="hugeicons:instagram" class="custom-blue" />
                                </a>
                            </li>
                            <li>
                                <a class="circle-footer" href="https://x.com/nkrijeka?mx=2" target="_blank">
                                    <Icon name="garden:twitter-stroke-12" class="custom-blue" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="w-1/6">
                        <h6 class="footer-title">O nama</h6>
                        <p class="footer-text mb-4"><NuxtLink to="/kontakt">Kontakt</NuxtLink></p>
                        <p class="footer-text"><NuxtLink to="/fan-shop">Fan Shop HNK Rijeka</NuxtLink></p>
                    </div>

                    <div class="w-1/6">
                        <h6 class="footer-title">Korisničke usluge</h6>
                        <p class="footer-text mb-4"><NuxtLink to="/dostava">Dostava unutar RH</NuxtLink></p>
                        <p class="footer-text"><NuxtLink to="/medunarodna-dostava">Međunarodna dostava</NuxtLink></p>
                    </div>

                    <div class="w-1/6">
                        <h6 class="footer-title">Uvijeti korištenja</h6>
                        <p class="footer-text mb-4"><NuxtLink to="/nacin-placanja">Način plaćanja</NuxtLink></p>
                        <p class="footer-text mb-4"><NuxtLink to="/opci-uvjeti">Opći uvjeti kupnje</NuxtLink></p>
                        <p class="footer-text mb-4"><NuxtLink to="/zastita-podataka">Zaštita podataka</NuxtLink></p>
                        <p class="footer-text"><NuxtLink to="/politika-kolacica">Politika o kolačićima</NuxtLink></p>
                    </div>

                    <div class="w-1/6">
                        <h6 class="footer-title">Newsletter</h6>
                        <p class="footer-text">Doznaj prvi sve vijesti i promocije u svom inboxu</p>
                        <!-- newsletter code-->
                    </div>


                </div>

                <!--cards-->
                <div class="mx-auto max-w-[825px] grid grid-cols-10 items-center justify-items-center py-14">         
                    <img src="~/assets/images/logos/mastercard-id.png" alt="Mastercard ID Check Logo"  />
                    <img src="~/assets/images/logos/visa-secure.png" alt="Visa Secure Logo"  />
                    <img src="~/assets/images/logos/american.png" alt=" American express Logo"  />
                    <img src="~/assets/images/logos/diners.png" alt="Diners Club Logo"  />
                    <img src="~/assets/images/logos/visa.png" alt="Visa Logo"  />
                    <img src="~/assets/images/logos/mastercard.png" alt="MasterCard Logo"  />
                    <img src="~/assets/images/logos/maestro.png" alt="Maestro Logo"  />
                    <img src="~/assets/images/logos/discover.png" alt="Discover Network Logo"  />
                    <img src="~/assets/images/logos/dina.png" alt="DinaCard Logo"  />
                    <img src="~/assets/images/logos/wspay.png" alt="WS Pay Logo"  />
                </div>

            </div>

            <div class="mx-auto p-6 flex items-center justify-between border-t-1 border-b-blue-800 bg-blue-800">
                <div class="text-blue-400 text-roboto text-body4 font-normal">Copyright © {{ new Date().getFullYear() }} HNK Rijeka</div>
                <div class="text-blue-400 text-roboto text-body4 font-normal">Design and development by:  
                    <a href="https://prospekt.hr" target="_blank" class="text-white font-bold hover:underline">Prospekt</a>
                </div>
            </div>

        </footer>
    </div>
</template>