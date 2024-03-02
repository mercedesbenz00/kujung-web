<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal';
import { api } from "~/ts/api";
import { Notification } from "~/ts/interfaces/Notification";
import { SCREEN_WIDTH } from "~~/ts/constants";

const props = defineProps<{
  item?: Notification
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const itemDetail = ref<Notification | null>(null)

onMounted(() => {
  loadDetail()
});

onUnmounted(() => {
});

const loadDetail = () => {
  api.get(
    `/homepage/notification/${props.item?.id}`
  )
    .then(response => {
      if (response.success) {
        itemDetail.value = response.data
      }
    })
}

</script>
<template>
  <VueFinalModal :lockScroll=false class="confirm-modal"
    content-class="confirm-modal-content w-full h-full absolute inset-0" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <div class="absolute inset-0 w-full h-full overflow-auto z-50" @click="emit('confirm')">
      <div class="w-full justify-center items-center flex flex-col  my-[0px] md:my-[100px] lg:my-[200px]">
        <div class="relative w-full flex flex-col">
          <section class="w-full flex justify-center" id="noticeModalBanner">
            <!-- <Carousel class="w-full flex flex-col justify-center" :touchDrag="false" :itemsToShow="1" :wrapAround="true"
              :transition="500">
              <Slide class="p-0" v-for="(item, index) in 4" :key="index"> -->
            <div class="w-[320px] md:w-[640px] lg:w-[800px] flex flex-col" @click="(e: any) => e.stopPropagation()">
              <img :src="item?.thumb_url" class="w-full object-contain" />
              <div class="w-full flex flex-col bg-white py-[30px]">
                <p class="text-left text-[22px] md:text-[30px] font-bold mx-[36px] leading-[30px] md:leading-[40px]">
                  {{ item?.title }}
                </p>
                <div class="w-full md:px-[20px] mt-[11px] md:mt-[20px] lg:mt-[25px]">
                  <Line class="w-full" />
                </div>
                <div class="md:mx-[36px] mt-[33px] md:mt-[19px] lg:mt-[13px] mb-[80px]">
                  <div :innerHTML="itemDetail?.content"
                    class="text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] px-[14px] md:px-[0] w-full whitespace-pre-line text-left">
                  </div>
                </div>
              </div>
            </div>
            <!-- </Slide>
              <template #addons>
                <Navigation />
              </template>
            </Carousel> -->
          </section>
          <button type="button"
            class="absolute w-[42px] md:w-[84px] h-[42px] md:h-[84px] bg-[#1C1B1F] rounded-[50%] flex justify-center items-center self-center top-[-21px] md:top-[-42px]"
            :style="SCREEN_WIDTH > 1024 ? 'right: calc(50vw - 460px)' : SCREEN_WIDTH > 768 ? 'right: calc(50vw - 380px)' : 'right: calc(50vw - 180px)'"
            @click="emit('confirm')">
            <i class="las la-times text-[white] text-[25px] md:text-[50px]"></i>
          </button>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style lang="scss">


#noticeModalBanner {
  .carousel__slide {
    padding: 0px;
  }

  .carousel__prev,
  .carousel__next {
    margin: 0px;
    width: 50px;
    height: 50px;

    @media (min-width: 768px) {
      width: 60px;
      height: 60px;
    }

    @media (min-width: 1280px) {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
