<script setup lang="ts">
const route = useRoute();
import { useModal } from 'vue-final-modal'
import ModalPortfolioDetail from '~~/components/ModalPortfolioDetail.vue';
import { api } from "~/ts/api";
import { Portfolio } from '~~/ts/interfaces/Portfolio';
import { useStore } from '~/stores/common';
const store = useStore()

// meta
definePageMeta({
    layout: 'page'
});

const type = ref(route.query.type ?? "컨벤션");

const list = ref<Portfolio[]>([])
const loadingEnd = ref<boolean>(true)
const TAKE_COUNT = 9

const descriptions = {
    "컨벤션": {
        mo_desc: "구정마루가 참여했던 행사,\n컨벤션에 대한 포트폴리오입니다.",
        pc_desc: "구정마루가 참여했던 행사, 컨벤션에 대한 포트폴리오입니다.",
        collabo_desc: "구정마루는 행사, 컨벤션을 매년 지속적으로 참여해왔습니다.\n" +
            "소비자에게 항상 먼저 다가가며 구정만의 특별한 가치를 보여줄 수 있도록 노력하겠습니다.\n" +
            "\n" +
            "구정마루와 함께하는 컨벤션, 행사 콜라보를 원하시면\n" +
            "이메일을 통하여 제안 부탁드립니다.\n\n" +
            "제안 이메일 : mkt@kujungmaru.com ",
    },
    "아티스트": {
        mo_desc: "구정마루와 함께 진행한 아티스트 포트폴리오입니다.",
        pc_desc: "구정마루와 함께 진행한 아티스트 포트폴리오입니다.",
        collabo_desc: "구정마루는 다양한 아티스트와 함께 협업하여 콜라보를 진행하고 있습니다.\n" +
            "구정의 가치와 함께 할 수 있는 아티스트 콜라보 제안은 항상 환영합니다.\n\n" +
            "제안 이메일 : mkt@kujungmaru.com ",
    },
    "브랜드": {
        mo_desc: "구정마루와 함께한 브랜드 콜라보 포트폴리오입니다.",
        pc_desc: "구정마루와 함께한 브랜드 콜라보 포트폴리오입니다.",
        collabo_desc: "브랜드와 진행했던 포트폴리오는 구정마루 만의 특별한 가치입니다.\n" +
            "구정은 특별한 가치를 나눌 수 있는 새로운 콜라보레이션을 항상 환영합니다.\n\n\n" +
            "제안 이메일 : mkt@kujungmaru.com ",
    },
}
onMounted(() => {
    useHead({
        titleTemplate: () => `구정마루 - ${type.value}`,
        meta: [
            {
                property: 'og:title',
                content: `구정마루 - ${type.value}`
            }
        ]
    });
    loadPortfolioList(true)
})

watch(() => route.query.type, (newType, oldType) => {
    type.value = newType
    loadPortfolioList(true)
})

const onShowDetail = (p_item: Portfolio) => {
    const m = useModal({
        component: ModalPortfolioDetail,
        attrs: {
            onConfirm() {
                store.setCurModalIndicator(null)
        m.close()
            },
            info: p_item
        },
        slots: {
            default: ``,
        },
    })
      store.setCurModalIndicator(m)
  m.open()
}

const loadPortfolioList = (p_refresh: boolean) => {
    if(p_refresh) {
        list.value = []
        loadingEnd.value = true
    }
    api.post('/homepage/portfolio/list', {
        needAllCount: true,
        sortBy: "created_at",
        order: "DESC",
        page: parseInt(Number((list.value?.length) / TAKE_COUNT).toFixed(0)) + 1,
        take: TAKE_COUNT,
        categoryList: [type.value.toString().replace("컨벤션", "convention").replace("아티스트", "artist").replace("브랜드", "brand")]
    })
        .then(response => {
            list.value = [...list.value, ...response.data.items]
            if (response.data.items.length < TAKE_COUNT) {
                loadingEnd.value = true
            } else {
                loadingEnd.value = false
            }
        })
}

</script>
<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                {{ type }} 포트폴리오
            </p>
            <p
                class="hidden md:block text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                {{ descriptions[type].pc_desc }}
            </p>
            <p
                class="block md:hidden text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                {{ descriptions[type].mo_desc }}
            </p>

            <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px]" />

            <div class="w-full bg-[#FFFEF2] px-[16px] md:px-[32px] py-[34px] mb-[25px] md:mb-[75px] lg:mb-[95px]">
                <p class="text-black text-[11px] md:text-[15px] leading-[15px] md:leading-[20px] whitespace-pre-line">
                    {{ descriptions[type].collabo_desc }}
                </p>
            </div>

            <div
                class="grid grid-cols-3 gap-x-[6px] lg:gap-x-[32px] gap-y-[20px] md:gap-y-[50px] mb-[100px] md:mb-[87px] lg:mb-[110px]">
                <div v-for="item in list" :key="item.id" class="flex justify-center">
                    <CardArtWork :item="item" class="" @click="() => { onShowDetail(item) }" />
                </div>
            </div>
            <button v-if="!loadingEnd" class="mb-[100px] md:mb-[87px] lg:mb-[110px] text-black text-[15px] font-bold border border-black
                    w-[320px] md:w-[420px] h-[54px] md:h-[70px]" @click="loadPortfolioList(false)">
                <i class="las la-plus"></i>&nbsp;
                더 보기
            </button>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>