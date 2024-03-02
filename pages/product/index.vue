<script setup lang="ts">
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { Category } from '~/ts/interfaces/Category';
import { Common } from '~~/ts/_utils/common';
import { api } from '~~/ts/api';
import { SCREEN_WIDTH } from '~~/ts/constants';
const route = useRoute();

// meta
definePageMeta({
    layout: 'page',
    title: '전 제품 소개'
});

onMounted(() => {
    // carousel이 타 화면에 갔다오면 동작하지 않는것에 대한 해결책
    setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
    }, 1000);
    loadCategoryList()
})

watch(() => route.query.category_id, (newId: Number, oldId: Number) => { onWatchCatId(newId, oldId) })

const showAllCatGuide = ref(true)
const showAllProducts = ref(false)
const categoryList = ref<Category[]>([])
const selectedCatFeature = ref<Category | null>(null)
const selectedCategory = ref<Category | null>(null)
const selectedLargeCat = ref<Category | null>(null)
const selectedMediumCat = ref<Category | null>(null)

const loadCategoryList = () => {
    api.get('/category/tree')
        .then(response => {
            categoryList.value = response.data
            if (route.query.category_id) {
                onWatchCatId(Number(route.query.category_id), 0)
            }
        })
}

const deselectAll = () => {
    selectedCategory.value = null
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

const onWatchCatId = (newId: Number, oldId: Number) => {
    var foundCat;
    if (newId == 0 || newId == undefined) {
        onAllCatGuide()
        return;
    }
    if (newId == -1) {
        onShowAllProducts()
        return;
    }

    const needScrollTop = route.query.needScrollTop == 'true'

    foundCat = categoryList.value.find(it => it.id == Number(newId))
    if (foundCat) {
        onCategoryClick(undefined, foundCat!, needScrollTop)
    } else {
        categoryList.value.forEach(it => {
            foundCat = it.children.find(a => a.id == newId)
            if (foundCat) {
                onCategoryClick(undefined, foundCat!, needScrollTop)
                return;
            } else {
                it.children.forEach(b => {
                    foundCat = b.children.find(c => c.id == newId)
                    if (foundCat) {
                        onCategoryClick(undefined, foundCat!, needScrollTop)
                        return;
                    }
                })
            }
        })
    }
}

const onCategoryClick = (e: Event | undefined, p_selectedCategory: Category, needScrollTop: Boolean = false) => {
    if (e)
        e.stopPropagation()

    if (selectedCategory.value?.id == p_selectedCategory.id)
        return

    selectedCategory.value = null
    selectedLargeCat.value = Common.getCurLargeCategory(categoryList.value, p_selectedCategory)
    selectedMediumCat.value = Common.getCurMediumCategory(categoryList.value, p_selectedCategory)

    if (p_selectedCategory.children.length == 0) {
        showAllProducts.value = false
        showAllCatGuide.value = false
        deselectAll()
        selectedCatFeature.value = null
        p_selectedCategory.selected = true
        setTimeout(() => {
            selectedCategory.value = p_selectedCategory
            navigateTo(`?category_id=${p_selectedCategory.id}&needScrollTop=${needScrollTop}`)
        }, 100)
    } else {
        onCategoryFeatureClick(e, p_selectedCategory)
        navigateTo(`?category_id=${p_selectedCategory.id}&needScrollTop=${needScrollTop}`)
    }

    if (needScrollTop) {
        window.scrollTo({ top: 0, left: 0 })
    }
}

const onCategoryFeatureClick = (e: Event | undefined, p_selectedCategory: Category | null) => {
    if (e)
        e.stopPropagation()

    if (selectedCategory.value?.id == p_selectedCategory?.id)
        return

    showAllCatGuide.value = false
    showAllProducts.value = false
    if (p_selectedCategory) {
        deselectAll()
        if (p_selectedCategory.depth == 0) {
            selectedMediumCat.value = null
            selectedCatFeature.value = p_selectedCategory
        } else if (p_selectedCategory.depth == 1) {
            selectedCatFeature.value = p_selectedCategory
        }
    }
}

const onAllCatGuide = () => {
    deselectAll()
    showAllCatGuide.value = true
    showAllProducts.value = false
    selectedLargeCat.value = null
    selectedMediumCat.value = null
    selectedCatFeature.value = null
    navigateTo(`?category_id=0`)
}

const onShowAllProducts = () => {
    deselectAll()
    showAllCatGuide.value = false
    showAllProducts.value = true
    selectedLargeCat.value = null
    selectedMediumCat.value = null
    selectedCatFeature.value = null
    navigateTo(`?category_id=-1`)
}

</script>
<template>
    <PageContainer>
        <div v-if="!showAllCatGuide && !showAllProducts">
            <ProductRecommendList class="hidden lg:flex" />
        </div>
        <div v-if="showAllProducts">
            <ProductRecommendList :isGlobalRecommend="true" class="hidden lg:flex" />
        </div>
        <div class="flex flex-row mt-[57px] md:mt-[78px] lg:mt-[100px] max-w-[1080px] self-center w-full">
            <!-- pc 에서 좌측 collapse 메뉴 -->
            <div class="hidden lg:flex product-category-collapse flex-col mt-[52px] mr-[88px] w-[150px]">
                <p class="font-bold" :class="showAllCatGuide && ' selected'" @click="onAllCatGuide">
                    전 제품 안내
                </p>
                <el-collapse accordion>
                    <el-collapse-item v-for="(depth0, idx) in categoryList" :title="depth0.name" :name="depth0.name"
                        @click="(e) => onCategoryClick(e, depth0)"
                        :class="(depth0.selected && 'selected ') + (depth0.children?.length > 0 ? 'has-child' : ' no-child')">

                        <p v-if="depth0.children.length > 0" :class="selectedCatFeature?.id == depth0.id && 'selected'"
                            @click="(e: any) => onCategoryFeatureClick(e, depth0)">
                            <!-- {{ depth0.name }}  -->
                            특징소개
                        </p>

                        <el-collapse accordion v-if="depth0.children?.length > 0" class="product-sub-category-collapse">
                            <el-collapse-item v-for="(depth1, idx) in depth0.children" :title="depth1.name"
                                @click="(e) => onCategoryClick(e, depth1)" :name="depth1.name"
                                :class="(depth1.selected && 'selected ') + (depth1.children?.length > 0 ? 'has-child' : ' no-child')">

                                <p v-if="depth1.children.length > 0"
                                    :class="selectedCatFeature?.id == depth1.id && 'selected'"
                                    @click="(e: any) => onCategoryFeatureClick(e, depth1)">
                                    <!-- {{ depth1.name }}  -->
                                    특징소개
                                </p>

                                <p v-for="(depth2, idx) in depth1.children" @click="(e) => onCategoryClick(e, depth2)"
                                    :class="depth2.selected && 'selected'">
                                    {{ depth2.name }}
                                </p>
                            </el-collapse-item>
                        </el-collapse>
                    </el-collapse-item>
                </el-collapse>
                <p class="font-bold mt-[10px]" :class="showAllProducts && ' selected'" @click="onShowAllProducts">
                    전체 제품 보기
                </p>
            </div>

            <div class="flex flex-col flex-1 items-center w-[860px] overflow-hidden">
                <!-- mobile에서 보여지는 상단 문구 -->
                <div>
                    <p v-if="selectedCatFeature"
                        class="text-[24px] md:text-34px] lg:text-[30px] text-center lg:text-start font-bold">
                        {{ selectedCatFeature.name + " 안내" }}
                    </p>
                    <p v-if="selectedCategory"
                        class="text-[24px] md:text-34px] lg:text-[30px] text-center lg:text-start font-bold">
                        {{ selectedCategory.name + " 안내" }}
                    </p>
                    <p v-if="showAllCatGuide"
                        class="text-[24px] md:text-34px] lg:text-[30px] text-center lg:text-start font-bold">
                        전 제품 소개
                    </p>
                    <p v-if="showAllProducts"
                        class="text-[24px] md:text-34px] lg:text-[30px] text-center lg:text-start font-bold">
                        전체 제품 보기
                    </p>
                </div>
                <p class="mt-[30px] text-[15px] md:text-[18px] text-black">
                    구정마루의 제품 안내입니다
                </p>
                <div class="px-[8px] md:px-0 w-full items-center justify-center flex mt-[40px] lg:mb-[50px]">
                    <Line class="w-full" />
                </div>

                <!-- 모바일에서만 보여짐 -->
                <div class="flex flex-col lg:hidden px-[8px] md:px-[0px] max-w-[728px] w-full mb-[50px] md:mb-[40px]">
                    <!-- <p class="text-[18px] md:text-[24px] text-black font-bold">전 제품 소개</p>
                    <BtnThird class="h-[54px] mt-[14px] text-[15px]" text="전 제품 소개" :selected="showAllCatGuide"
                        @click="onAllCatGuide" />

                    <p class="text-[18px] md:text-[24px] text-black font-bold mt-[40px] md:mt-[60px]">대분류</p>
                    <Line class="border-warmGray-600 mt-[10px] md:mt-[15px]" /> -->
                    <div class="">
                        <section class="w-full flex" id="categoryBanner">
                            <Carousel class="w-full h-full flex justify-center" snapAlign="start"
                                :itemsToShow="SCREEN_WIDTH > 768 ? 4.5 : 4" :transition="500">
                                <Slide class="h-full p-0" v-for="(depth0, index) in categoryList" :key="index">
                                    <BtnCategoryLarge :text="depth0.name" :selected="depth0.id == selectedLargeCat?.id"
                                        :onClick="(e: any) => onCategoryClick(e, depth0)" />
                                </Slide>
                                <template #addons>
                                    <!-- <Navigation /> -->
                                </template>
                            </Carousel>
                        </section>
                    </div>

                    <div
                        class="px-[20px] md:px-[44px] py-[27px] md:py-[30px] bg-warmGray-500 min-h-[250px] md:min-h-[180px] border-warmGray-600 border-[1px]">
                        <div v-if="selectedLargeCat">
                            <div v-if="selectedLargeCat?.children.length > 0">
                                <BtnCategoryMedium class="mr-[20px] md:mr-[30px]" :text="'특징소개'"
                                    :selected="selectedCatFeature?.id == selectedLargeCat?.id"
                                    :onClick="(e: any) => onCategoryFeatureClick(e, selectedLargeCat)" />
                            </div>
                            <div>
                                <BtnCategoryMedium v-for="depth1 in selectedLargeCat?.children" :key="depth1.id"
                                    class="mr-[20px] md:mr-[30px] mt-[20px] md:mt-[12px]" :text="depth1.name"
                                    :selected="depth1.id == selectedMediumCat?.id"
                                    :onClick="(e: any) => onCategoryClick(e, depth1)" />
                            </div>
                            <div v-if="selectedMediumCat && (selectedLargeCat?.children.length > 0)">
                                <div v-if="selectedMediumCat?.children.length > 0" class="mt-[10px]">
                                    <BtnCategoryMedium class="mr-[20px] md:mr-[30px] mt-[20px] md:mt-[12px]"
                                        :text="selectedMediumCat?.name + ' 특징소개'"
                                        :selected="selectedCatFeature?.id == selectedMediumCat?.id"
                                        :onClick="(e: any) => onCategoryFeatureClick(e, selectedMediumCat)" />
                                </div>
                                <div>
                                    <BtnCategoryMedium class="mr-[20px] md:mr-[30px] mt-[20px] md:mt-[12px]"
                                        v-for="depth2 in selectedMediumCat?.children" :text="depth2.name" :key="depth2.id"
                                        :selected="depth2.selected" :onClick="(e: any) => onCategoryClick(e, depth2)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div v-if="showAllCatGuide"
                    class="grid grid-cols-2 self-center gap-x-[8px] lg:gap-x-[32px] gap-y-[50px] md:gap-y-[40px] lg:gap-y-[50px] px-[8px] md:px-[20px] mb-[50px] md:mb-[80px] lg:mb-[160px]">
                    <CardCategoryLarge v-for="(item, index) in categoryList" :key="index" :item="item"
                        :onClick="(e: any) => { onCategoryFeatureClick(e, item) }" />
                </div>

                <ProductFeatureIntroduction v-if="selectedCatFeature" :category="selectedCatFeature" :onSubCategoryClick="(e: Event, p_category: Category) => {
                    onCategoryClick(e, p_category, true)
                }" />

                <ProductCategoryDetail v-if="selectedCategory" :category="selectedCategory" />

                <div class="flex flex-col lg:hidden px-[20px] md:px-[0px] md:max-w-[728px] w-full mb-[110px]">
                    <p class="text-[18px] md:text-[24px] text-black font-bold">구정마루 전체 제품 한눈에 보기</p>
                    <BtnThird class="h-[54px] mt-[14px] text-[15px]" text="전체 제품 보기" :selected="showAllProducts" @click="() => {
                        onShowAllProducts()
                    }" />
                </div>

                <ProductAllList v-if="showAllProducts" :category="selectedCategory"
                    class="flex flex-col lg:hidden md:max-w-[728px] w-full mb-[100px]" />
            </div>

            <ProductAllList v-if="showAllProducts" :category="selectedCategory" class="hidden lg:flex mb-[100px]" />
        </div>

        <ProductList v-if="selectedCategory" :category="selectedCategory" class="hidden lg:flex mt-[121px] mb-[153px]" />
    </PageContainer>
</template>

<style lang="scss">
#categoryBanner {
    .carousel__slide {
        padding: 0px;
    }

    .carousel__prev,
    .carousel__next {
        background: rgba(0, 0, 0, 0.5);
        width: 25px;
        height: 25px;
        margin: 0;

        @media (min-width: 768px) {
            width: 48px;
            height: 48px;
        }

        @media (min-width: 1280px) {
            width: 60px;
            height: 60px;
        }

        .carousel__icon {
            width: 100%;
            height: 100%;
        }
    }

    .carousel__pagination {
        position: absolute;
        bottom: 67px;
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

    .carousel__viewport {
        width: 100% !important;
    }

}
</style>