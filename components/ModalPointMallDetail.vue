<script lang="ts" setup>
import { SCREEN_WIDTH } from "~~/ts/constants";
import { VueFinalModal } from 'vue-final-modal'
import { PointProduct } from "~/ts/interfaces/PointProduct";
import { api } from "~/ts/api";
import { Common } from "~/ts/_utils/common";

const props = defineProps<{
  item?: PointProduct
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const itemDetail = ref<PointProduct | null>(null)

onMounted(() => {
  loadDetail()
});

onUnmounted(() => {
});

const loadDetail = () => {
  api.get(
    `/point-product/${props.item?.id}`
  )
    .then(response => {
      if (response.success) {
        itemDetail.value = response.data
      }
    })
}

const onPrev = (e: any) => {
  e.stopPropagation()
  api.get(
    `/point-product/${itemDetail.value?.id}/prev?sortBy=created_at&order=DESC`
  )
    .then(response => {
      if (response.success) {
        if (response.data) {
          itemDetail.value = response.data
        } else {
          Common.showInfoToast("이전 상품이 없습니다.")
        }
      }
    })
}
const onNext = (e: any) => {
  e.stopPropagation()
  api.get(
    `/point-product/${itemDetail.value?.id}/next?sortBy=created_at&order=DESC`
  )
    .then(response => {
      if (response.success) {
        if (response.data) {
          itemDetail.value = response.data
        } else {
          Common.showInfoToast("다음 상품이 없습니다.")
        }
      }
    })
}
</script>
<template>
  <VueFinalModal :lockScroll=false class="confirm-modal"
    content-class="confirm-modal-content w-full h-full absolute inset-0" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <div class="absolute inset-0 w-full h-full overflow-auto z-50" @click="emit('confirm')">
      <div class="w-full justify-center items-center flex flex-col my-[100px] lg:my-[200px]">
        <div class="relative w-full flex flex-col">
          <section class="w-full flex justify-center" id="modalBanner">
            <!-- <Carousel class="w-full flex flex-col justify-center" :touchDrag="false" :itemsToShow="1" :wrapAround="true"
              :transition="500">
              <Slide class="p-0" v-for="(slide, index) in 4" :key="index"> -->
            <div class="w-[320px] md:w-[640px] lg:w-[800px] flex flex-col" @click="(e: any) => e.stopPropagation()">
              <img :src="itemDetail?.thumb_url" class="w-full bg-primary-100 object-contain" />
              <div class="w-full flex flex-col bg-white py-[30px]">
                <p class="text-left text-[22px] md:text-[30px] font-bold mx-[36px] leading-[30px] md:leading-[40px]">
                  {{ itemDetail?.name }}
                </p>
                <div class="w-full md:px-[20px] mt-[11px] md:mt-[20px] lg:mt-[25px]">
                  <Line class="w-full" />
                </div>
                <div class="md:mx-[36px] mt-[33px] md:mt-[19px] lg:mt-[13px]">
                  <div :innerHTML="itemDetail?.desc"
                    class="text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] px-[14px] md:px-[0] whitespace-pre-line text-left">
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

          <button type="button"
            class="fixed w-[50px] md:w-[100px] h-[50px] md:h-[100px] bg-[#30302D80] flex justify-center items-center self-center left-0 top-[50vh]"
            @click="onPrev">
            <i class="las la-angle-left text-[white] text-[25px] md:text-[50px]"></i>
          </button>
          <button type="button"
            class="fixed w-[50px] md:w-[100px] h-[50px] md:h-[100px] bg-[#30302D80] flex justify-center items-center self-center right-0 top-[50vh]"
            @click="onNext">
            <i class="las la-angle-right text-[white] text-[25px] md:text-[50px]"></i>
          </button>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style lang="scss">
#modalBanner {
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
