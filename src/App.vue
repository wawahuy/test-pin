<template>
    <div class="tw-m-auto tw-mt-10 tw-w-[50%] tw-px-5 tw-pt-6 tw-pb-10 tw-shadow-md tw-border tw-rounded-md">
        <label class="tw-text-3xl tw-font-bold tw-text-gray-800">
            Enter PIN
        </label>
        <div class="tw-mt-4">
            <Pin 
                :pin-size="5"
                :default-value="'09090'"
                @on-change="state.pins = $event"
                @on-filled="state.lastPins = $event"
                />
        </div>
        <button
            type="button"
            class="tw-text-white tw-bg-[#53606f] hover:tw-bg-[#53506f]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center tw-inline-flex tw-items-center tw-me-2 tw-mb-2 tw-mt-3"
            @click="onSubmit"
        >
            Submit
        </button>

        <div class="tw-mt-3 tw-border-t">
            <div class="tw-mt-2 tw-text-2xl">
                Debug
            </div>
            <div class="tw-mt-2">
                OnChange: {{ state.pins }}
            </div>
            <div class="tw-mt-1">
                OnFilled: {{ state.lastPins }}
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { shallowRef, defineAsyncComponent, reactive } from 'vue';
const Pin = shallowRef(defineAsyncComponent(() => import('./components/Pin.vue')));

const state = reactive({
    pins: '' as String,
    lastPins: '' as String,
});

const onSubmit = () => {
    alert(`Value is ${state.pins}`);
}
</script>

