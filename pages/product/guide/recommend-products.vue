<script setup lang="ts">
const route = useRoute();
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import { useStore } from '~/stores/common';
import { Category } from '~/ts/interfaces/Category';
import { CommonConstant } from '~/ts/interfaces/CommonConstant';
import { House } from '~/ts/interfaces/House';
import { Product } from '~/ts/interfaces/Product';
import { ProductBlog } from '~/ts/interfaces/ProductBlog';
import { Tag } from '~/ts/interfaces/Tag';
import { Common } from '~~/ts/_utils/common';
import { api } from '~~/ts/api';
import { CommonConstantType, HouseEntity, OnlineHouseStatus } from '~~/ts/constants';
import lodash from 'lodash'

// meta
definePageMeta({
    layout: 'page',
    title: '마루 추천'
});

const totalCnt = ref<number>(0)
const TAKE_COUNT = 12
const currentPage = ref<number>(1)

const list = ref<Product[]>([])
const onlineHouselist = ref<House[]>([])
const blogList = ref<ProductBlog[]>([])

const store = useStore()

const commandList = ref([{ name: "인기순", selected: true, order: "DESC", sortBy: "popularity" }, { name: "최신순", selected: true, order: "DESC", sortBy: "created_at" }, { name: "위시리스트 순", selected: false, order: "DESC", sortBy: "wish_count" }])

const categoryList = ref<Category[]>([])
const selectedLargeCat = ref<Category | null>(null)
const selectedMediumCat = ref<Category | null>(null)

const colorList = ref<CommonConstant[]>([])
const areaSpacelist = ref<CommonConstant[]>([])
const houseTypeList = ref<CommonConstant[]>([])
const familyTypeList = ref<CommonConstant[]>([])
const houseStyleList = ref<CommonConstant[]>([])
const tagList = ref<Tag[]>([])

onMounted(() => {
    loadCategoryList()
    refresh()
})

watch(() => store.commonConstants, (newConst, oldConst) => {
    if (newConst != null) {
        initFilters()
    }
})

watch(() => store.tagList, (newTags, oldTags) => {
    if (newTags != null) {
        initTags()
    }
})

const initFilters = () => {
    if (store.commonConstants != null) {
        colorList.value = JSON.parse(JSON.stringify(store.commonConstants.find(it => it.type == CommonConstantType.Color)?.items))
        areaSpacelist.value = JSON.parse(JSON.stringify(store.commonConstants.find(it => it.type == CommonConstantType.AreaSpace)?.items))
        houseTypeList.value = JSON.parse(JSON.stringify(store.commonConstants.find(it => it.type == CommonConstantType.HouseType)?.items))
        familyTypeList.value = JSON.parse(JSON.stringify(store.commonConstants.find(it => it.type == CommonConstantType.FamilyType)?.items))
        houseStyleList.value = JSON.parse(JSON.stringify(store.commonConstants.find(it => it.type == CommonConstantType.HouseStyle)?.items))
    }
}
const initTags = () => {
    if (store.tagList != null) {
        tagList.value = JSON.parse(JSON.stringify(store.tagList))
    }
}

const refresh = () => {
    selectedLargeCat.value = null
    selectedMediumCat.value = null
    initFilters()
    initTags()
    loadList(1)
}

const checkIfFilterApplied = () => {
    return selectedLargeCat.value != null
        || colorList.value.find(it => it.selected)
        || areaSpacelist.value.find(it => it.selected)
        || houseTypeList.value.find(it => it.selected)
        || familyTypeList.value.find(it => it.selected)
        || houseStyleList.value.find(it => it.selected)
        || tagList.value.find(it => it.selected)
}

const loadCategoryList = () => {
    api.get('/category/tree')
        .then(response => {
            categoryList.value = response.data
        })
}

