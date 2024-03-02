<script setup lang="ts">
const route = useRoute();
import { api } from '~~/ts/api';
import { IEvent } from '~/ts/interfaces/IEvent';
import dayjs from 'dayjs';
import { useModal } from 'vue-final-modal';
import ModalShare from '~/components/ModalShare.vue';
import { useStore } from '~/stores/common';
const store = useStore()
const router = useRouter();

const id = ref(route.query.id)
const info = ref<IEvent>()
const prevEvent = ref<IEvent>()
const nextEvent = ref<IEvent>()

// meta
definePageMeta({
    layout: 'page',
    title: '이벤트'
});

onMounted(() => {
    loadData()
})

watch(() => route.query.id, (newId, oldId) => {
    id.value = newId
    loadData()
})

const loadData = () => {
    api.get(
        `/homepage/event/${id.value}`
    )
        .then(response => {
            if (response.success) {
                info.value = response.data
            }
        })
    api.get(
        `/homepage/event/${id.value}/prev`
    )
        .then(response => {
            if (response.success) {
                prevEvent.value = response.data
            }
        })
    api.get(
        `/homepage/event/${id.value}/next`
    )
        .then(response => {
            if (response.success) {
                nextEvent.value = response.data
            }
        })
}


const onShare = () => {
    const m = useModal({
        component: ModalShare,
        attrs: {
            shareUrl: location.href,
            title: info.value?.title + " 이벤트",
            imageUrl: info.value?.thumb_url!,
            onConfirm() {
                store.setCurModalIndicator(null)
        m.close()
            },
        },
        slots: {
            default: ``,
        },
    })
      store.setCurModalIndicator(m)
  m.open()
}

const onList = () => {
    navigateTo(`/service/event`)
}
</script>

<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                이벤트
            </p>
            <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루에서 진행하는 이벤트를 확인하세요.
            </p>

            <Line class="mt-[30px] md:mt-[74px] lg:mt-[64px]" />

            <section class="flex flex-col w-full mt-[58px] md:mt-[36px] px-[20px] md:px-0">
                <div class="flex flex-col md:flex-row md:justify-between">
                    <p class="text-[22px] md:text-[34px] text-black font-bold">
                        {{ info?.title }}
                    </p>
                    <div class="flex flex-row gap-x-[6px] mt-[10px] md:mt-0">
                        <BtnWithLA class="" laName="fa-solid fa-share-nodes" text="공유하기" :onClick="() => { onShare() }" />
                    </div>
                </div>
                <div class="flex flex-row mt-[15px] md:mt-[25px]">
                    <p class="text-[11px] md:text-[18px] text-black mr-[61px] md:mr-[32px] font-bold">
                        기간
                    </p>
                    <p class="text-[11px] md:text-[15px] text-warmGray-700 flex items-center">
                        {{ dayjs(info?.start_at).format("YYYY/MM/DD") + " ~ " + dayjs(info?.end_at).format("YYYY/MM/DD") }}
                    </p>
                </div>
                <Line class="mt-[40px]" />

                <img :src="info?.thumb_url" class="w-full object-cover mt-[30px] md:mt-[48px]" />
                <div :innerHTML="info?.content" class="mt-[30px] md:mt-[36px] text-[15px] leading-[20px]">
                </div>

                <Line class="mt-[40px]" />
                <section class="w-full">
                    <div v-if="prevEvent"
                        class="flex flex-row w-full h-[55px] md:h-[60px] justify-center items-center px-[10px] cursor-pointer"
                        @click="navigateTo(`/service/event-detail?id=${prevEvent.id}`)">
                        <p class="text-[11px] md:text-[18px] text-black mr-[20px] md:mr-[80px] font-bold">
                            이전글
                        </p>
                        <p class="text-[11px] md:text-[15px] text-warmGray-700 flex-1">
                            {{ prevEvent.title }}
                        </p>
                        <p class="hidden md:flex text-[11px] md:text-[15px] text-warmGray-700 ml-[20px]">
                            {{ dayjs(prevEvent?.start_at).format("YYYY/MM/DD") + " ~ " +
                                dayjs(prevEvent?.end_at).format("YYYY/MM/DD") }}
                        </p>
                    </div>
                    <Line class="" />
                    <div v-if="nextEvent"
                        class="flex flex-row w-full h-[55px] md:h-[60px] justify-center items-center px-[10px] cursor-pointer"
                        @click="navigateTo(`/service/event-detail?id=${nextEvent.id}`)">
                        <p class="text-[11px] md:text-[18px] text-black mr-[20px] md:mr-[80px] font-bold">
                            다음글
                        </p>
                        <p class="text-[11px] md:text-[15px] text-warmGray-700 flex-1">
                            {{ nextEvent.title }}
                        </p>
                        <p class="hidden md:flex text-[11px] md:text-[15px] text-warmGray-700 ml-[20px]">
                            {{ dayjs(nextEvent?.start_at).format("YYYY/MM/DD") + " ~ " +
                                dayjs(nextEvent?.end_at).format("YYYY/MM/DD") }}
                        </p>
                    </div>
                </section>
                <Line class="" />

                <button
                    class="bg-primary-600 w-full h-[70px] md:w-[420px] text-white text-[15px] font-bold self-center mt-[110px] mb-[110px] lg:mb-[120px]"
                    @click="onList">목록</button>
            </section>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>