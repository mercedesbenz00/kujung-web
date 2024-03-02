<script lang="ts" setup>
import { PointProduct } from '~/ts/interfaces/PointProduct';
import { useModal } from 'vue-final-modal';
import ModalPointMallDetail from '~~/components/ModalPointMallDetail.vue';
import { Common } from '~/ts/_utils/common';
import { useStore } from '~/stores/common';
import SweetAlert from '~/ts/sweet-alert';
const store = useStore()


const emit = defineEmits(['some-event'])
// props
const props = defineProps({
  item: {
    type: Object as PropType<PointProduct>,
    default: {}
  },
  index: {
    type: Number,
    default: 0
  },
});

const onDetail = () => {
  const m = useModal({
    component: ModalPointMallDetail,
    attrs: {
      onConfirm() {
        store.setCurModalIndicator(null)
        m.close()
      },
      item: props.item
    },
    slots: {
      default: ``,
    },
  })
    store.setCurModalIndicator(m)
  m.open()
}

const onUsePoint = () => {
  Common.checkLogin(() => {
    if (store.profileInfo?.point! < props.item?.point!) {
        SweetAlert.openAlert(
            '',
            "포인트가 부족합니다.",
            '<img src="/img/icons/error.svg">');
        return;
    }
    navigateTo(`/service/point-mall-use?id=${props.item.id}`)
  })
}
</script>
<template>
  <section class="max-w-[116px] md:max-w-[240px] lg:max-w-[320px] w-full">
    <div class="relative">
      <img :src="item.thumb_url" @click="() => { onDetail() }"
        class="w-full h-[100px] md:h-[200px] lg:h-[240px] cursor-pointer object-cover" />
      <div v-show="index < 3" class="absolute left-0 top-0 flex">
        <font-awesome-icon icon="fa-solid fa-bookmark" class="text-[20px] md:text-[37px] text-primary-500" />
        <div class="absolute left-0 top-0 bottom-0 w-full flex items-center justify-center">
          <p class="text-white text-[11px] md:text-[15px] font-bold">
            {{ index + 1 }}
          </p>
        </div>
      </div>
    </div>
    <section class="mt-[12px] px-[4px]">
      <p class="text-[11px] leading-[15px] md:text-[18px] md:leading-[24px] text-black font-bold">{{ item.name }}</p>
      <p
        class="mt-[12px] text-[11px] leading-[15px] md:text-[15px] md:leading-[20px] text-black line-clamp-3 md:line-clamp-2">
        {{ item.summary }}</p>
    </section>

    <section
      class="mt-[10px] w-full flex flex-col lg:flex-row gap-y-[10px] lg:gap-y-[0px] lg:items-center lg:justify-between">
      <div class="flex flex-row">
        <div class="relative flex items-center justify-center">
          <img src="/img/bg_point.png" class="w-[16px] md:w-[22px] h-[16px] md:h-[22px]" />
          <p class="absolute text-[11px] leading-[15px] md:text-[13px] md:leading-[18px] text-white font-bold">P</p>
        </div>
        <p
          class="text-[12px] leading-[16px] md:text-[18px] md:leading-[24px] text-primary-500 font-bold ml-[7px] md:ml-[10px] lg:ml-[3px]">
          {{ item.point }}P</p>
      </div>
      <button @click="() => { onUsePoint() }"
        class="text-[11px] leading-[15px] md:text-[13px] md:leading-[18px] text-white font-bold bg-secondaryNavy-600 w-full max-w-[159px] h-[32px]">포인트
        사용하기</button>
    </section>
  </section>
</template>