const loadOnlineHouseList = () => {
    api.post('/expert-house/house-list', {
        sortBy: commandList.value.find(it => it.selected)?.sortBy,
        order: commandList.value.find(it => it.selected)?.order,
        take: TAKE_COUNT,
        entity_type_list: [HouseEntity.ONLINE],
        status_list: [OnlineHouseStatus.APPROVED],
        category_level1_id: selectedLargeCat.value?.id,
        category_level2_id: selectedMediumCat.value?.id,
        color_list: colorList.value.filter(it => it.selected).map(it => it.id),
        family_type_list: familyTypeList.value.filter(it => it.selected).map(it => it.id),
        style_list: houseStyleList.value.filter(it => it.selected).map(it => it.id),
        area_space_list: areaSpacelist.value.filter(it => it.selected).map(it => it.id),
        house_type_list: houseTypeList.value.filter(it => it.selected).map(it => it.id),
        tags: tagList.value.filter(it => it.selected).map(it => it.id),
    })
        .then(response => {
            if (response.success) {
                onlineHouselist.value = response.data.items
            }
        })
}

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    loadList(1)
}


const deselectAll = () => {
    categoryList.value?.map(depth0 => {
        depth0.selected = false
        if (depth0.children.length > 0) {
            depth0.children.map(depth1 => {
                depth1.selected = false
                if (depth1.children.length > 0) {
                    depth1.children.map(depth2 => {
                        depth2.selected = false
                    })
                }
            })
        }
    })
}

const onCategoryClick = (e: Event, p_selectedCategory: Category) => {
    if (selectedLargeCat.value?.id == p_selectedCategory.id) { // 대분류 선택해제
        selectedLargeCat.value = null
        selectedMediumCat.value = null
        p_selectedCategory.selected = false
        loadList(1)
        return;
    }
    if (selectedMediumCat.value?.id == p_selectedCategory.id) { // 중분류 선택해제
        selectedMediumCat.value = null
        p_selectedCategory.selected = false
        loadList(1)
        return;
    }

    selectedLargeCat.value = Common.getCurLargeCategory(categoryList.value, p_selectedCategory)
    selectedMediumCat.value = Common.getCurMediumCategory(categoryList.value, p_selectedCategory)

    if (p_selectedCategory.children.length == 0) {
        deselectAll()
        p_selectedCategory.selected = true
    }
    loadList(1)
}

const onToggleItemClick = (p_item: any) => {
    p_item.selected = !p_item.selected
    loadList(1)
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    loadList(val)
}

const loadList = (p_page: number) => {
    currentPage.value = p_page
    api.post('/product/list', {
        page: p_page,
        sortBy: commandList.value.find(it => it.selected)?.sortBy,
        order: commandList.value.find(it => it.selected)?.order,
        take: TAKE_COUNT,
        category_level1_id: selectedLargeCat.value?.id,
        category_level2_id: selectedMediumCat.value?.id,
        area_space_list: areaSpacelist.value.filter(it => it.selected).map(it => it.id),
        color_list: colorList.value.filter(it => it.selected).map(it => it.id),
        style_list: houseStyleList.value.filter(it => it.selected).map(it => it.id),
        family_type_list: familyTypeList.value.filter(it => it.selected).map(it => it.id),
        house_type_list: houseTypeList.value.filter(it => it.selected).map(it => it.id),
        tags: tagList.value.filter(it => it.selected).map(it => it.id),
    })
        .then(response => {
            if (response.success) {
                list.value = response.data.items
                totalCnt.value = response.data.meta.totalCount

                if (checkIfFilterApplied()) {
                    if (p_page == 1) {
                        loadOnlineHouseList()

                        // 블로그 목록을 뽑기 위한 조작
                        const tmp = list.value.filter(it => it.productBlogs.length > 0)
                        const selectedList = lodash.sampleSize(tmp, 2)
                        blogList.value = []
                        if (selectedList.length < 2) {
                            selectedList.map(it => {
                                it.productBlogs.map(blog => {
                                    blogList.value.push(blog)
                                })
                            })
                        } else {
                            selectedList.map(it => {
                                blogList.value.push(it.productBlogs[0])
                            })
                        }
                    }
                } else {
                    onlineHouselist.value = []
                    blogList.value = []
                }
            }
        })
}

</script>

