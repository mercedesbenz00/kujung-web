<script lang="ts" setup>
import { Common } from '~/ts/_utils/common';
import { api } from '~/ts/api';
import { HouseEntity, OnlineHouseStatus, WishEntityType } from '~/ts/constants';
import { House } from '~/ts/interfaces/House';

const emit = defineEmits(['some-event'])
// props
const props = defineProps({
  item: {
    type: Object as PropType<House>,
    default: null
  },
  onClick: {
    type: Function,
    default() {
    }
  }
});

const wish = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/wish`, {
      "type": props.item?.entity_type == HouseEntity.EXPERT ? WishEntityType.ExpertHouse : WishEntityType.OnlineHouse,
      "entity_id": props.item?.id
    })
    props.item!.wished = true
  })
}
const wishCancel = async (e: any) => {
  e.stopPropagation()
  Common.checkLogin(async () => {
    await api.post(`/wish/cancel`, {
      "type": props.item?.entity_type == HouseEntity.EXPERT ? WishEntityType.ExpertHouse : WishEntityType.OnlineHouse,
      "entity_id": props.item?.id
    })
    props.item!.wished = false
  })
}

</script>
<template>
  <section class="max-w-[116px] md:max-w-[240px] lg:max-w-[320px] w-full" @click="() => { onClick() }">
    <div class="relative">
      <img :src="props.item.entity_type == HouseEntity.ONLINE ? item.images?.[0] : item.thumb_url"
        class="w-full h-[100px] md:h-[200px] cursor-pointer object-cover" />
      <div v-if="item.status == OnlineHouseStatus.WAITING" class="construction-ex-status border-black bg-[#FFFEF2]">
        <p class="text-[7px] md:text-[11px] font-bold text-black">
          발행 대기
        </p>
      </div>
      <div v-else-if="item.status == OnlineHouseStatus.REJECTED"
        class="construction-ex-status border-warmGray-900 bg-warmGray-900">
        <p class="text-[7px] md:text-[11px] font-bold text-white">
          발행 반려
        </p>
      </div>
      <div v-else-if="item.status == OnlineHouseStatus.APPROVED"
        class="construction-ex-status border-white bg-secondaryBlue-400">
        <p class="text-[7px] md:text-[11px] font-bold text-white">
          발행 완료
        </p>
      </div>
    </div>
    <section class="mt-[8px] px-[4px]">
      <section class="flex flex-row items-center">
        <p class="text-[black] text-[12px] md:text-[13px] lg:text-[11px] leading-[16px] font-bold">{{ item.title || "온라인 집들이" }}</p>
        <section class="flex-1" />
        <font-awesome-icon v-if="item?.wished" icon="fa-solid fa-bookmark"
          class="text-[10px] md:text-[16px] lg:text-[25px] text-black" @click="wishCancel" />
        <font-awesome-icon v-if="!item?.wished" icon="fa-regular fa-bookmark"
          class="text-[10px] md:text-[16px] lg:text-[25px] text-black" @click="wish" />
      </section>

      <section class="mt-[6px] flex w-full text-left">
        <p class="text-warmGray-800 text-[9px] md:text-[12px] md:leading-[16px]">
          <span v-for="(tag, index) in item.tags" :key="index">
            {{ tag }} <span v-if="index < item.tags?.length! - 1">| </span>
          </span>
        </p>
      </section>
    </section>
  </section>
</template>

<style lang="scss"></style>