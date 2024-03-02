<script setup lang="ts">
const route = useRoute();

import { useModal } from 'vue-final-modal';
import { useStore } from '~/stores/common';
import { Common } from '~/ts/_utils/common';
import { House } from '~/ts/interfaces/House';
import { Product } from '~/ts/interfaces/Product';
import { User } from '~/ts/interfaces/User';
import ModalConstructionExType from '~~/components/ModalConstructionExType.vue';
import ModalShare from '~~/components/ModalShare.vue';
import { api } from '~~/ts/api';
import { HouseEntity, OnlineHouseStatus, SCREEN_WIDTH, SESSION_PARAMS, WishEntityType } from '~~/ts/constants';

const store = useStore();

// meta
definePageMeta({
    layout: 'page',
    title: '제품 상세 보기'
});

const id = ref(route.query.id)
const info = ref<Product>()
const onlineHouseList = ref<House[]>([])
const expertHouseList = ref<House[]>([])
const favorProductList = ref<Product[]>([])
const otherProductList = ref<Product[]>([])

const selectedImgIdx = ref(0)

onMounted(() => {
    loadAllInfo()
})

watch(() => route.query.id, (newId, oldId) => {
    id.value = newId
    loadAllInfo()
    info.value = null
    document.querySelector("#container")?.scrollIntoView()
})

const descriptionList = ref([
])

const loadAllInfo = () => {
    loadInfo()
    loadOnlineHouseList()
    loadExpertHouseList()
    loadFavorProductList()

}

const { open, close } = useModal({
    component: ModalConstructionExType,
    attrs: {
        onSelect: (p_type: number) => {
            navigateTo(`/construction-ex/write?type=${p_type}`)
            close()
        },
        onConfirm() {
            close()
        },
    },
    slots: {
        default: ``,
    },
})

const onWriteHouseWarming = () => {
    Common.checkLogin(() => {
        open()
    })
}