<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                마루 추천
            </p>
            <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                고객님의 취향을 반영한 마루를 추천드립니다.
            </p>

            <section
                class="w-full bg-[#F2EFE2] flex flex-col border border-warmGray-600 py-[20px] md:py-[50px] px-[5px] md:px-[10px] mt-[60px] gap-y-[5px] md:gap-y-[20px]">
                <div class="flex flex-row">
                    <p class="w-[55px] md:w-[150px] text-[12px] md:text-[18px] leading-[30px] font-bold">
                        마루종류
                    </p>
                    <div class="flex flex-col flex-1">
                        <div>
                            <BtnTag class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]" :text="depth0.name"
                                :isBlueBg="isExpertType" v-for="(depth0, idx) in categoryList"
                                :selected="depth0.id == selectedLargeCat?.id"
                                :onClick="(e: any) => onCategoryClick(e, depth0)" />
                        </div>

                        <div v-if="selectedLargeCat?.children.length > 0">
                            <LineGray class="my-[4px] md:my-[8px]" />
                            <BtnTag class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]" :isBlueBg="isExpertType"
                                v-for="depth1 in selectedLargeCat?.children" :key="depth1.id" :text="depth1.name"
                                :selected="depth1.id == selectedMediumCat?.id"
                                :onClick="(e: any) => onCategoryClick(e, depth1)" />

                            <div v-if="selectedMediumCat?.children.length > 0">
                                <BtnTag class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]" :isBlueBg="isExpertType"
                                    v-for="depth2 in selectedMediumCat?.children" :text="depth2.name" :key="depth2.id"
                                    :selected="depth2.selected" :onClick="(e: any) => onCategoryClick(e, depth2)" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row">
                    <p class="w-[55px] md:w-[150px] text-[12px] md:text-[18px] leading-[30px] font-bold">
                        컬러별
                    </p>
                    <div class="flex-1">
                        <BtnTag class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]" :text="item.name"
                            :isBlueBg="isExpertType" v-for="(item, idx) in colorList" :selected="item.selected"
                            :onClick="(e: any) => onToggleItemClick(item)" />
                    </div>
                </div>
                <!-- <div class="flex flex-row">
                    <p class="w-[55px] md:w-[150px] text-[12px] md:text-[18px] leading-[30px] font-bold">
                        주거 면적
                    </p>
                    <div class="flex-1">
                        <BtnTag class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]" :text="item.name"
                            :isBlueBg="isExpertType" v-for="(item, idx) in areaSpacelist" :selected="item.selected"
                            :onClick="(e: any) => onToggleItemClick(item)" />
                    </div>
                </div>
                <div class="flex flex-row">
                    <p class="w-[55px] md:w-[150px] text-[12px] md:text-[18px] leading-[30px] font-bold">
                        주거 공간
                    </p>
                    <div class="flex-1">
                        <BtnTag class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]" :text="item.name"
                            :isBlueBg="isExpertType" v-for="(item, idx) in houseTypeList" :selected="item.selected"
                            :onClick="(e: any) => onToggleItemClick(item)" />
                    </div>
                </div>
                <div class="flex flex-row">
                    <p class="w-[55px] md:w-[150px] text-[12px] md:text-[18px] leading-[30px] font-bold">
                        가족형태
                    </p>
                    <div class="flex-1">
                        <BtnTag class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]" :text="item.name"
                            :isBlueBg="isExpertType" v-for="(item, idx) in familyTypeList" :selected="item.selected"
                            :onClick="(e: any) => onToggleItemClick(item)" />
                    </div>
                </div> -->
                <div class="flex flex-row">
                    <p class="w-[55px] md:w-[150px] text-[12px] md:text-[18px] leading-[30px] font-bold">
                        스타일별
                    </p>
                    <div class="flex-1">
                        <BtnTag class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]" :text="item.name"
                            :isBlueBg="isExpertType" v-for="(item, idx) in houseStyleList" :selected="item.selected"
                            :onClick="(e: any) => onToggleItemClick(item)" />
                    </div>
                </div>
                <div class="flex flex-row">
                    <p class="w-[55px] md:w-[150px] text-[12px] md:text-[18px] leading-[30px] font-bold">
                        태그별
                    </p>
                    <div class="flex-1">
                        <BtnTag class="mr-[5px] my-[2px] md:mr-[20px] lg:mr-[30px]" :text="item.name"
                            :isBlueBg="isExpertType" v-for="(item, idx) in tagList" :selected="item.selected"
                            :onClick="(e: any) => onToggleItemClick(item)" />
                    </div>
                </div>
            </section>
            <button class="bg-secondaryNavy-500 text-white text-[11px] h-[32px] px-[25px] self-end my-[10px]"
                @click="refresh()">
                초기화
            </button>

            <section class="flex flex-col w-full mt-[30px] md:mt-[50px]">
                <div class="flex flex-row justify-between">
                    <p class="text-[18px] font-bold text-black">전체 {{ totalCnt }}개</p>
                    <div class="self-end">
                        <el-dropdown trigger="click" @command="handleCommand">
                            <el-button class="el-dropdown-link w-[120px]">
                                {{ commandList.find(it => it.selected)?.name }}&nbsp;&nbsp;&nbsp;&nbsp; ▼
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu v-for="command in commandList" :key="command.name">
                                    <el-dropdown-item :command="command.name">{{ command.name }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>

                <div
                    class="mt-[20px] pb-[56px] md:pb-[80px] lg:pb-[110px] grid grid-cols-3 lg:grid-cols-4 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="slide in list" :key="slide.id" class="flex justify-center">
                        <CardProduct :product="slide" :onClick="() => { }" />
                    </div>
                </div>
            </section>

            <section class="flex flex-row justify-center mb-[110px] items-center">
                <el-pagination :current-page="currentPage" :page-size="TAKE_COUNT" background layout="prev, jumper, next"
                    :total="totalCnt" @current-change="handleCurrentChange" />
                <span class="absolute mr-[-20px] text-[13px] text-warmGray-800 leading-[13px]">/
                    {{ Math.ceil(totalCnt / TAKE_COUNT) }}</span>
            </section>

            <section v-if="onlineHouselist.length > 0" class="flex flex-col w-full pb-[50px] lg:pb-[50px]" id="houseList">
                <p class="text-[18px] md:text-[24px] text-black font-bold flex flex-row items-end">
                    연관된 랜선집들이
                </p>
                <div class="mt-[30px] w-full">
                    <Carousel class="w-full flex" :itemsToShow="3" :wrapAround="false" snapAlign="start" :transition="500">
                        <Slide class="p-0" v-for="(slide, index) in onlineHouselist" :key="index">
                            <CardHouse :item="slide"
                                :onClick="() => { navigateTo(`/construction-ex/detail?id=${slide.id}&isExpertType=${slide.entity_type == HouseEntity.EXPERT}`) }" />
                        </Slide>
                        <template #addons>
                            <Navigation />
                        </template>
                    </Carousel>
                </div>
            </section>

            <section v-if="blogList.length > 0" class="w-full pb-[50px] lg:pb-[110px] " id="blogView">
                <p class="text-[18px] md:text-[24px] text-black font-bold flex flex-row items-end">
                    블로그 시공사례
                </p>
                <div class="mt-[30px] hidden md:flex w-full">
                    <div class="flex">
                        <ProductDetailCard2 v-for="item in blogList" :item="item"
                            class="shrink-0 mr-[6px] md:mr-[15px] lg:mr-[32px]" />
                    </div>
                </div>
                <div class="mt-[30px] flex md:hidden flex-col gap-y-[10px]">
                    <ProductDetailCard2 v-for="item in blogList" :item="item"
                        class="shrink-0 mr-[6px] md:mr-[15px] lg:mr-[32px]" />
                </div>
            </section>
        </div>
    </PageContainer>
</template>

<style lang="scss">
#houseList {
    .carousel__slide {
        padding: 0px;
        position: relative;
        align-items: start;
    }

    .carousel__prev,
    .carousel__next {
        background: rgba(48, 48, 45, 0.5);
        width: 26px;
        height: 26px;
        margin: 0;
        position: absolute;
        top: 54px;

        @media (min-width: 768px) {
            width: 48px;
            height: 48px;
            top: 100px;
        }

        @media (min-width: 1024px) {
            top: 120px;
        }

        .carousel__icon {
            width: 100%;
            height: 100%;
        }
    }

    .carousel__pagination {
        position: absolute;
        bottom: 37px;
    }

    .carousel__next--disabled,
    .carousel__prev--disabled {
        cursor: auto;
        opacity: 0;
    }

    .carousel__pagination-button {
        padding: 7px;
    }

    .carousel__pagination-button::after {
        display: block;
        content: "";
        width: 14px;
        height: 14px;
        border-radius: 7px;
        background-color: #ffffff7e;
    }

    .carousel__pagination-button:hover::after,
    .carousel__pagination-button--active::after {
        background-color: black;
    }

}
</style>