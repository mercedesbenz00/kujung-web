<script lang="ts" setup>
import dayjs from 'dayjs';
import { VueFinalModal } from 'vue-final-modal';
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { Portfolio } from "~/ts/interfaces/Portfolio";
import { SCREEN_WIDTH } from "~~/ts/constants";
import { api } from "~/ts/api";
import { Common } from '~/ts/_utils/common';
const props = defineProps<{
  info?: Portfolio
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const curInfo = ref<Portfolio>()
const myCarousel = ref(null)

onMounted(() => {
  // document.body.style.overflow = "hidden";
  api.get(`/homepage/portfolio/${props.info?.id}`) // 단순 포트폴리오 조회수 올리기 위함.
  curInfo.value = props.info
});

onUnmounted(() => {
  // document.body.style.overflow = "auto";
});

const onPrev = (e: any) => {
  e.stopPropagation()
  api.get(
    `/homepage/portfolio/${curInfo.value?.id}/prev?sortBy=created_at&order=DESC&categoryList[]=${curInfo.value?.category}`
  )
    .then(response => {
      if (response.success) {
        if (response.data) {
          curInfo.value = response.data
          myCarousel.value.slideTo(0)
        } else {
          Common.showInfoToast("이전 포트폴리오가 없습니다.")
        }
      }
    })
}
const onNext = (e: any) => {
  e.stopPropagation()
  api.get(
    `/homepage/portfolio/${curInfo.value?.id}/next?sortBy=created_at&order=DESC&categoryList[]=${curInfo.value?.category}`
  )
    .then(response => {
      if (response.success) {
        if (response.data) {
          curInfo.value = response.data
          myCarousel.value.slideTo(0)
        } else {
          Common.showInfoToast("다음 포트폴리오가 없습니다.")
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
      <div class="w-full h-full justify-center items-center flex flex-col my-[100px] md:my-[300px]">
        <div class="relative w-full flex flex-col justify-center items-center">
          <section class="w-w-[320px] md:w-[640px] lg:w-[800px] flex flex-col" id="modalBanner"
            @click="(e: any) => e.stopPropagation()">
            <Carousel ref="myCarousel" class="w-full flex flex-col justify-center" :touchDrag="true" :itemsToShow="1"
              :wrapAround="false" :transition="500">
              <Slide class="p-0" v-for="(img, index) in curInfo?.portfolioImages" :key="index">
                <div class="w-full flex flex-col">
                  <img :src="img.image_url" class="w-full h-[320px] md:h-[640px] lg:h-[800px]" />
                </div>
              </Slide>
              <template #addons>
                <Pagination v-if="curInfo?.portfolioImages.length > 1" />
              </template>
            </Carousel>
            <div class="w-full flex flex-col bg-white py-[30px]">
              <p class="text-left text-[22px] md:text-[30px] font-bold mx-[36px] leading-[30px] md:leading-[40px]">
                {{ curInfo?.title }}
              </p>
              <div class="w-full md:px-[20px] mt-[11px] md:mt-[20px] lg:mt-[25px]">
                <Line class="w-full" />
              </div>
              <div class="md:mx-[36px] mt-[33px] md:mt-[19px] lg:mt-[13px] w-auto">
                <div class="flex flex-row">
                  <div class="content-text-l">콜라보</div>
                  <div class="content-text-r">{{ curInfo?.collaboration }}</div>
                </div>
                <div class="flex flex-row">
                  <div class="content-text-l">일시</div>
                  <div class="content-text-r">{{ dayjs(curInfo?.start_at).format("YYYY.MM.DD") }} ~
                    {{ dayjs(curInfo?.end_at).format("YYYY.MM.DD") }}</div>
                </div>
                <div class="flex flex-row">
                  <div class="content-text-l">장소</div>
                  <div class="content-text-r">
                    {{ curInfo?.place }}
                  </div>
                </div>
                <div class="flex flex-row">
                  <div class="content-text-l">온라인 정보</div>
                  <div class="content-text-r">{{ curInfo?.online_info }}</div>
                </div>
                <p
                  class="mt-[30px] text-[13px] md:text-[18px] leading-[18px] md:leading-[24px] px-[14px] md:px-[0] whitespace-pre-line text-left">
                  {{ curInfo?.content }}
                </p>
              </div>
            </div>
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
    position: fixed;

    @media (min-width: 768px) {
      width: 60px;
      height: 60px;
    }

    @media (min-width: 1280px) {
      width: 100px;
      height: 100px;
    }
  }

  .carousel__pagination {
    position: absolute;
    align-self: center;
    bottom: 27px;
  }

  .carousel__pagination-button {
    padding: 7px;
  }

  .carousel__pagination-button::after {
    display: block;
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: #ffffff7e;
  }

  .carousel__pagination-button:hover::after,
  .carousel__pagination-button--active::after {
    background-color: black;
  }
}
</style>
