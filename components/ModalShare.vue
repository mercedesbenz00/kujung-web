<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { Common } from '~/ts/_utils/common';
const props = defineProps<{
  shareUrl: string,
  imageUrl: string,
  title: string,
}>()
const emit = defineEmits<{
  (e: 'confirm'): void
}>()

onMounted(() => {
})
const onShareKakao = () => {
  emit('confirm')
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: props.title,
      description: `구정마루에서 ${props.title}을(를) 만나보세요.`,
      imageUrl:
        props.imageUrl,
      link: {
        mobileWebUrl: props.shareUrl,
        webUrl: props.shareUrl,
      },
    },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          mobileWebUrl: props.shareUrl,
          webUrl: props.shareUrl,
        },
      },
    ],
  })
}

const onShareNaver = () => {
  emit('confirm')
  var url = encodeURI(encodeURIComponent(`${props.shareUrl}`));
  var title = encodeURI(props.title);
  var shareURL = "https://share.naver.com/web/shareView?url=" + url + "&title=" + title;
  window.open(shareURL)
}

const onCopyUrl = () => {
  var copyText = document.querySelector("#myinput");
  copyText?.select();
  document.execCommand('copy');
  Common.showSuccessToast("복사되었습니다.")
  emit('confirm')
}

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
        공유하기
      </p>
      <div
        class="flex flex-row mt-[48px] md:mt-[35px] w-full gap-x-[8px] md:gap-x-[20px] px-[20px] md:px-[70px] lg:px-[130px] ">
        <div
          class="border border-secondaryNavy-500 flex flex-col items-center flex-1 pt-[30px] md:pt-[36px] pb-[10px] md:pb-[20px] cursor-pointer"
          @click="() => {
            onShareKakao()
          }">
          <div class="w-[50px] md:w-[70px] h-[50px] md:h-[80px] rounded-[12px] items-center justify-center flex">
            <img srcSet="/img/icons/btn_kakao.svg" class="w-[33px] md:w-[50px]">
          </div>
          <p class="mt-[6px] md:mt-[8px] mb-[16px] md:mb-[24px] text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] font-bold">
            카카오톡
          </p>
        </div>

        <div
          class="border border-secondaryNavy-500 flex flex-col items-center flex-1 pt-[30px] md:pt-[36px] pb-[10px] md:pb-[20px] cursor-pointer"
          @click="() => {
            onShareNaver()
          }">
          <div class="w-[50px] md:w-[70px] h-[50px] md:h-[80px] rounded-[12px] items-center justify-center flex">
            <img srcSet="/img/icons/btn_naver.svg" class="w-[33px] md:w-[50px]">
          </div>
          <p class="mt-[6px] md:mt-[8px] mb-[16px] md:mb-[24px] text-[13px] leading-[18px] md:text-[18px] md:leading-[24px] font-bold">
            네이버 블로그
          </p>
        </div>
      </div>

      <div class="flex flex-row mt-[48px] md:mt-[35px] w-full px-[20px] md:px-[70px] lg:px-[130px] ">
        <input type="text" class="form-box1" :value="shareUrl" readonly id="myinput" />
        <button type="button" class="button-1" @click="onCopyUrl">URL 복사</button>
      </div>

    </div>
  </VueFinalModal>
</template>
<style>

</style>
