<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import { Common } from '~/ts/_utils/common';
import { api } from '~/ts/api';
import { HouseEntity, LikeEntityType, WishEntityType } from '~/ts/constants';
import { House } from '~/ts/interfaces/House';

const emit = defineEmits(['some-event'])
// props
const props = defineProps({
  item: {
    type: Object as PropType<House>,
    default: null
  },
  isSimpleMode: { // 랜덤 집들이 모드 일때는 간략정보 표시
    type: Boolean,
    default: false
  },
  index: {
    type: Number,
    default: 0
  },
  onClick: {
    type: Function,
    default() {
    }
  }
});

const like = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/like`, {
      "type": props.item.entity_type == HouseEntity.ONLINE ? LikeEntityType.OnlineHouse : LikeEntityType.ExpertHouse,
      "entity_id": props.item.id
    })
    props.item.liked = true
  })
}
const likeCancel = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/like/cancel`, {
      "type": props.item.entity_type == HouseEntity.ONLINE ? LikeEntityType.OnlineHouse : LikeEntityType.ExpertHouse,
      "entity_id": props.item.id
    })
    props.item.liked = false
  })
}

const wish = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/wish`, {
      "type": props.item.entity_type == HouseEntity.ONLINE ? WishEntityType.OnlineHouse : WishEntityType.ExpertHouse,
      "entity_id": props.item.id
    })
    props.item.wished = true
  })
}
const wishCancel = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/wish/cancel`, {
      "type": props.item.entity_type == HouseEntity.ONLINE ? WishEntityType.OnlineHouse : WishEntityType.ExpertHouse,
      "entity_id": props.item.id
    })
    props.item.wished = false
  })
}

</script>
<template>
  <section class="max-w-[116px] md:max-w-[240px] lg:max-w-[320px] w-full" @click="() => { onClick() }">
    <img :src="props.item.entity_type == HouseEntity.ONLINE ? item.images?.[0] : item.thumb_url"
      class="w-full h-[100px] md:h-[200px] lg:h-[240px] cursor-pointer object-cover" />
    <section class="mt-[8px] px-[4px]">
      <section v-if="!isSimpleMode" class="flex flex-row items-center">
        <div class="hidden lg:flex flex-row">
          <p class="text-warmGray-600 text-[11px] leading-[15px]">{{ item?.category_level1?.name }}</p>
          <img src="/img/chevron_right.svg" width="14" height="14" class="mx-[4px]" />
          <p class="text-warmGray-600 text-[11px] leading-[15px]">{{ item.category_level2?.name }}</p>
          <img src="/img/chevron_right.svg" width="14" height="14" class="mx-[4px]" />
        </div>
        <p class="text-[1A1A1A] text-[8px] md:text-[12px] lg:text-[11px] leading-[15px] font-bold">{{ item.product_name
        }}
        </p>
        <section class="flex-1" />
        <font-awesome-icon v-if="item.wished" icon="fa-solid fa-bookmark"
          class="text-[10px] md:text-[16px] lg:text-[25px] text-black cursor-pointer" @click="wishCancel" />
        <font-awesome-icon v-if="!item.wished" icon="fa-regular fa-bookmark"
          class="text-[10px] md:text-[16px] lg:text-[25px] text-black cursor-pointer" @click="wish" />
      </section>

      <section v-if="item.entity_type == HouseEntity.EXPERT && !isSimpleMode"
        class="mt-[6px] py-[0px] md:py-[4px] lg:py-[8px]">
        <p class="text-black text-[11px] lg:text-[15px] leading-[15px] lg:leading-[20px] font-bold">{{ item.title }}</p>
      </section>

      <section v-if="!isSimpleMode" class="flex flex-row items-center mt-[6px]">
        <img
          :src="Common.isValid(item.requester_photo) ? item.requester_photo : (item.entity_type == HouseEntity.ONLINE ? '/img/default_profile.svg' : '/img/default_profile_blue.svg')"
          class="cursor-pointer w-[18px] md:w-[23px] rounded-[8px] object-cover aspect-[1]" />
        <p class="ml-[10px] text-black text-[12px] md:text-[15px] leading-[20px] font-bold">{{ item.requester_company_name
          || item.requester_nick_name }}</p>
      </section>

      <section v-if="!isSimpleMode" class="mt-[6px] md:mt-[8px] py-[4px] flex w-full text-left">
        <p class="text-warmGray-800 text-[9px] md:text-[12px] md:leading-[16px] line-clamp-2">
          <span v-for="(tag, index) in item.tags" :key="index" class="cursor-pointer" @click="navigateTo(`/search?keyword=${tag}`)">
            {{ tag }} <span v-if="index < item.tags?.length! - 1">| </span>
          </span>
        </p>
      </section>
    </section>
  </section>
</template>
