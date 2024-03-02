<script setup lang="ts">
const props = defineProps({
    currentStepIndex: {
        type: Number,
        required: true,
        default: 0
    },
    stepCount: {
        type: Number,
        required: true,
        default: 3
    }
});

const { currentStepIndex } = toRefs(props);

const stepLabels = props.stepCount == 2 ? ["기본정보", "추가정보 입력"] : props.stepCount == 3 ? ["기본정보", "기본정보", "추가정보 입력"] : ["기본정보", "기본정보", "기본정보", "추가정보 입력"];

</script>
<template>
    <div>
        <div class="flex flex-col gap-[6px] w-full">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-[12px]">
                    <div class="flex items-center">
                        <span class="text-[18px] md:text-[24px]">Step<span class="font-bold">0{{
                            currentStepIndex }}</span></span>
                    </div>
                    <div class="w-[2px] h-[24px] bg-black"></div>
                    <span class="text-[18px] md:text-[24px] font-bold">{{ stepLabels[currentStepIndex - 1] }}</span>
                </div>
                <span v-if="currentStepIndex < props.stepCount" class="text-caption2 font-bold">*필수 입력 사항</span>
            </div>
        </div>
        <div v-if="props.stepCount == 2" class="w-full h-[10px] bg-primary-200 relative mt-[10px]">
            <div v-if="currentStepIndex === 1" class="absolute top-0 left-0 h-[10px] bg-primary-500 w-1/2"></div>
            <div v-else-if="currentStepIndex === 2" class="absolute top-0 left-0 h-[10px] bg-primary-500 w-full"></div>
        </div>
        <div v-else-if="props.stepCount == 3" class="w-full h-[10px] bg-primary-200 relative mt-[10px]">
            <div v-if="currentStepIndex === 1" class="absolute top-0 left-0 h-[10px] bg-primary-500 w-1/3"></div>
            <div v-else-if="currentStepIndex === 2" class="absolute top-0 left-0 h-[10px] bg-primary-500 w-2/3"></div>
            <div v-else-if="currentStepIndex === 3" class="absolute top-0 left-0 h-[10px] bg-primary-500 w-full"></div>
        </div>
        <div v-else class="w-full h-[10px] bg-primary-200 relative mt-[10px]">
            <div v-if="currentStepIndex === 1" class="absolute top-0 left-0 h-[10px] bg-primary-500 w-1/4"></div>
            <div v-else-if="currentStepIndex === 2" class="absolute top-0 left-0 h-[10px] bg-primary-500 w-2/4"></div>
            <div v-else-if="currentStepIndex === 3" class="absolute top-0 left-0 h-[10px] bg-primary-500 w-3/4"></div>
            <div v-else-if="currentStepIndex === 4" class="absolute top-0 left-0 h-[10px] bg-primary-500 w-full"></div>
        </div>
    </div>
</template>