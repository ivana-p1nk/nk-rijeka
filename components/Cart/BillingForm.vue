<script setup lang="ts">
defineProps<{
    form: {
        firstName: undefined,
        lastName: undefined,
        company: undefined,
        country: undefined,
        city: undefined,
        zipCode: undefined,
        address: undefined,
        phone: undefined,
        email: undefined,
        orderNote: undefined,
    };
}>();

const countries = ['United States', 'Canada', 'Mexico']
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <!-- First Name -->
        <UFormGroup label="Ime" name="firstName" class="col-span-2 sm:col-span-1">
            <UInput v-model="form.firstName" placeholder="Ime" required />
        </UFormGroup>

        <!-- Last Name -->
        <UFormGroup label="Prezime" name="lastName" class="col-span-2 sm:col-span-1">
            <UInput v-model="form.lastName" placeholder="Prezime" />
        </UFormGroup>

        <!-- Company Name (optional) -->
        <UFormGroup label="Naziv firme (opcionalno)" name="company" class="col-span-2">
            <UInput v-model="form.company" placeholder="Naziv firme" />
        </UFormGroup>

        <!-- Country/Region -->
        <UFormGroup label="Država" name="country" class="col-span-2">
            <UInput v-model="form.country" placeholder="Croatia" />
        </UFormGroup>

        <!-- City -->
        <UFormGroup label="Grad" name="city" class="col-span-2">
            <UInput v-model="form.city" placeholder="Grad" />
        </UFormGroup>

        <!-- ZIP/Postcode -->
        <UFormGroup label="Poštanski broj" name="zipCode" class="col-span-2">
            <UInput v-model="form.zipCode" placeholder="Poštanski broj" />
        </UFormGroup>

        <!-- Street Address -->
        <UFormGroup label="Adresa" name="address" class="col-span-2 space-y-2">
            <UInput v-model="form.address" placeholder="Ime ulice i broj" />
        </UFormGroup>

        <!-- Phone -->
        <UFormGroup label="Telefon" name="phone" class="col-span-2">
            <UInput v-model="form.phone" placeholder="Phone" />
        </UFormGroup>

        <!-- Email -->
        <UFormGroup label="Email" name="email" class="col-span-2">
            <UInput v-model="form.email" placeholder="Email" type="email" />
        </UFormGroup>

        <!-- Order Notes -->
        <UFormGroup label="Order Notes (optional)" name="orderNote" class="col-span-2">
            <UTextarea v-model="form.orderNote"
                placeholder="Notes about your order, e.g. special instructions for delivery." />
        </UFormGroup>
    </div>
</template>