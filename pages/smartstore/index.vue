<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { api } from '~/ts/api';
import { SCREEN_WIDTH } from '~~/ts/constants';
import { BannerSetting } from '~~/ts/interfaces/BannerSetting';
import { SmartStoreBanner } from '~~/ts/interfaces/SmartStoreBanner';
import { SmartStore } from '~~/ts/interfaces/SmartStore';
import { useStore } from '~/stores/common';

// meta
definePageMeta({
    layout: 'page',
    title: '스마트 스토어'
});

const store = useStore()

const categories = ref([
    {
        name: '전체',
        selected: true,
    },
    {
        name: '리빙',
        selected: false,
    },
    {
        name: '조명',
        selected: false,
    },
    {
        name: '소품',
        selected: false,
    }, {
        name: '기타',
        selected: false,
    },
])

const commandList = ref([{ name: "제품 최신순", selected: true, order: "DESC" }])

const bannerSetting = ref<BannerSetting>()
const bannerList = ref<SmartStoreBanner[]>()
const mainBannerSlideIndex = ref<Number>(1)

const recommendStoreList = ref<SmartStore[]>()
const storeList = ref<SmartStore[]>()
const totalCnt = ref<number>(0)
const TAKE_COUNT = 9
const currentPage = ref<number>(1)

onMounted(() => {

    // carousel이 타 화면에 갔다오면 동작하지 않는것에 대한 해결책
    setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
    }, 1000);
    getBannerList()
    getRecommendStoreList()
    getStoreList(1)
})


const handleMainBannerSlideEnd = (data: any) => {
    mainBannerSlideIndex.value = data.currentSlideIndex + 1
}

const onSelectMainCategory = (index: any) => {
    categories.value.forEach(it => {
        it.selected = false
    })
    categories.value[index].selected = true
    getRecommendStoreList()
    getStoreList(1)
}

const handleCommand = (command: string | number | object) => {
    commandList.value.forEach(it => {
        it.selected = false
    })
    const i = commandList.value.findIndex(it => it.name == command)
    commandList.value[i].selected = true
    getStoreList(1)
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    getStoreList(val)
}

const getBannerList = () => {
    api.get('/banner-setting/smart-store')
        .then(response => {
            bannerSetting.value = response.data
        })
    api.get(`/smart-store-banner?enabled=true`)
        .then(response => {
            bannerList.value = response.data.items
        })
}

const getRecommendStoreList = () => {
    const selectedCategory = categories.value.find(it => it.selected)?.name
    api.get(`/smart-store?recommended=true${selectedCategory != '전체' ? '&category=' + selectedCategory : ''}`)
        .then(response => {
            recommendStoreList.value = response.data.items
        })
}

const getStoreList = (p_page: number) => {
    currentPage.value = p_page
    const selectedCategory = categories.value.find(it => it.selected)?.name
    api.get(`/smart-store?page=${p_page}&take=${TAKE_COUNT}&sortBy=created_at&order=${commandList.value.find(it => it.selected)?.order}${selectedCategory != '전체' ? '&category=' + selectedCategory : ''}`)
        .then(response => {
            storeList.value = response.data.items
            totalCnt.value = response.data.meta.totalCount
        })
}

const onBannerClick = (banner: SmartStoreBanner) => {
    if (banner.address.length > 0) {
        window.open(banner.address.startsWith("http") ? banner.address : "http://" + banner.address)
    }
}
const onItemClick = (item: SmartStore) => {
    if (item.address.length > 0) {
        window.open(item.address.startsWith("http") ? item.address : "http://" + item.address)
    }
}

