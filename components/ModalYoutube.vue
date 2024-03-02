<script lang="ts" setup>
import { SCREEN_WIDTH } from "~~/ts/constants";
import { VueFinalModal } from 'vue-final-modal'
import { Common } from "~/ts/_utils/common";
const props = defineProps<{
  videoUrl?: String
}>()
const emit = defineEmits<{
  (e: 'confirm'): void
}>()

onMounted(() => {
  // document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  // document.body.style.overflow = "auto";
});
</script>
<template>
  <VueFinalModal :lockScroll=false class="confirm-modal"
    content-class="confirm-modal-content w-full h-full absolute inset-0" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <div class="absolute inset-0 w-full px-[20px] md:px-0 h-full overflow-auto z-50" @click="emit('confirm')">
      <div class="w-full h-full justify-center items-center flex flex-col">
        <div class="relative w-full flex flex-col">
          <section class="w-full flex items-center justify-center">
            <div class="w-[320px] md:w-[640px] lg:w-[1024px] flex flex-col lg:ml-[-15px] relative"
              @click="(e: any) => e.stopPropagation()">
              <iframe :src="Common.getYoutubeUrl(Common.getYoutubeIdFromURL(videoUrl))"
                class="w-full h-[320px] md:h-[680px]" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen />
            </div>
          </section>
          <button type="button"
            class="absolute w-[42px] md:w-[84px] h-[42px] md:h-[84px] bg-[#1C1B1F] rounded-[50%] flex justify-center items-center self-center top-[-21px] md:top-[-42px]"
            :style="SCREEN_WIDTH > 1024 ? 'right: calc(50vw - 560px)' : SCREEN_WIDTH > 768 ? 'right: calc(50vw - 380px)' : 'right: calc(50vw - 190px)'"
            @click="emit('confirm')">
            <i class="las la-times text-[white] text-[25px] md:text-[50px]"></i>
          </button>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style lang="scss">

</style>
