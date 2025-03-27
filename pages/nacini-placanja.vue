<script setup lang="ts">
import { InfoLinks } from '#components';

</script>

<template>
    <div class="max-w-[740px] mx-auto pt-52 pb-5 px-5">

        <h1 class="font-saira font-medium text-h1-normal text-gray-900 pb-5">
            NAČINI PLAĆANJA
        </h1>
        <p class="font-roboto font-normal text-body2 text-gray-900">
            Za kupovinu u HNK Rijeka Web Shopu možeš koristiti slijedeće NAĆINE PLAĆANJA:
        </p>
        <br>
        <p class="font-roboto font-normal text-body2 text-gray-900">
        <b>1. Pouzećem</b> za domaće pošiljke.
        </p>
        <br>
        <p class="font-roboto font-normal text-body2 text-gray-900">
        <b>2. Kartice:</b>
        <ul class="font-roboto font-normal text-body2 text-gray-900">
            <li>Maestro</li>
            <li>MasterCard</li>
            <li>Visa</li>
            <li>Diners</li>
        </ul>
        </p>
        <br>
        <h2 class="font-saira font-semibold text-h5-normal text-gray-900 pt-3">
            Plaćanje pouzećem nije moguće ako kupujete virtualni Gift Card, ili ako vam je taj proizvod dio narudžbe.
        </h2>
        <p class="font-roboto font-normal text-body2 text-gray-900">
            Karticu smijete koristiti isključivo ukoliko ste vlasnik iste. Potvrdom narudžbe potvrđujete da ste i vlasnik kartice. 
            Ukoliko izdavatelj kartice ne odobri plaćanje, nećemo prihvatiti vašu narudžbu i nećemo biti odgovorni za nedostavljanje iste.
            <br><br>
            Ukoliko nemamo dovoljno proizvoda na zalihama, obavijestiti ćemo Vas o tome, te će novčana transkakcija biti poništena 
            i Vaš račun neće biti terećen. Povrat ćemo obaviti što je ranije moguće, ne kasnije od 30 dana. Nećemo biti odgovorni za bilo
            kakav kompenzacije ukoliko proizvode koje ste naručili trenutno nemamo na stanju.
        </p>
        <h2 class="font-saira font-semibold text-h5-normal text-gray-900 pt-8">
            HNK RIJEKA WEB SHOP koristi WSPay za online plaćanja.
        </h2>
        <p class="font-roboto font-normal text-body2 text-gray-900">
            WSPay je siguran sustav za online plaćanje, plaćanje u realnom vremenu, kreditnim i debitnim karticama te drugim načinima plaćanja.
            WSPay kupcu i trgovcu osiguravaju siguran upis i prijenos upisanih podataka o karticama što podvrđuje i PCI DSS certifikat koji WSPay ima. 
            WSPay koristi SSL certifikat 256 bitne enkripcije te TLS 1.2 kriptografski protokol kao najviše stupnjeve zaštite kod upisa i prijenosa podataka.
        </p>
        <InfoLinks />
    </div>
</template>