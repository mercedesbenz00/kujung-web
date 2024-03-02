<script setup lang="ts">
const route = useRoute();
import { api } from '~~/ts/api';
import { CommonConstantType, OnlineHouseStatus, HouseEntity } from '~~/ts/constants';
import { Common } from '~~/ts/_utils/common';
import { useModal } from 'vue-final-modal'
import ModalConstructionExType from '~~/components/ModalConstructionExType.vue';
import { CommonConstant } from '~/ts/interfaces/CommonConstant';
import { useStore } from '~/stores/common';
import { Tag } from '~/ts/interfaces/Tag';
import { House } from '~/ts/interfaces/House';
import { Category } from '~/ts/interfaces/Category';

// meta
definePageMeta({
    layout: 'page',
    title: '온라인 집들이'
});

const totalCnt = ref<number>(0)
const TAKE_COUNT = 9
const currentPage = ref<number>(1)

const list = ref<House[]>([])

const store = useStore()

const commandList = ref([{ name: "인기순", selected: true, order: "DESC", sortBy: "popularity" }, { name: "최신순", selected: true, order: "DESC", sortBy: "requested_at" }, { name: "위시리스트 순", selected: false, order: "DESC", sortBy: "wish_count" }])

const isExpertType = ref(route.hash == "#isExpertType")
const categoryList = ref<Category[]>([])
const selectedLargeCat = ref<Category | null>(null)
const selectedMediumCat = ref<Category | null>(null)

const colorList = ref<CommonConstant[]>([])
const areaSpacelist = ref<CommonConstant[]>([])
const houseTypeList = ref<CommonConstant[]>([])
const familyTypeList = ref<CommonConstant[]>([])
const houseStyleList = ref<CommonConstant[]>([])
const tagList = ref<Tag[]>([])

const selectedFilterList = ref<any>(
    [
        { name: "모던강", type: "areaType", },
        { name: "텍스쳐", type: "area", },
        { name: "베이지&브라운", type: "color", },
        { name: "20평대", type: "areaType", },
        { name: "고급스러운", type: "area", },
        { name: "네추럴", type: "color", },
        { name: "네추럴", type: "areaType", },
        { name: "네추럴", type: "area", },
        { name: "빌라", type: "color", },
        { name: "원룸&오피스텔", type: "areaType", },
        { name: "아파트", type: "area", },
        { name: "빌라", type: "color", },
    ]
)

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
    loadHouseList(1)
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

const onChangeTab = (p_type: boolean) => {
    isExpertType.value = p_type
    list.value = []
    refresh()
    if (isExpertType.value) {
        navigateTo("#isExpertType")
    } else {
        navigateTo("#isNormalType")
    }
}

const onWriteHouseWarming = () => {
    Common.checkLogin(() => {
        open()
    })
}

const onAsk = () => {
    Common.checkLogin(() => {
        navigateTo("/mypage/my-writes/inquiry-write?category=온라인 집들이")
    })
}

const loadCategoryList = () => {
    api.get('/category/tree')
        .then(response => {
            categoryList.value = response.data
        })
}

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    loadHouseList(1)
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
        loadHouseList(1)
        return;
    }
    if (selectedMediumCat.value?.id == p_selectedCategory.id) { // 중분류 선택해제
        selectedMediumCat.value = null
        p_selectedCategory.selected = false
        loadHouseList(1)
        return;
    }

    selectedLargeCat.value = Common.getCurLargeCategory(categoryList.value, p_selectedCategory)
    selectedMediumCat.value = Common.getCurMediumCategory(categoryList.value, p_selectedCategory)

    if (p_selectedCategory.children.length == 0) {
        deselectAll()
        p_selectedCategory.selected = true
    }
    loadHouseList(1)
}

const onToggleItemClick = (p_item: any) => {
    p_item.selected = !p_item.selected
    loadHouseList(1)
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    loadHouseList(val)
}

