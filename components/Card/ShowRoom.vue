<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import { AgencyStore } from '~~/ts/interfaces/AgencyStore';

// props
const props = defineProps({
  item: {
    type: Object as PropType<AgencyStore>,
    default: {}
  },
});

</script>
<template>
  <section class="w-full flex flex-col mb-[15px] lg:mb-[50px] cursor-pointer">
    <div class="flex flex-row px-[16px] items-center">
      <img :src="item.image_url" class="w-[70px] lg:w-[100px] h-[70px] lg:h-[100px]  object-cover" />
      <div class="flex flex-col ml-[20px] lg:ml-[42px]">
        <div class="flex flex-row items-center">
          <p class="text-[18px] lg:text-[22px] leading-[24px] lg:leading-[30px] font-bold">
            {{ item.name }}
          </p>
          <img v-if="item.is_gold" :src="'/img/icons/ic_badge_best.png'" alt="Best badge"
            class="w-[40px] aspect-[1] ml-[5px]" />
        </div>
        <p class="text-[12px] lg:text-[13px] leading-[16px] lg:leading-[18px] mt-[4px]">
          A : {{ item.addr }}
        </p>
        <p class="text-[12px] lg:text-[13px] leading-[16px] lg:leading-[18px] mt-[6px]">
          T : {{ item.phone.replace(/( )/g, "-") }}
        </p>
        <p class="text-[12px] lg:text-[13px] leading-[16px] lg:leading-[18px] mt-[6px]">
          {{ item.feature }}
        </p>
      </div>
    </div>
    <Line class="mt-[27px] lg:mt-[60px]" />
  </section>
</template>
