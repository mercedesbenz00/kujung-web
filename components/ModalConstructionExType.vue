<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
const props = defineProps({
  onSelect: {
    type: Function,
    default(type: number) {
    }
  }
});
const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>
<template>
  <VueFinalModal :lockScroll=false class="confirm-modal" content-class="confirm-modal-content w-full max-w-[640px] lg:max-w-[768px]"
    overlay-transition="vfm-fade" content-transition="vfm-fade">
    <slot />
    <div class="w-full pt-[20px] md:pt-[30px] pb-[108px] md:pb-[50px] bg-warmGray-500 flex flex-col items-center">
      <button class="self-end text-[17px] md:text-[27px] text-black mr-[20px] md:mr-[30px]" @click="emit('confirm')">
        <i class="las la-times"></i>
      </button>
      <p class="mt-[27px] md:mt-0 text-[18px] md:text-[24px] leading-[24px] md:leading-[36px] font-bold">
        집들이 유형 선택
      </p>
      <div
        class="flex flex-row mt-[48px] md:mt-[35px] w-full gap-x-[8px] md:gap-x-[20px] px-[20px] md:px-[70px] lg:px-[130px] ">
        <div
          class="border border-secondaryNavy-500 flex flex-col items-center flex-1 pt-[30px] md:pt-[36px] pb-[10px] md:pb-[20px] cursor-pointer"
          @click="() => {
            onSelect(1)
          }">
          <div
            class="w-[50px] md:w-[70px] h-[50px] md:h-[80px] rounded-[12px] bg-[#CBB1B0] items-center justify-center flex">
            <img src="/img/ic_person.svg" class="w-[33px] md:w-[40px]">
          </div>
          <p class="mt-[6px] md:mt-[8px] text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] font-bold">
            랜선 집들이
          </p>
          <p
            class="mt-[6px] md:mt-[14px] text-[11px] leading-[15px] md:text-[12px] md:leading-[16px] text-black text-center">
            간편하게 작성할 수 있는<br />
            온라인 랜선 집들이
          </p>
        </div>

        <div
          class="border border-secondaryNavy-500 flex flex-col items-center flex-1 pt-[30px] md:pt-[36px] pb-[10px] md:pb-[20px] cursor-pointer"
          @click="() => {
            onSelect(2)
          }">
          <div
            class="w-[50px] md:w-[70px] h-[50px] md:h-[80px] rounded-[12px] bg-[#A6CFEF] items-center justify-center flex">
            <img src="/img/ic_person.svg" class="w-[33px] md:w-[40px]">
          </div>
          <p class="mt-[6px] md:mt-[8px] text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] font-bold">
            전문가 집들이
          </p>
          <p
            class="mt-[6px] md:mt-[14px] text-[11px] leading-[15px] md:text-[12px] md:leading-[16px] text-black text-center">
            사진과 설명으로 인테리어를<br />
            보여줄 수 있는 전문가 집들이
          </p>
        </div>

      </div>

    </div>
  </VueFinalModal>
</template>
<style>

</style>
