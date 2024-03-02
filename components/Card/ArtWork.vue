<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import { Common } from '~/ts/_utils/common';
import { Portfolio } from '~~/ts/interfaces/Portfolio';

// props
const props = defineProps({
  item: {
    type: Object as PropType<Portfolio>,
    default: {}
  },
});

</script>
<template>
  <section class="w-full flex flex-col">
    <div class="relative">
      <img :src="item.portfolioImages[0].image_url" class="cursor-pointer object-cover"
        :class="'w-[120px] md:w-[240px] lg:w-[320px] h-[120px] md:h-[240px] lg:h-[320px]'" />
    </div>
  </section>
</template>
