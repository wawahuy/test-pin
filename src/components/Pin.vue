<template>
    <div class="tw-flex tw-gap-5 tw-mb-1 tw-items-center">
        <input
            v-for="(_, index) in pinItemList"
            class="tw-border tw-rounded-lg tw-w-[45px] tw-h-[50px] tw-text-center"
            :ref="el => pinItemRefs[index] = el"
            :value="state.isHide ? (state.pins[index] === '' ? '' : '*') : state.pins[index]"
            @keydown="onKeyDown($event, index)"
         />
        <a 
            class=" tw-text-gray-500 tw-cursor-pointer tw-border tw-px-2 tw-py-3 tw-rounded-lg tw-bg-gray-100"
            @click="onToggleVisible"
        >
            {{ state.isHide ? 'Show' : 'Hide' }}
        </a>
    </div>

</template>

<script setup lang="ts">
import { computed, ref, defineProps, onMounted, watch, reactive, defineEmits } from 'vue';
import { isBackspace, isNumber } from '../utils';

const props = defineProps({
    pinSize: {
        type: Number,
        required: true,
    },
    defaultValue: {
        type: String,
    }
});

const emits = defineEmits<{
  (e: 'onChange', value: string): void,
  (e: 'onFilled', value: string): void,
}>();

const state = reactive({
    pins: [] as string[],
    isHide: false,
});

const pinItemList = computed(() => Array.from({ length: props.pinSize }));
const pinItemRefs = ref<any[]>([]);

const emitOnChange = () => {
    emits('onChange', state.pins.join(''));
}

const emitOnFilled = () => {
    emits('onFilled', state.pins.join(''));
}

const onKeyDown = (event: KeyboardEvent, index: number) => {
    event.preventDefault();
    event.stopPropagation();
    let stepInput: HTMLInputElement | null = null;
    let isInputLast = false;
    if (isBackspace(event)) {
        const prevIndex = index > 0 ? index - 1 : 0;
        const prevInput = pinItemRefs.value[prevIndex];
        state.pins[index] = '';
        stepInput = prevInput;
    } else if (isNumber(event)) {
        const nextIndex = index < props.pinSize - 1 ? index + 1 : index;
        const nextInput = pinItemRefs.value[nextIndex];
        stepInput = nextInput;
        state.pins[index] = event.key;
        isInputLast = index === nextIndex; 
    }
    if (stepInput) {
        requestAnimationFrame(() => {
            stepInput?.focus();
            emitOnChange();
            if (isInputLast) {
                emitOnFilled();
            }
        });
    }
}

const onToggleVisible = () => {
    state.isHide = !state.isHide;
}

const init = () => {
    const df = props.defaultValue;
    if (df) {
        state.pins = pinItemList.value.map((_, index) => {
            return df.charAt(index);
        });
    }
    requestAnimationFrame(() => {
        emitOnChange();
        emitOnFilled();
        const firstInput = pinItemRefs.value[0];
        if (firstInput) {
            firstInput.focus();
        }
    })
}

onMounted(() => {
    init();
})

watch(() => props.pinSize, () => {
    init();
})
</script>

