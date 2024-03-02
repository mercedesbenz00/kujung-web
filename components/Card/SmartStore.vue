<script lang="ts" setup>
import { Common } from '~/ts/_utils/common';
import { api } from '~/ts/api';
import { SmartStore } from '~/ts/interfaces/SmartStore';
import { LikeEntityType, WishEntityType } from '~~/ts/constants';

// props
const props = defineProps({
  item: {
    type: Object as PropType<SmartStore>,
    default: {}
  },
  products: {
    type: Array<{ id: Number, imgUrl: string }>,
    default() {
      return {}
    }
  },
  index: {
    type: Number,
    default: 0
  },
  isRecommend: {
    type: Boolean,
    default: false
  },
  onHeartClick: {
    type: Function,
    default() {
    }
  }
});

const like = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/like`, {
      "type": LikeEntityType.SmartStore,
      "entity_id": props.item.id
    })
    props.item.liked = true
  })
}

const likeCancel = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/like/cancel`, {
      "type": LikeEntityType.SmartStore,
      "entity_id": props.item.id
    })
    props.item.liked = false
  })
}

const wish = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/wish`, {
      "type": WishEntityType.SmartStore,
      "entity_id": props.item?.id
    })
    props.item!.wished = true
  })
}
const wishCancel = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/wish/cancel`, {
      "type": WishEntityType.SmartStore,
      "entity_id": props.item?.id
    })
    props.item!.wished = false
  })
}


</script>
<template>
  <section :class="'max-w-[116px] md:max-w-[232px] lg:max-w-[320px] w-full self-start'">
    <div class="relative">
      <img :src="item.thumb_url" class="w-full cursor-pointer object-cover"
        :class="'h-[100px] md:h-[200px] lg:h-[240px]'" />
      <font-awesome-icon v-if="item?.wished" icon="fa-solid fa-bookmark"
        class="absolute top-[5px] right-[5px] text-[16px] lg:text-[25px] cursor-pointer" @click="wishCancel" />
      <font-awesome-icon v-if="!item?.wished" icon="fa-regular fa-bookmark"
        class="absolute top-[5px] right-[5px] text-[16px] lg:text-[25px] cursor-pointer" @click="wish" />
    </div>
    <section class="mt-[10px] lg:mt-[25px]">
      <section class="flex flex-row items-center">
        <span class="text-black text-[8px] md:text-[11px] lg:text-[15px] text-left">{{ item.desc }}</span>
      </section>

      <section class="flex w-full text-left">
        <span class="text-black text-[13px] md:text-[18px] font-bold">{{ item.name }}</span>
      </section>
    </section>
  </section>
</template>
