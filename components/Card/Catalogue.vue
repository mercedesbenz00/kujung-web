<script lang="ts" setup>
import { Catalog } from '~/ts/interfaces/Catalog';
import { PropType } from 'nuxt/dist/app/compat/capi';
import ModalPdfViewer from '~~/components/ModalPdfViewer.vue';
import { useModal } from 'vue-final-modal';
import ModalImage from "~~/components/ModalImage.vue";
import { Common } from '~/ts/_utils/common';
import { useStore } from '~/stores/common';
const store = useStore()

// props
const props = defineProps({
  item: {
    type: Object as PropType<Catalog>,
    default: {}
  },
});

const onShowPreview = (p_url: string) => {
  if (p_url.includes(".jpg") || p_url.includes(".png")) {
    const m = useModal({
      component: ModalImage,
      attrs: {
        title: '',
        onConfirm() {
          store.setCurModalIndicator(null)
        m.close()
        },
      },
      slots: {
        default: `<img src="${p_url}" class="w-full max-w-[360px] md:max-w-[726px] aspect-[1]" />`,
      },
    })
      store.setCurModalIndicator(m)
  m.open()
    return
  }
  const m = useModal({
    component: ModalPdfViewer,
    attrs: {
      onConfirm() {
        store.setCurModalIndicator(null)
        m.close()
      },
      pdfUrl: p_url
    },
    slots: {
      default: ``,
    },
  })
    store.setCurModalIndicator(m)
  m.open()
}

const onDownload = (p_url: string) => {
  window.open(p_url, '_blank');
}

</script>
<template>
  <section class="w-full flex flex-col">
    <div class="relative">
      <img :src="Common.getThumbnailUrl(item.thumb_url)" class="w-full"
        :class="'w-[130px] md:w-[240px] lg:w-[320px] h-[130px] md:h-[240px] lg:h-[320px] object-cover'" />
    </div>
    <div class="flex flex-col px-[4px] mt-[8px] lg:mt-[18px]">
      <p
        class="text-[11px] md:text-[15px] lg:text-[18px] leading-[15px] md:leading-[20px] lg:leading-[24px] text-center font-bold break-keep">
        {{ item.title }}
      </p>
      <p class="text-[11px] md:text-[15px] leading-[15px] md:leading-[20px] mt-[10px] lg:mt-[3px] text-center break-keep">
        {{ item.summary }}
      </p>
      <div class="flex flex-col md:flex-row mt-[10px] lg:mt-[24px] lg:gap-x-[14px]">
        <button v-if="item.preview_file.length > 0" class="button-4" type="button" data-kt-stepper-action="previous"
          @click="onShowPreview(item.preview_file)">
          보기
        </button>
        <button v-if="item.download_file.length > 0" class="button-5" type="button" data-kt-stepper-action="previous"
          @click="onDownload(item.download_file)">
          다운로드
        </button>
      </div>
    </div>
  </section>
</template>