const onShare = () => {
    const m = useModal({
        component: ModalShare,
        attrs: {
            shareUrl: location.href,
            title: info.value?.title!,
            imageUrl: info.value?.thumbnail_url!,
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

const onAddWish = () => {
    if (info.value?.wished) {
        Common.checkLogin(async () => {
            await api.post(`/wish/cancel`, {
                "type": WishEntityType.Product,
                "entity_id": info.value?.id
            })
            info.value = { ...info.value, wished: false }
        })
    } else {
        Common.checkLogin(async () => {
            await api.post(`/wish`, {
                "type": WishEntityType.Product,
                "entity_id": info.value?.id
            })
            info.value = { ...info.value, wished: true }
            Common.showSuccessToast("위시리트스에 저장되었습니다.")
        })
    }
}

const loadInfo = () => {
    api.get(
        `/product/${id.value}`
    )
        .then(response => {
            if (response.success) {
                info.value = response.data
                loadOtherBrandList(info.value)
                descriptionList.value = []

                descriptionList.value.push({ "title": "종류", desc: info.value?.category_level1?.name! })
                descriptionList.value.push({ "title": "시공법", desc: info.value?.construction_law! })
                descriptionList.value.push({ "title": "규격", desc: `${info.value?.size_w}(W) X ${info.value?.size_l}(L) X ${info.value?.size_t}(T)mm` })
                descriptionList.value.push({ "title": "제품설명", desc: info.value?.desc! })
                descriptionList.value.push({ "title": "컬러별", desc: info.value?.color_info?.name })
                // descriptionList.value.push({ "title": "주거면적", desc: info.value?.area_space_info?.name })
                // descriptionList.value.push({ "title": "주거공간", desc: info.value?.house_type_info?.name })
                // descriptionList.value.push({ "title": "주거형태", desc: info.value?.family_type_info?.name })
                descriptionList.value.push({ "title": "스타일별", desc: info.value?.house_style_info?.name })
                var tagStr = ""
                info.value?.tags?.map((it, idx) => {
                    if (idx == 0) {
                        tagStr = it.name
                    } else {
                        tagStr = tagStr + " | " + it.name
                    }
                })
                descriptionList.value.push({ "title": "태그별", desc: tagStr })
            }
        })
}

const loadOnlineHouseList = () => {
    api.post('/expert-house/house-list', {
        product_id: Number(id.value),
        random: true,
        entity_type_list: [HouseEntity.ONLINE],
        status_list: [OnlineHouseStatus.APPROVED]
    })
        .then(response => {
            if (response.success) {
                onlineHouseList.value = response.data.items
            }
        })
}

const loadExpertHouseList = () => {
    api.post('/expert-house/house-list', {
        product_id: Number(id.value),
        random: true,
        entity_type_list: [HouseEntity.EXPERT],
        status_list: [OnlineHouseStatus.APPROVED]
    })
        .then(response => {
            if (response.success) {
                expertHouseList.value = response.data.items
            }
        })
}

const loadFavorProductList = () => {
    const tmpInfo = sessionStorage.getItem(SESSION_PARAMS.PROFILE_INFO)
    if (!tmpInfo) {
        return;
    }
    const profileInfo: User = JSON.parse(tmpInfo)
    const houseStyleArr: Number[] = []
    profileInfo?.profile.house_styles?.map(it => {
        if (it?.id) {
            houseStyleArr.push(it?.id)
        }
    })

    api.post('/product/list', {
        take: 4,
        area_space_list: profileInfo?.profile.area_space_info?.id ? [profileInfo?.profile.area_space_info?.id] : [],
        color_list: profileInfo?.profile.color_info?.id ? [profileInfo?.profile.color_info?.id] : [],
        style_list: houseStyleArr,
        family_type_list: profileInfo?.profile.family_type_info?.id ? [profileInfo?.profile.family_type_info?.id] : [],
        exclude_product_id: Number(id.value)
    })
        .then(response => {
            favorProductList.value = response.data.items
        })
}

const loadOtherBrandList = (p_product: Product) => {
    api.post('/product/list', {
        take: 4,
        category_level1_id: p_product?.category_level1?.id,
        category_level2_id: p_product?.category_level2?.id,
        exclude_product_id: p_product?.id
    })
        .then(response => {
            otherProductList.value = response.data.items
        })
}

const onDetailView = () => {
    document.querySelector("#detailView")?.scrollIntoView()
}

const onOnlineHouseView = () => {
    document.querySelector("#onlineHouseView")?.scrollIntoView()
}

const onExpertHouseView = () => {
    document.querySelector("#expertHouseView")?.scrollIntoView()
}

const onBlogView = () => {
    document.querySelector("#blogView")?.scrollIntoView()
}

const onSimilarView = () => {
    document.querySelector("#similarView")?.scrollIntoView()
}

const onOthersView = () => {
    document.querySelector("#othersView")?.scrollIntoView()
}

</script>

<template>
    <PageContainer>
        <div v-if="info" class="max-w-[768px] lg:max-w-[1024px] w-full self-center" id="container">
            <!-- 상단 제품 기본정보(PC) -->
            <div class="hidden lg:block">
                <div class="flex flex-col w-full mt-[110px]">
                    <div class="flex flex-row items-center">
                        <p class="text-[11px] text-warmGray-600 leading-[15px]">{{ info?.category_level1?.name }}</p>
                        <i class="la la-angle-right text-[11px] text-warmGray-600 leading-[15px] mx-[8px]"></i>
                        <p class="text-[11px] text-[#1A1A1A] leading-[15px] font-bold">{{ info?.category_level2?.name }}</p>
                    </div>
                    <div class="flex flex-row items-center mt-[15px]">
                        <p class="text-[34px] text-black font-bold">{{ info?.title }}</p>
                        <div class="flex-1" />
                        <BtnWithLA class="ml-[5px]" laName="las la-edit" text="집들이 글쓰기"
                            :onClick="() => { onWriteHouseWarming() }" />
                        <BtnWithLA class="ml-[5px]" laName="fa-solid fa-share-nodes" text="공유하기"
                            :onClick="() => { onShare() }" />
                        <BtnWithLA class="ml-[5px]"
                            :laName="info.wished ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'" text="관심상품"
                            :onClick="() => { onAddWish() }" />
                    </div>
                </div>

                <div class="flex flex-row mt-[8px]">
                    <div class="flex flex-col w-[500px]">
                        <img :src="info?.productImages[selectedImgIdx].image_url"
                            @click="() => { Common.onShowPreview(info?.productImages[selectedImgIdx].image_url) }"
                            class="w-full h-[300px] md:h-[400px] lg:h-[500px] cursor-pointer object-cover" />
                        <div class="self-center">
                            <el-scrollbar always class="mt-[8px]">
                                <div class="flex items-center">
                                    <div v-for="(item, index) in info?.productImages" @click="selectedImgIdx = index"
                                        class="shrink-0 mr-[6px] border-primary-400"
                                        :class="index == selectedImgIdx ? 'border-[2px]' : ''">
                                        <img :src="item.image_url" class="w-[120px] h-[80px] cursor-pointer object-cover" />
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </div>

                    <div class="ml-[24px] flex-1 flex-col">
                        <Line />
                        <div class="h-[500px] grid gap-y-[100% / 8] pt-[20px]">
                            <div v-for="info in descriptionList">
                                <div class="flex flex-row px-[8px]">
                                    <p class="text-[18px] font-bold text-black w-[150px]">
                                        {{ info.title }}
                                    </p>
                                    <p class="text-[18px] text-black flex-1">
                                        {{ info.desc }}
                                    </p>
                                </div>
                                <Line v-if="info.title == '제품설명'" class="mt-[10px]" />
                            </div>
                        </div>

                        <!-- <button
                            class="w-full h-[70px] bg-primary-600 text-white text-[15px] font-bold flex flex-row items-center justify-center mt-[9px]">
                            비교함 담기 &nbsp;
                            <i class="las la-plus-circle text-[20px]"></i>
                        </button> -->
                    </div>
                </div>
            </div>

            <div class="px-[8px] md:px-[20px] lg:px-[0px]">

                <!-- 상단 제품 기본정보(모바일, 태블릿) -->
                <div class="flex flex-col lg:hidden pt-[20px] md:pt-[50px] pb-[40px]">
                    <p class="text-[22px] md:text-[34px] leading-[30px] md:leading-[40px] font-bold text-center">
                        제품상세보기
                    </p>
                    <Line class="mt-[30px] md:mt-[50px] mb-[60px] mt:mb-[50px]" />
                    <div class="flex flex-col">
                        <img :src="info?.productImages[selectedImgIdx].image_url"
                            class="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover" />
                        <div class="self-center">
                            <el-scrollbar always class="mt-[26px] md:mt-[30px]">
                                <div class="flex">
                                    <div v-for="(item, index) in info?.productImages" @click="selectedImgIdx = index"
                                        class="shrink-0 mx-[3px] border-primary-400"
                                        :class="index == selectedImgIdx ? 'border-[2px]' : ''">
                                        <img :src="item.image_url"
                                            class="w-[80px] md:w-[120px] cursor-pointer object-cover h-[80px]" />
                                    </div>
                                </div>

                            </el-scrollbar>
                        </div>
                    </div>

                    <div class="flex flex-row items-end mt-[70px] relative pb-[90px] md:pb-0">
                        <div class="absolute md:sticky top-[70px]">
                            <div class="flex flex-row items-center">
                                <p class="text-[11px] text-warmGray-600 leading-[15px]">{{ info?.category_level1?.name }}
                                </p>
                                <i class="la la-angle-right text-[11px] text-warmGray-600 leading-[15px] mx-[8px]"></i>
                                <p class="text-[11px] text-[#1A1A1A] leading-[15px] font-bold">
                                    {{ info?.category_level2?.name }}</p>
                            </div>
                            <p
                                class="mt-[15px] md:mt-[10px] text-[22px] md:text-[34px] leading-[30px] md:leading-[40px] text-black font-bold">
                                {{ info?.title }}</p>
                        </div>
                        <div class="flex-1" />
                        <BtnWithLA class="ml-[5px]" laName="las la-edit" text="집들이 글쓰기"
                            :onClick="() => { onWriteHouseWarming() }" />
                        <BtnWithLA class="ml-[5px]" laName="las la-share-alt-square" text="공유하기"
                            :onClick="() => { onShare() }" />
                        <BtnWithLA class="ml-[5px]" laName="las la-bookmark" text="관심상품" :onClick="() => { onAddWish() }" />
                    </div>

                    <div class="flex flex-1 flex-col mt-[20px]">
                        <Line />
                        <div class="grid">
                            <div v-for="info in descriptionList">
                                <div class="flex flex-row px-[8px] mt-[10px]">
                                    <p class="text-[18px] font-bold text-black w-[150px]">
                                        {{ info.title }}
                                    </p>
                                    <p class="text-[18px] text-black flex-1">
                                        {{ info.desc }}
                                    </p>
                                </div>
                                <Line class="mt-[10px]" />
                            </div>
                        </div>

                        <!-- <button
                            class="w-full h-[70px] bg-primary-600 text-white text-[15px] font-bold flex flex-row items-center justify-center mt-[80px] max-w-[500px] self-center">
                            비교함 담기 &nbsp;
                            <i class="las la-plus-circle text-[20px]"></i>
                        </button> -->
                    </div>
                </div>

                <div class="mt-[40px] lg:mt-[70px] w-full grid grid-cols-2 md:grid-cols-3">
                    <BtnProductDetail text="상세정보" :onClick="() => { onDetailView() }" />
                    <BtnProductDetail v-if="onlineHouseList.length > 0" text="랜선 집들이"
                        :onClick="() => { onOnlineHouseView() }" />
                    <BtnProductDetail v-if="expertHouseList.length > 0" text="전문가 집들이"
                        :onClick="() => { onExpertHouseView() }" />
                    <BtnProductDetail text="블로그" :onClick="() => { onBlogView() }" />
                    <BtnProductDetail v-if="info.similarProducts && info.similarProducts.length > 0" text="비슷한 디자인 제품보기"
                        :onClick="() => { onSimilarView() }" />
                    <BtnProductDetail v-if="otherProductList.length > 0" text="다른 수종보기"
                        :onClick="() => { onOthersView() }" />
                </div>

                <div class="mt-[66px] md:mt-[40px] lg:mt-[50px] " id="detailView">
                    <p class="text-[18px] md:text-[24px] font-bold text-black">
                        상세정보
                    </p>

                    <Line class="mt-[10px]" />
                    <p
                        class="my-[14px] text-[12px] md:text-[15px] leading:[16px] md:leading-[20px] text-black text-center break-keep px-[10px] whitespace-pre-line">
                        구정마루에서 판매되고 있는 모든 상품의 사진 이미지 및 {{ SCREEN_WIDTH
                            < 768 ? "\n" : "" }}제작 자료에 대한 저작권은 자사에 있으며<br />
                        이에 대한 무단도용,복제 및 사용은 {{ SCREEN_WIDTH
                            < 768 ? "\n" : "" }}저작권법에 의거 금지되어 있습니다. <br />
                        <span class="text-secondaryBlue-500 font-bold">
                            ※ 제품 소개 이미지는 모니터에 따라 {{ SCREEN_WIDTH < 768 ? "\n" : "" }}실제 색상과 차이가 있을 수 있습니다. </span>
                    </p>

                    <Line class="mb-[20px] md:mb-[50px]" />

                    <div :innerHTML="info?.detail_info" class="w-full">
                    </div>
                    <div v-if="info?.productYoutube" class="relative">
                        <iframe :src="Common.getYoutubeUrl(Common.getYoutubeIdFromURL(info?.productYoutube?.url))"
                            class="w-full h-[320px] md:h-[680px] mt-[5px] md:mt-[30px] lg:mt-[73px]"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen />
                    </div>
                </div>

                <div v-if="onlineHouseList.length > 0" class="mt-[75px] md:mt-[110px] lg:mt-[75px]" id="onlineHouseView">
                    <p class="text-[18px] md:text-[24px] text-black font-bold flex flex-row items-end">
                        랜선 집들이
                    <p class="ml-[20px] md:ml-[30px] text-[11px] md:text-[18px] font-normal">
                        해당 제품을 사용하여 시공한 집들이 입니다.
                    </p>
                    </p>
                    <Line />
                    <el-scrollbar class="mt-[30px] pb-[60px] lg:pb-[90px]">
                        <div class="flex">
                            <ProductDetailCard1 v-for="item in onlineHouseList"
                                class="shrink-0 mr-[6px] md:mr-[15px] lg:mr-[32px]" :item="item" />
                        </div>
                    </el-scrollbar>
                </div>

                <div v-if="expertHouseList.length > 0" class="mt-[75px] md:mt-[110px] lg:mt-[75px] " id="expertHouseView">
                    <p class="text-[18px] md:text-[24px] text-black font-bold flex flex-row items-end">
                        전문가 집들이
                    <p class="ml-[20px] md:ml-[30px] text-[11px] md:text-[18px] font-normal">
                        해당 제품을 사용한 전문가 집들이 입니다.
                    </p>
                    </p>
                    <Line />
                    <el-scrollbar class="mt-[30px] pb-[60px] lg:pb-[90px]">
                        <div class="flex">
                            <ProductDetailCard1 v-for="item in expertHouseList"
                                class="shrink-0 mr-[6px] md:mr-[15px] lg:mr-[32px]" :item="item" />
                        </div>
                    </el-scrollbar>
                </div>

                <div class="mt-[75px] md:mt-[110px] lg:mt-[75px]" id="blogView">
                    <p class="text-[18px] md:text-[24px] text-black font-bold flex flex-row items-end">
                        블로그
                    <p class="ml-[20px] md:ml-[30px] text-[11px] md:text-[18px] font-normal">
                        해당 제품을 사용한 시공사례 블로그입니다.
                    </p>
                    </p>
                    <Line />
                    <div class="mt-[30px] pb-[50px] lg:pb-[90px] hidden md:flex w-full">
                        <div class="flex">
                            <ProductDetailCard2 v-for="item in info.productBlogs" :item="item"
                                class="shrink-0 mr-[6px] md:mr-[15px] lg:mr-[32px]" />
                        </div>
                    </div>
                    <div class="mt-[30px] pb-[50px] lg:pb-[90px] flex md:hidden flex-col gap-y-[10px]">
                        <ProductDetailCard2 v-for="item in info.productBlogs" :item="item"
                            class="shrink-0 mr-[6px] md:mr-[15px] lg:mr-[32px]" />
                    </div>
                </div>

                <div v-if="favorProductList.length > 0">
                    <p class="text-[18px] md:text-[24px] text-black font-bold flex flex-row items-end">
                    <p class="hidden md:block">구정마루가 제안하는 마루</p>
                    <p class="block md:hidden">구정마루가<br />제안하는 마루</p>
                    <p class="ml-[20px] md:ml-[30px] text-[11px] md:text-[18px] font-normal">
                        소비자의 취향을 반영한 마루 트렌드
                    </p>
                    </p>
                    <Line />
                    <el-scrollbar class="mt-[30px] pb-[60px] lg:pb-[90px]">
                        <div class="flex">
                            <ProductDetailCard3 v-for="item in favorProductList"
                                class="shrink-0 mr-[6px] md:mr-[9px] lg:mr-[32px]" :product="item" />
                        </div>
                    </el-scrollbar>
                </div>

                <div v-if="info.similarProducts && info.similarProducts.length > 0" id="similarView">
                    <p class="text-[18px] md:text-[24px] text-black font-bold flex flex-row items-end">
                        비슷한 디자인 제품
                    <p class="ml-[20px] md:ml-[30px] text-[11px] md:text-[18px] font-normal">
                        해당 제품과 비슷한 디자인 제품입니다.
                    </p>
                    </p>
                    <Line />
                    <el-scrollbar class="mt-[30px] pb-[60px] lg:pb-[90px]">
                        <div class="flex">
                            <ProductDetailCard3 v-for="item in info.similarProducts"
                                class="shrink-0 mr-[6px] md:mr-[9px] lg:mr-[32px]" :product="item" />
                        </div>
                    </el-scrollbar>
                </div>

                <div v-if="otherProductList.length > 0" id="othersView">
                    <p class="text-[18px] md:text-[24px] text-black font-bold flex flex-row items-end">
                        다른 수종보기
                    <p class="ml-[20px] md:ml-[30px] text-[11px] md:text-[18px] font-normal">
                        해당 브랜드 내의 다른 수종입니다.
                    </p>
                    </p>
                    <Line />
                    <el-scrollbar class="mt-[30px] pb-[110px]">
                        <div class="flex">
                            <ProductDetailCard3 v-for="item in otherProductList"
                                class="shrink-0 mr-[6px] md:mr-[9px] lg:mr-[32px]" :product="item" />
                        </div>
                    </el-scrollbar>
                </div>

            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>