<script setup lang="ts">
import { api } from '~/ts/api';
import { Catalog } from '~/ts/interfaces/Catalog';

const route = useRoute();

// meta
definePageMeta({
    layout: 'page'
});

const type = ref(route.query.type ?? "카탈로그");

const list = ref<Catalog[]>([])
const loadingEnd = ref<boolean>(true)
const TAKE_COUNT = 9

const descriptions = {
    "카탈로그": {
        mo_desc: "구정마루 브랜드 제품의 카탈로그 및\n종합 카탈로그를 확인하실 수 있습니다.",
        pc_desc: "구정마루 브랜드 제품의 카탈로그 및 종합 카탈로그를 확인하실 수 있습니다."
    },
    "샘플북": {
        mo_desc: "브랜드 제품별의 샘플북을 e북으로 확인하실 수 있습니다.",
        pc_desc: "브랜드 제품별의 샘플북을 e북으로 확인하실 수 있습니다."
    },
    "룩북": {
        mo_desc: "구정마루가 보여주는 인테리어 트렌드 모음집\nBest 인테리어 디자이너들이 시공한 상상속의 집을 직접 확인해보세요!",
        pc_desc: "구정마루가 보여주는 인테리어 트렌드 모음집\nBest 인테리어 디자이너들이 시공한 상상속의 집을 직접 확인해보세요!"
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
    loadList(true)
})

watch(() => route.query.type, (newType, oldType) => {
    type.value = newType
    loadList(true)
})

const loadList = (p_refresh: boolean) => {
    if (p_refresh) {
        list.value = []
        loadingEnd.value = true
    }
    api.post('/homepage/catalog/list', {
        needAllCount: true,
        page: parseInt(Number((list.value?.length) / TAKE_COUNT).toFixed(0)) + 1,
        take: TAKE_COUNT,
        categoryList: [type.value.toString().replace("카탈로그", "catalog").replace("샘플북", "sample").replace("룩북", "look")]
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
                {{ type }}
            </p>
            <p
                class="hidden md:block text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                {{ descriptions[type].pc_desc }}
            </p>
            <p
                class="block md:hidden text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                {{ descriptions[type].mo_desc }}
            </p>

            <Line class="mt-[30px] md:mt-[40px] lg:mt-[60px] mb-[50px] md:mb-[94px] lg:mb-[64px]" />

            <div
                class="grid grid-cols-3 gap-x-[6px] lg:gap-x-[32px] gap-y-[50px] md:gap-y-[40px] lg:gap-y-[56px] mb-[100px] md:mb-[87px] lg:mb-[110px]">
                <div v-for="slide in list" :key="slide.id" class="flex justify-center">
                    <CardCatalogue :item="slide" />
                </div>
            </div>

            <button v-if="!loadingEnd"
                class="mb-[100px] md:mb-[87px] lg:mb-[110px] text-black text-[15px] font-bold border border-black w-[320px] md:w-[420px] h-[54px] md:h-[70px]"
                @click="loadList(false)">
                <i class="las la-plus"></i>&nbsp;
                더 보기
            </button>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>