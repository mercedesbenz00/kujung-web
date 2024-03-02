<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import { ManagementLaw } from '~/ts/interfaces/ManagementLaw';
import { useModal } from 'vue-final-modal';
import ModalYoutube from '~~/components/ModalYoutube.vue';
import { useStore } from '~/stores/common';
const store = useStore()

const emit = defineEmits(['some-event'])
// props
const props = defineProps({
  item: {
    type: Object as PropType<ManagementLaw>,
    default: {}
  },
  index: {
    type: Number,
    default: 0
  },
});


const onDetail = (p_url: string) => {
  const m = useModal({
    component: ModalYoutube,
    attrs: {
      onConfirm() {
        store.setCurModalIndicator(null)
        m.close()
      },
      videoUrl: p_url
    },
    slots: {
      default: ``,
    },
  })
    store.setCurModalIndicator(m)
  m.open()
}


</script>
<template>
  <section class="max-w-[116px] md:max-w-[240px] lg:max-w-[320px] w-full" @click="() => { onDetail(item.video_url) }">
    <div class="relative">
      <img :src="item.thumb_url" class="w-full h-[100px] md:h-[200px] lg:h-[240px] cursor-pointer object-cover" />
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
      <p class="text-[11px] leading-[15px] md:text-[18px] md:leading-[24px] text-black font-bold">{{ item.title }}</p>
      <p
        class="mt-[12px] text-[11px] leading-[15px] md:text-[15px] md:leading-[20px] text-black line-clamp-3 md:line-clamp-2">
        {{ item.summary }}</p>
    </section>
  </section>
</template>
