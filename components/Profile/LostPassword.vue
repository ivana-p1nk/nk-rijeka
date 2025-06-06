<script setup lang="ts">
    import { z } from "zod";
    import type { FormSubmitEvent } from "#ui/types";

    const { api } = useAxios();
    type Schema = z.output<typeof schema>;
    const toast = useToast()

    useSeoMeta({
        title: "Zaboravljena lozinka",
    });

    const schema = z.object({
        email: z
            .string({ message: "Ovo polje je obavezno!" })
            .email("Invalid email"),
    });

    const state = reactive({
        email: undefined,
    });

    const loading = ref(false);

    async function onSubmit(event: FormSubmitEvent<Schema>) {
        loading.value = true;

        api.post("/forgot-password", event.data)
            .then(({ data }) => {
                loading.value = false;
                toast.add({
                    title: 'Uspješno Vam je poslan email!',
                    color: 'green',
                    timeout: 3000,
                })
            })
            .catch((err) => {
                loading.value = false;
                toast.add({
                    title: 'Error',
                    description: 'Greška',
                    color: 'red',
                    timeout: 3000,
                })
            });
    }
</script>

<template>
    <section
        id="form"
        aria-labelledby="form"
        class="container justify-center pt-20 pb-32"
    >
        <div class="pb-12 sm:mx-auto sm:w-full sm:max-w-7xl">
            <h3 class="uppercase text-4xl font-bold leading-9 tracking-tight text-center">
                Resetiranje lozinke
            </h3>
        </div>

        <UContainer :ui="{ constrained: 'mx-auto w-full sm:max-w-lg' }">
            <UForm
                :schema="schema"
                :state="state"
                class="space-y-4"
                @submit="onSubmit"
            >
                <UFormGroup label="Email" name="email" :ui="{
                    label: {
                        base: 'text-[#111827] font-roboto font-normal text-sm',
                    },
                }">
                    <UInput v-model="state.email" variant="outline" size="lg" />
                </UFormGroup>

                <UButton :disabled="loading" :loading="loading" type="submit" block size="lg" :ui="{
                    base: '!font-saira !bg-blue-600 uppercase !font-bold !text-white !rounded-[6px]',
                }">
                    Pošalji email za resetiranje lozinke
                </UButton>
            </UForm>
        </UContainer>
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
        box-shadow: 0 0 0 1px #009FF5 !important;
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