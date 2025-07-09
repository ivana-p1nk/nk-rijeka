<script setup lang="ts">
import { z } from 'zod'
import type { IUser } from '~/types/user'
import countriesJson from '@/assets/countries.json';

useSeoMeta({ title: 'Moj profil' })

definePageMeta({
    title: 'Moj profil',
    middleware: 'sanctum:auth',
})

const { api } = useAxios()
const toast = useToast()
const user = useSanctumUser() as Ref<IUser | null>

const countries = countriesJson.map(c => ({
  label: c.name,
  value: c.value
}));

const state = reactive({
    firstName: user.value?.name?.split(' ')[0] || '',
    lastName: user.value?.name?.split(' ')[1] || '',
    company: user.value?.address?.company || '',
    country: user.value?.address?.state || '',
    city: user.value?.address?.city || '',
    zipCode: user.value?.address?.zip || '',
    address: user.value?.address?.address || '',
    phone: user.value?.address?.phone || '',
    email: user.value?.email || '',
})

const updateAddress = async () => {
    try {
      await api.put(`/user-address/${user.value?.id}`, {
          name: `${state.firstName} ${state.lastName}`,
          email: state.email,
          company: state.company,
          state: state.country,
          city: state.city,
          zip: state.zipCode,
          address: state.address,
          phone: state.phone,
      })
      toast.add({
          icon: 'solar:check-circle-broken',
          title: `Uspješno ažurirani podaci`,
          color: 'green',
      })
    } catch (err) {
      toast.add({
          icon: 'solar:check-circle-broken',
          title: `Greška prilikom ažuriranja podataka`,
          color: 'red',
      })
    }
}
</script>

<template>
  <section class="py-40" v-if="user">
    <div class="container mx-auto">
      <div class="relative mx-5">
        <p class="font-normal text-blue-900 font-roboto text-body2 pb-1 pt-10">
          <NuxtLink class="text-blue-400 link-color" to="/"> Početna / </NuxtLink>
          <span>Moj račun</span>
        </p>
        <h1 class="font-saira font-medium text-h1-normal text-gray-900 pb-6 md:pb-10">Moj račun</h1>

        <div class="flex flex-wrap">
          <div class="w-full mb-8 lg:w-1/3 lg:mb-0">
            <div class="lg:mr-10">
              <ProfileNav activeTab="nav-address" />
            </div>
          </div>

          <div class="w-full px-3 py-4 md:px-10 md:py-10 bg-white rounded lg:w-2/3 custom-shadow">
            <h1 class="text-2xl font-bold">ADRESA</h1>
            <p class="text-body1 pt-3 pb-10">Uredite podatke za naplatu.</p>

            <UForm @submit.prevent="updateAddress" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormGroup label="Ime" name="firstName" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                <UInput v-model="state.firstName" id="firstName" placeholder="Ime" variant="outline" size="lg" />
              </UFormGroup>

              <UFormGroup label="Prezime" name="lastName" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                <UInput v-model="state.lastName" id="lastName" placeholder="Prezime" variant="outline" size="lg" />
              </UFormGroup>

              <UFormGroup label="Firma" name="company" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                <UInput v-model="state.company" id="company" placeholder="Firma" variant="outline" size="lg" />
              </UFormGroup>

              <UFormGroup label="Država" name="country" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                <USelect v-model="state.country" :options="countries" placeholder="Odaberi državu" variant="outline" size="lg" />
              </UFormGroup>

              <UFormGroup label="Grad" name="city" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                <UInput v-model="state.city" id="city" placeholder="Grad" variant="outline" size="lg" />
              </UFormGroup>

              <UFormGroup label="Poštanski broj" name="zipCode" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                <UInput v-model="state.zipCode" id="zipCode" placeholder="Poštanski broj" variant="outline" size="lg" />
              </UFormGroup>

              <UFormGroup label="Adresa" name="address" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                <UInput v-model="state.address" id="address" placeholder="Adresa" variant="outline" size="lg" />
              </UFormGroup>

              <UFormGroup label="Telefon" name="phone" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                <UInput v-model="state.phone" id="phone" placeholder="Telefon" variant="outline" size="lg" />
              </UFormGroup>

              <UFormGroup label="Email" name="email" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                <UInput v-model="state.email" id="email" placeholder="Email" variant="outline" size="lg" />
              </UFormGroup>

              <div class="col-span-full mt-3">
                <UButton
                    type="submit"
                    class="w-fit px-5 py-2 font-bold text-white uppercase rounded-lg"
                    style="background: linear-gradient(79.46deg, #0083c9 3.18%, #58b6e7 107.55%)"
                >
                    spremi
                </UButton>
              </div>
            </UForm>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
    :deep(.form-input:focus),
    :deep(.form-input:focus-visible),
    :deep(.form-select:focus),
    :deep(.form-select:focus-visible),
    :deep(textarea:focus),
    :deep(textarea:focus-visible) {
        --tw-ring-color: #009FF5 !important;
        --tw-border-color: #009FF5 !important;
        border-color: #009FF5 !important;
    }

    :deep(.form-input),
    :deep(.form-select),
    :deep(textarea) {
        padding-top: 10px;
        padding-bottom: 10px;
        height: 42px;
    }
</style>