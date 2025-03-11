<script setup lang="ts">
  defineProps<{
      countries: string[],
      form: {
        firstName: undefined,
        lastName: undefined,
        company: undefined,
        country: undefined,
        address: undefined,
        apartment: undefined,
        city: undefined,
        state: string,
        zipCode: undefined,
        phone: undefined,
        email: undefined,
        orderNote: undefined,
      };
  }>();
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 gap-4">
      <!-- First Name -->
      <UFormGroup label="First Name" name="firstName" class="col-span-2 sm:col-span-1">
        <UInput v-model="form.firstName" placeholder="First Name" required />
      </UFormGroup>

      <!-- Last Name -->
      <UFormGroup label="Last Name" name="lastName" class="col-span-2 sm:col-span-1">
        <UInput v-model="form.lastName" placeholder="Last Name" required />
      </UFormGroup>

      <!-- Company Name (optional) -->
      <UFormGroup label="Company Name (optional)" name="company" class="col-span-2">
        <UInput v-model="form.company" placeholder="Company" />
      </UFormGroup>

      <!-- Country/Region -->
      <UFormGroup label="Country / Region" name="country" class="col-span-2">
        <UInput v-model="form.country" placeholder="United States (US)" required />
      </UFormGroup>

      <!-- Street Address -->
      <UFormGroup label="Street Address" name="address" class="col-span-2 space-y-2">
        <UInput v-model="form.address" placeholder="House number and street name" required />
      </UFormGroup>

      <UFormGroup label="Street Address" name="apartment" class="col-span-2 space-y-2">
        <UInput v-model="form.apartment" placeholder="Apartment, suite, unit, etc. (optional)" />
      </UFormGroup>

      <!-- City -->
      <UFormGroup label="Town / City" name="city" class="col-span-2 sm:col-span-1">
        <UInput v-model="form.city" placeholder="City" required />
      </UFormGroup>

      <!-- State / County -->
      <UFormGroup label="State / County" name="state" class="col-span-2 sm:col-span-1">
        <USelect v-model="form.state" placeholder="Odaberi.." :options="countries" :required="true" />
      </UFormGroup>

      <!-- ZIP/Postcode -->
      <UFormGroup label="Postcode ZIP" name="zipCode" class="col-span-2 sm:col-span-1">
        <UInput v-model="form.zipCode" placeholder="ZIP" required />
      </UFormGroup>

      <!-- Phone -->
      <UFormGroup label="Phone" name="phone" class="col-span-2 sm:col-span-1">
        <UInput v-model="form.phone" placeholder="Phone" required />
      </UFormGroup>

      <!-- Email -->
      <UFormGroup label="Email Address" name="email" class="col-span-2">
        <UInput v-model="form.email" placeholder="Email" type="email" required />
      </UFormGroup>

      <!-- Order Notes -->
      <UFormGroup label="Order Notes (optional)" name="orderNote" class="col-span-2">
        <UTextarea v-model="form.orderNote" placeholder="Notes about your order, e.g. special instructions for delivery." />
      </UFormGroup>
    </div>
  </div>
</template>