const loadHouseList = (p_page: number) => {
    currentPage.value = p_page
    api.post('/expert-house/house-list', {
        page: p_page,
        sortBy: commandList.value.find(it => it.selected)?.sortBy,
        order: commandList.value.find(it => it.selected)?.order,
        take: TAKE_COUNT,
        entity_type_list: [isExpertType.value ? HouseEntity.EXPERT : HouseEntity.ONLINE],
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
                list.value = response.data.items
                totalCnt.value = response.data.meta.totalCount
            }
        })
}

</script>

<template>
    <PageContainer>
        <div class="flex flex-col items-center max-w-[728px] lg:max-w-[1024px] w-full self-center px-[6px] md:px-0">
            <p class="text-[22px] md:text-[34px] text-black font-bold mt-[20px] md:mt-[80px]">
                온라인 집들이
            </p>
            <p class="text-[13px] md:text-[18px] text-black mt-[30px] text-center break-keep whitespace-pre-line">
                구정마루는 언제 어디서나 당신 곁에 있습니다.
            </p>

            <div class="flex flex-row gap-x-[1px] md:gap-x-[8px] w-full md:w-[508px] mt-[30px] md:mt-[74px]">
                <BtnConstructionExTab text="랜선 집들이" class="flex-1" :selected="!isExpertType"
                    :onClick="() => { onChangeTab(false) }" />
                <BtnConstructionExTab text="전문가 집들이" class="flex-1" :selected="isExpertType"
                    :onClick="() => { onChangeTab(true) }" />
            </div>
            <div class="w-full flex flex-row justify-end mt-[45px] md:mt-[80px] lg:mt-[50px]">
                <BtnWithLA class="ml-[5px]" laName="las la-file-alt" text="문의하기" :onClick="() => { onAsk() }" />
                <BtnWithLA class="ml-[5px]" laName="las la-edit" text="집들이 글쓰기" :onClick="() => onWriteHouseWarming()" />
            </div>

            <section
                class="w-full bg-[#F2EFE2] flex flex-col border border-warmGray-600 py-[20px] md:py-[50px] px-[5px] md:px-[10px] mt-[10px] gap-y-[5px] md:gap-y-[20px]">
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

            <!-- <section class="w-full bg-[#F2EFE2] border border-warmGray-600 py-[20px] md:py-[35px] px-[5px] md:px-[10px]">
                <BtnSelectedTag class="mr-[5px] md:mr-[20px] lg:mr-[30px] mt-[5px]" :text="item.name" :isBlueBg="type != 1"
                    v-for="(item, idx) in selectedFilterList" :selected="item.selected"
                    :onClick="(e: any) => {}" />
            </section> -->

            <section class="flex flex-col w-full mt-[30px] md:mt-[50px]">
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

                <div
                    class="mt-[20px] pb-[56px] md:pb-[80px] lg:pb-[110px] grid grid-cols-3 gap-x-[6px] md:gap-x-[4px] lg:gap-x-[30px] gap-y-[30px] md:gap-y-[50px] lg:gap-y-[60px]">
                    <div v-for="slide in list" :key="slide.id" class="flex justify-center">
                        <CardHouse :item="slide"
                            :onClick="() => { navigateTo(`/construction-ex/detail?id=${slide.id}&isExpertType=${slide.entity_type == HouseEntity.EXPERT}`) }" />
                    </div>
                </div>
            </section>

            <section class="flex flex-row justify-center mb-[110px] items-center">
                <el-pagination :current-page="currentPage" :page-size="TAKE_COUNT" background layout="prev, jumper, next"
                    :total="totalCnt" @current-change="handleCurrentChange" />
                <span class="absolute mr-[-20px] text-[13px] text-warmGray-800 leading-[13px]">/
                    {{ Math.ceil(totalCnt / TAKE_COUNT) }}</span>
            </section>
        </div>
    </PageContainer>
</template>

<style lang="scss"></style>