<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
const props = defineProps({
});
const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>
<template>
  <VueFinalModal :lockScroll=false class="confirm-modal"
    content-class="confirm-modal-content w-full h-full md:h-[800px] lg:h-[760px] max-w-[640px] lg:max-w-[768px] absolute inset-0"
    overlay-transition="vfm-fade" content-transition="vfm-fade">
    <div
      class="absolute inset-0 w-full h-full overflow-auto pt-[20px] md:pt-[30px] pb-[108px] md:pb-[50px] bg-warmGray-500 flex flex-col items-center">
      <button class="self-end text-[17px] md:text-[27px] text-black mr-[20px] md:mr-[30px]" @click="emit('confirm')">
        <i class="las la-times"></i>
      </button>
      <p class="mt-[27px] md:mt-0 text-[18px] md:text-[24px] leading-[24px] md:leading-[36px] font-bold">
        온라인 집들이 가이드
      </p>
      <p class="text-[15px] leading-[20px] break-keep mx-[18px] md:mx-[72px] lg:mx-[43px] mt-[50px] lg:mt-[65px]">
        <b>1. 온라인 집들이</b><br />
        - 온라인 집들이는 랜선, 전문가 집들이를 통합해서 부르는 명칭입니다.<br />
        - 온라인 집들이(랜선, 전문가 집들이) 에 사진을 업로드 시, 소정의 선물 혹은 포인트를 증정드립니다.<br />
        - 온라인 집들이는 자신만의 인테리어를 다른 사람들에게 보여줄 수 있으며, 해당 업로드 된 사진들은
        관리자의 검수를 통하여, 업로드가 됩니다.<br />
        - 미풍양속을 헤치는 내용 혹은 타인에게 불쾌함을 주는 내용은 동의 없이 삭제 될 수 있습니다.<br />
        - 해당 내용을 관리자가 검수하였을 때, 내용이 부족한 경우 관리자가 추가 수정을 요청할 수 있습니다.<br />
        - 사진은 수직, 수평을 맞추어 올려주세요.<br />
        - 저화질의 사진보다 고화질의 사진을 올려주세요.<br />
        - 온라인 집들이에 올라온 모든 내용은 (주) 구정마루에서 컨텐츠 혹은 기타 활동에 활용 하실 수 있습니다.<br />
        <br />
        <b>2. 랜선집들이</b><br />
        - 랜선집들이는 사진만 올려서 간편하게 볼 수 있는 인터넷 집들이입니다.<br />
        - 방, 거실, 화장실, 주방의 사진을 사진을 올려주세요.(최소 8장)<br />
        - 구역별로 여러 각도의 사진도 가능합니다. (사진을 2장 이상 올려주세요.)<br />
        <br />
        <b>3. 전문가 집들이</b><br />
        - 전문가 집들이는 사진과 인테리어 설명을 올려서 남들과 다른 자신만의 인테리어를 뽐낼 수 있는 인터넷 집들이입니다.<br />
        - 방, 거실, 화장실, 주방, 평면도 등 본인만의 인테리어의 컨셉 설명글과 사진을 올려주세요.(최소 8장)<br />
        - 구역별로 여러 각도의 사진도 가능합니다. (사진을 2장 이상 올려주세요.)<br />
      </p>
    </div>
  </VueFinalModal>
</template>
<style>

</style>
