<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import { Notification } from '~/ts/interfaces/Notification';
import { useModal } from 'vue-final-modal';
import ModalNoticeDetail from '~~/components/ModalNoticeDetail.vue';
import { Common } from '~/ts/_utils/common';
import { useStore } from '~/stores/common';
const store = useStore()

const emit = defineEmits(['some-event'])
// props
const props = defineProps({
  item: {
    type: Object as PropType<Notification>,
    default: {}
  },
});

const onDetail = () => {
  const m = useModal({
    component: ModalNoticeDetail,
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


</script>
<template>
  <section class="max-w-[116px] md:max-w-[240px] lg:max-w-[320px] w-full" @click="() => { onDetail() }">
    <img :src="Common.getThumbnailUrl(item.thumb_url)"
      class="w-full h-[100px] md:h-[200px] lg:h-[240px] cursor-pointer object-cover" />
  </section>
</template>