</script>
<template>
    <PageContainer>
        <div class="flex flex-col gap-[24px] justify-center items-center text-center mt-[98px]">
            <div>
                <h1 class="mb-[14px]">스마트 스토어</h1>
                <!-- <p class="text-[15px] md:text-[18px] mt-[14px] md:mt-[28px]">구정마루 몰에서 구매할 수 있는
                    상품들입니다.<br />
                    인테리어에 필요한 다양한 상품을
                    구매하실 수 있습니다.</p> -->
            </div>
        </div>

        <Line class="mt-[37px] md:mt-[27px]" />

        <section class="w-full flex mt-[50px] md:mt-[100px] relative" id="smartStoreBanner">
            <Carousel class="w-full h-full flex justify-center" :touchDrag="false" :itemsToShow="1" :wrapAround="true"
                :autoplay="bannerSetting?.auto_transition ? (bannerSetting?.interval * 1000) : 0" :transition="500"
                @slide-end="handleMainBannerSlideEnd">
                <Slide class="h-full p-0" v-for="item in bannerList" :key="item.id">
                    <div class="w-full h-[400px] md:h-[600px]">
                        <img :src="SCREEN_WIDTH > 1024 ? item.image_url : item.image_url_mobile"
                            class="w-full h-full object-cover" @click="() => onBannerClick(item)" />
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                    <div
                        class="absolute flex flex-row items-center bottom-[28px] right-[25px] lg:bottom-[74px] lg:right-[130px]">
                        <p class="text-white text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] mr-[7px]">{{
                            Number(mainBannerSlideIndex).toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            }) }}</p>
                        <Pagination />
                        <p class="text-white text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] ml-[7px]">
                            {{ Number(bannerList?.length).toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            }) }}</p>
                    </div>
                </template>
            </Carousel>
        </section>

        <div class="w-full flex flex-col mt-[50px] md:mt-[30px] lg:mt-[100px]">
            <div class="w-full flex flex-row max-w-[1024px] self-center">
                <BtnPrimary v-for="(category, index) in categories" :text="category.name" :selected="category.selected"
                    class="flex-1 px-[0px] mx-[2px] md:mx-[12px] text-[13px]"
                    :on-click="() => onSelectMainCategory(index)" />
            </div>

            <div class="w-full flex flex-col self-center bg-[#FFFEF2] mt-[75px] md:mt-[50px] lg:mt-[75px]"
                v-if="recommendStoreList?.length > 0">
                <div
                    class="w-full max-w-[1024px] self-center pt-[40px] md:pt-[30px] pb-[24px] px-[10px] md:px-[20px] lg:px-0 flex flex-col">
                    <p class="font-bold text-[22px] md:text-[24px] lg:ml-[10px]">구정 Bee의 추천 제품</p>
                    <div class="w-full md:ml-0 mt-[15px] md:mt-[30px] lg:mt-[50px]">
                        <Carousel :itemsToShow="3" :wrapAround="false" snap-align="start">
                            <Slide v-for="slide in recommendStoreList" :key="slide.id">
                                <div class="self-start">
                                    <CardSmartStore :isRecommend="true" :item="slide" @click="onItemClick(slide)" />
                                </div>
                            </Slide>
                        </Carousel>
                    </div>
                </div>
            </div>

            <div class="w-full flex flex-col max-w-[1024px] self-center">
                <section class="mt-[32px] md:mt-[50px] lg:mt-[93px] flex self-end justify-end mr-[8px] md:mr-[10px]">
                    <!-- <el-dropdown trigger="click" @command="handleCommand">
                        <el-button class="el-dropdown-link w-[120px]">
                            {{ commandList.find(it => it.selected)?.name }}&nbsp;&nbsp;&nbsp;&nbsp; ▼
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu v-for="command in commandList" :key="command.name">
                                <el-dropdown-item :command="command.name">{{ command.name }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown> -->
                </section>

                <div
                    class="px-[8px] md:px-[20px] lg:px-[0px] pt-[75px] md:pt-[30px] lg:pt-[40px] pb-[56px] md:pb-[80px] lg:pb-[110px] grid grid-cols-3 gap-x-[8px] lg:gap-x-[0px] gap-y-[50px] md:gap-y-[28px] lg:gap-y-[64px]">
                    <div v-for="slide in storeList" :key="slide.id" class="flex justify-center">
                        <CardSmartStore class="" :item="slide" @click="onItemClick(slide)" />
                    </div>
                </div>

                <section class="flex flex-row justify-center mb-[110px] items-center">
                    <el-pagination :current-page="currentPage" :page-size="TAKE_COUNT" background
                        layout="prev, jumper, next" :total="totalCnt" @current-change="handleCurrentChange" />
                    <span class="absolute mr-[-20px] text-[13px] text-warmGray-800 leading-[13px]">/
                        {{ Math.ceil(totalCnt / TAKE_COUNT) }}</span>
                </section>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="scss">
#smartStoreBanner {
    .carousel__slide {
        padding: 0px;
    }

    .carousel__prev,
    .carousel__next {
        background: rgba(255, 255, 255, 0.5);
        width: 50px;
        height: 50px;
        margin: 0;

        @media (min-width: 768px) {
            width: 60px;
            height: 60px;
        }

        @media (min-width: 1280px) {
            width: 100px;
            height: 100px;
        }

        .carousel__icon {
            width: 100%;
            height: 100%;
        }
    }

    .carousel__pagination {
        margin: 0px;
    }

    .carousel__pagination-button {
        padding: 0px;
    }

    .carousel__pagination-button::after {
        display: block;
        content: "";
        @apply w-[20px] lg:w-[35px];
        height: 3px;
        border-radius: 0px;
        background-color: #ffffff7e;
    }

    .carousel__pagination-button:hover::after,
    .carousel__pagination-button--active::after {
        background-color: white;
    }

}
</style>