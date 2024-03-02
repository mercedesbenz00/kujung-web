<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
defineProps<{
  title?: string
}>()
const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>
<template>
  <VueFinalModal :lockScroll=false class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <slot />
    <button type="button" class="absolute w-[42px] md:w-[84px] h-[42px] md:h-[84px] bg-[#1C1B1F] rounded-[50%] flex justify-center items-center self-center 
          top-[4px] md:top-[8px] right-[4px] md:right-[8px]" @click="emit('confirm')">
      <i class="las la-times text-[white] text-[25px] md:text-[50px]"></i>
    </button>
  </VueFinalModal>
</template>
<style>

</style>
