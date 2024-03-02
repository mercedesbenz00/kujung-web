<script lang="ts" setup>
import dayjs from 'dayjs';
import { PropType } from 'nuxt/dist/app/compat/capi';
import { Common } from '~/ts/_utils/common';
import { IEvent } from '~/ts/interfaces/IEvent';

const emit = defineEmits(['some-event'])
// props
const props = defineProps({
  item: {
    type: Object as PropType<IEvent>,
    default: {}
  },
  index: {
    type: Number,
    default: 0
  },
});

</script>
<template>
  <section class="max-w-[116px] md:max-w-[240px] lg:max-w-[320px] w-full">
    <div class="relative">
      <img :src="Common.getThumbnailUrl(item.thumb_url)"
        class="w-full h-[100px] md:h-[200px] lg:h-[240px] cursor-pointer object-cover" />
      <div v-show="dayjs(item.end_at).diff(dayjs()) < 0"
        class="absolute left-0 top-0 right-0 bottom-0 bg-black opacity-[0.6] items-center justify-center flex">
        <p class="text-[15px] leading-[20px] md:text-[22px] md:leading-[30px] text-white font-bold">
          종료
        </p>
      </div>
    </div>
    <section class="mt-[12px] px-[4px]">
      <p class="text-[11px] leading-[15px] md:text-[18px] md:leading-[24px] text-black font-bold">{{ item.title }}</p>
      <!-- <p
        class="mt-[12px] text-[11px] leading-[15px] md:text-[15px] md:leading-[20px] text-black line-clamp-3 md:line-clamp-2">
        {{ item. }}</p> -->
    </section>
  </section>
</template>
