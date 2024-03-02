<script lang="ts" setup>
import { Common } from '~/ts/_utils/common';
import { api } from '~/ts/api';
import { HouseEntity, LikeEntityType, WishEntityType } from '~/ts/constants';
import { OnlineHouse } from '~/ts/interfaces/OnlineHouse';


const emit = defineEmits(['some-event'])
// props
const props = defineProps({
  item: {
    type: Object as PropType<OnlineHouse>,
    default: null
  }
});


const like = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/like`, {
      "type": LikeEntityType.OnlineHouse,
      "entity_id": props.item.id
    })
    props.item.liked = true
  })
}

const likeCancel = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/like/cancel`, {
      "type": LikeEntityType.OnlineHouse,
      "entity_id": props.item.id
    })
    props.item.liked = false
  })
}

const wish = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/wish`, {
      "type": WishEntityType.OnlineHouse,
      "entity_id": props.item.id
    })
    props.item.wished = true
  })
}
const wishCancel = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/wish/cancel`, {
      "type": WishEntityType.OnlineHouse,
      "entity_id": props.item.id
    })
    props.item.wished = false
  })
}


</script>
<template>
  <section class="max-w-[116px] md:max-w-[320px] lg:max-w-[320px] w-full"
    @click="() => { navigateTo(`/construction-ex/detail?id=${item.id}&isExpertType=${false}`) }">
    <img :src="item.onlineHouseImages[0].image_url" class="h-[100px] md:h-[240px] w-full cursor-pointer object-cover" />
    <section class="mt-[8px] px-[4px]">
      <section class="flex flex-row items-center">
        <span class="text-warmGray-600 text-[11px] leading-[15px]">{{ item.product?.category_level1?.name }}</span>
        <img src="/img/chevron_right.svg" width="14" height="14" class="mx-[4px]" />
        <span class="text-warmGray-600 text-[11px] leading-[15px]">{{ item.product?.category_level2?.name }}</span>
        <img v-if="item.product?.category_level3" src="/img/chevron_right.svg" width="14" height="14" class="mx-[4px]" />
        <span class="text-[1A1A1A] text-[11px] leading-[15px] font-bold">{{ item.product?.category_level3?.name }}</span>
        <section class="flex-1" />
        <font-awesome-icon v-if="item.wished" icon="fa-solid fa-bookmark"
          class="text-[10px] md:text-[16px] lg:text-[25px] text-black cursor-pointer" @click="wishCancel" />
        <font-awesome-icon v-if="!item.wished" icon="fa-regular fa-bookmark"
          class="text-[10px] md:text-[16px] lg:text-[25px] text-black cursor-pointer" @click="wish" />
      </section>

      <section class="flex flex-row items-center mt-[4px]">
        <img src="/img/default_profile.svg" width="23" height="25" class="cursor-pointer" />
        <span class="ml-[10px] text-black text-[15px] leading-[20px] font-bold">{{ item.requester.company_name ||  item.requester.nickname}}</span>
      </section>

      <section class="mt-[8px] py-[4px] flex w-full text-left">
        <p class="text-warmGray-800 text-[9px] md:text-[12px] md:leading-[16px]">
          <span v-for="(tag, index) in item.tags" :key="index">
            {{ tag.name }} <span v-if="index < item.tags?.length! - 1">| </span>
          </span>
        </p>
      </section>
    </section>
  </section>
</template>
