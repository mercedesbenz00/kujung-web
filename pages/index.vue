<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import { OnlineHouse } from '~/ts/interfaces/OnlineHouse';
import { Common } from '~~/ts/_utils/common';
import { api } from '~~/ts/api';
import { SCREEN_WIDTH } from '~~/ts/constants';
import { MainConstructionCase } from '~~/ts/interfaces/MainConstructionCase';
import { MainInstagram } from '~~/ts/interfaces/MainInstagram';
import { MainYoutube } from '~~/ts/interfaces/MainYoutube';
import { Product } from '~~/ts/interfaces/Product';
import { SearchTerm } from '~~/ts/interfaces/SearchTerm';
import { Tag } from '~~/ts/interfaces/Tag';

// meta
definePageMeta({
    layout: 'page',
    title: ''
})

export interface IBannerSetting {
    interval: Number,
    auto_transition: boolean,
}

export interface IMainBanner {
    address: string,
    target: Number,
    format: string,
    video_url: string,
    image_url: string,
    image_url_mobile: string
}

const mainBannerSetting = ref<IBannerSetting>()
const mainBannerList = ref<IMainBanner[]>()
const mainBannerSlideIndex = ref<Number>(1)
const mainBannerAutoPlay = ref<boolean>(true)

const mainHouseList = ref<OnlineHouse[]>([])
const bestProductList = ref<Product[]>()
const mainConstructionCaseList = ref<MainConstructionCase[]>()
const constructionSlideIndex = ref<Number>(1)
const interiorAutoPlay = ref<boolean>(true)

const mainSearchTermList = ref<SearchTerm[]>()
const mainTagList = ref<Tag[]>()
const mainYoutubeList = ref<MainYoutube[]>()
const mainInstaList = ref<MainInstagram[]>()

const productMainCategories = ref([
    {
        name: '원목마루',
        selected: true,
        products: [
            {
                id: 1,
                imgUrl: "https://i.postimg.cc/RZ1xTgNX/580x350.png"
            },
            {
                id: 2,
                imgUrl: "https://i.postimg.cc/R0Xrkq1t/580x350.png"
            },
            {
                id: 3,
                imgUrl: "https://i.postimg.cc/25zR9nWm/580x350.png"
            },
            {
                id: 4,
                imgUrl: "https://i.postimg.cc/NMFhBYbz/580x350.png"
            },
        ]
    },
    {
        name: '천연마루',
        selected: false,
        products: [
            {
                id: 1,
                imgUrl: "https://i.postimg.cc/WzTLJr7h/00-resize-580x350.jpg"
            },
            {
                id: 2,
                imgUrl: "https://i.postimg.cc/zGVmWqTS/06-580x350.png"
            },
            {
                id: 3,
                imgUrl: "https://i.postimg.cc/qMmVzN6v/580x350.jpg"
            },
            {
                id: 4,
                imgUrl: "https://i.postimg.cc/3RMHYz4j/580x350.jpg"
            },
        ]
    },
    {
        name: '대리석 마루',
        selected: false,
        products: [
            {
                id: 1,
                imgUrl: "https://i.postimg.cc/WzTLJr7h/00-resize-580x350.jpg"
            },
            {
                id: 2,
                imgUrl: "https://i.postimg.cc/25zR9nWm/580x350.png"
            },
            {
                id: 3,
                imgUrl: "https://i.postimg.cc/R0Xrkq1t/580x350.png"
            },
            {
                id: 4,
                imgUrl: "https://i.postimg.cc/qMmVzN6v/580x350.jpg"
            },
        ]
    },
    {
        name: '블론테 마루',
        selected: false,
        products: [
            {
                id: 1,
                imgUrl: "https://i.postimg.cc/zGVmWqTS/06-580x350.png"
            },
            {
                id: 2,
                imgUrl: "https://i.postimg.cc/ZKrz4J6w/00-resize-580x350.jpg"
            },
            {
                id: 3,
                imgUrl: "https://i.postimg.cc/3RMHYz4j/580x350.jpg"
            },
            {
                id: 4,
                imgUrl: "https://i.postimg.cc/HxJFKmp4/580x350.png"
            },
        ]
    }, {
        name: '강마루',
        selected: false,
        products: [
            {
                id: 1,
                imgUrl: "https://i.postimg.cc/ZKrz4J6w/00-resize-580x350.jpg"
            },
            {
                id: 2,
                imgUrl: "https://i.postimg.cc/hGZHpvqt/00-resize-580x350.jpg"
            },
            {
                id: 3,
                imgUrl: "https://i.postimg.cc/HxJFKmp4/580x350.png"
            },
            {
                id: 4,
                imgUrl: "https://i.postimg.cc/1z3kG62d/e1603344329590-580x350.png"
            },
        ]
    }, {
        name: '텍스쳐 마루',
        selected: false,
        products: [
            {
                id: 1,
                imgUrl: "https://i.postimg.cc/rFbRXCC1/00-02-resize-580x350.jpg"
            },
            {
                id: 2,
                imgUrl: "https://i.postimg.cc/NMFhBYbz/580x350.png"
            },
            {
                id: 3,
                imgUrl: "https://i.postimg.cc/HWNkVWcH/2020-2-1-580x350.png"
            },
            {
                id: 4,
                imgUrl: "https://i.postimg.cc/RZ1xTgNX/580x350.png"
            },
        ]
    }, {
        name: '비스포크 마루',
        selected: false,
        products: [
            {
                id: 1,
                imgUrl: "https://i.postimg.cc/rFbRXCC1/00-02-resize-580x350.jpg"
            },
            {
                id: 2,
                imgUrl: "https://i.postimg.cc/HWNkVWcH/2020-2-1-580x350.png"
            },
            {
                id: 3,
                imgUrl: "https://i.postimg.cc/W1GNWM9b/580x350.png"
            },
            {
                id: 4,
                imgUrl: "https://i.postimg.cc/G3gHGJfW/Kakao-Talk-20170814-141030256-580x350.png"
            },
        ]
    },
])

const products = [
    {
        imageUrl: 'https://i.postimg.cc/0Nv2kR1G/Rectangle-5.png',
        title: '원목마루 > 노블레스',
        text: '브라운 유러피안 오크'
    },
    {
        imageUrl: 'https://i.postimg.cc/CxkxpMXL/Rectangle-50.png',
        title: '원목마루 > 노블레스',
        text: '브라운 유러피안 오크'
    },
    {
        imageUrl: 'https://i.postimg.cc/wBkx3f9C/Rectangle-51.png',
        title: '원목마루 > 노블레스',
        text: '브라운 유러피안 오크'
    }
]

onMounted(() => {

    // carousel이 타 화면에 갔다오면 동작하지 않는것에 대한 해결책
    setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
    }, 1000);

    getMainBannerList()
    getMainHouseList()
    getBestProductList()
    getMainConstructionCases()
    getMainSearchTermList()
    getMainTagList()
    getMainYoutubeList()
    getMainInstaList()
})

const handleMainBannerSlideEnd = (data: any) => {
    mainBannerSlideIndex.value = data.currentSlideIndex + 1
}

const onPauseMainBannerSlide = () => {
    mainBannerAutoPlay.value = false
}

const onResumeMainBannerSlide = () => {
    mainBannerAutoPlay.value = true
}

const onPauseInteriorSlide = () => {
    interiorAutoPlay.value = false
}

const onResumeInteriorSlide = () => {
    interiorAutoPlay.value = true
}

const handleInteriorBannerSlideEnd = (data: any) => {
    constructionSlideIndex.value = data.currentSlideIndex + 1
}


const getMainBannerList = () => {
    api.get('/banner-setting/main')
        .then(response => {
            mainBannerSetting.value = response.data
        })
    api.get('main-banner?enabled=true')
        .then(response => {
            mainBannerList.value = response.data.items
        })
}

const getMainHouseList = () => {
    api.post('online-house/list', { main_display: true })
        .then(response => {
            mainHouseList.value = response.data.items
        })
}

const getBestProductList = async () => {
    const res = await api.post(`/product/list`, {
        q: "Best",
        q_type: "selected_icons",
    })
    if (res.success) {
        bestProductList.value = res.data.items
    }
}

const getMainConstructionCases = async () => {
    const res = await api.get(`/main-construction-case`)
    if (res.success) {
        mainConstructionCaseList.value = res.data.items
    }
}

const getMainSearchTermList = async () => {
    const res = await api.get(`/search-term?main_display=true&display=true`)
    if (res.success) {
        mainSearchTermList.value = res.data.items
    }
}

const getMainTagList = async () => {
    const res = await api.get(`/tag?main_display=true&display=true`)
    if (res.success) {
        mainTagList.value = res.data.items
    }
}

const getMainYoutubeList = () => {
    api.get('main-youtube')
        .then(response => {
            mainYoutubeList.value = response.data.items
        })
}

const getMainInstaList = () => {
    api.get('main-instagram')
        .then(response => {
            mainInstaList.value = response.data.items
        })
}

const onSelectMainCategory = (index: any) => {
    productMainCategories.value.forEach(it => {
        it.selected = false
    })
    productMainCategories.value[index].selected = true
}

const onMainBannerClick = (banner: IMainBanner) => {
    if (banner.address.length > 0) {
        if (banner.target == 0) {
            location.href = banner.address.startsWith("http") ? banner.address : "http://" + banner.address
        } else if (banner.target == 1) {
            window.open(banner.address.startsWith("http") ? banner.address : "http://" + banner.address)
        }
    }
}

const onMoreYoutube = () => {
    window.open('https://www.youtube.com/channel/UCbiIeCqRamyeuGghUFiCBSQ')
}

const onMoreInsta = () => {
    window.open('https://www.instagram.com/kujungmaru')
}
</script>

<template>
    <div class="flex flex-col">
        <section class="w-full flex pt-[55px] md:pt-[80px] lg:md:pt-[126px]" id="topBanner">
            <Carousel class="w-full h-full flex justify-center" :touchDrag="true" :itemsToShow="1" :wrapAround="true"
                :autoplay="mainBannerAutoPlay ? 3000 : 0" :transition="500" @slide-end="handleMainBannerSlideEnd">
                <Slide class="h-full p-0" v-for="(item, index) in mainBannerList" :key="index">
                    <div v-show="item.format == 'image'" class="w-full h-[calc(100vh-55px)] md:h-[calc(100vh-80px)] lg:h-[calc(100vh-126px)]">
                        <img :src="SCREEN_WIDTH > 1024 ? item.image_url : item.image_url_mobile"
                            @click="() => onMainBannerClick(item)" class="w-full h-full object-cover" />
                    </div>
                    <div v-show="item.format == 'video'" class="w-full h-[calc(100vh-55px)] md:h-[calc(100vh-80px)] lg:h-[calc(100vh-126px)] relative">
                        <iframe :src="Common.getYoutubeUrl(Common.getYoutubeIdFromURL(item.video_url), true, true, 0)"
                            class="w-full h-full" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen />
                        <div class="rs-fullvideo-cover"></div>
                    </div>
                </Slide>
                <template #addons>
                    <!-- <Navigation /> -->
                    <div
                        class="absolute flex flex-row items-center bottom-[28px] right-[25px] lg:bottom-[74px] lg:right-[130px]">
                        <p class="text-white text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] mr-[7px]">{{
                            Number(mainBannerSlideIndex).toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            }) }}</p>
                        <Pagination />
                        <p class="text-white text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] ml-[7px]">
                            {{ Number(mainBannerList?.length).toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            }) }}</p>
                        <font-awesome-icon v-if="mainBannerAutoPlay" icon="fa-solid fa-circle-pause"
                            class="text-[15px] lg:text-[18px] ml-[5px] text-white cursor-pointer"
                            @click="onPauseMainBannerSlide" />
                        <font-awesome-icon v-else icon="fa-solid fa-circle-play"
                            class="text-[15px] lg:text-[18px] ml-[5px] text-white fa-circle-play"
                            @click="onResumeMainBannerSlide" />
                    </div>
                </template>
            </Carousel>
        </section>
        <section class="flex justify-center px-[20px] md:px-[0px]">
            <PageWrapper>
                <div class="pt-[120px] md:pt-[130px] pb-[100px]">
                    <h1 class="text-center mb-[56px] md:mb-[30px]" data-aos="fade-in" data-aos-duration="1000"
                        data-aos-delay='100'>BEST PRODUCT</h1>
                    <div v-if="bestProductList && bestProductList?.length > 0"
                        class="flex flex-col md:flex-row gap-x-[12px] gap-y-[50px]" data-aos="fade-up"
                        data-aos-duration="1000" data-aos-delay='100'>
                        <div class="cursor-pointer flex-1"
                            @click="navigateTo(`/product/detail?id=${bestProductList[0].id}`)">
                            <img :src="bestProductList[0]?.productImages[2] ? bestProductList[0]?.productImages[2].image_url : bestProductList[0]?.productImages[0].image_url"
                                class="w-full object-cover h-[230px] lg:h-[400px]" />
                        </div>
                        <div class="flex flex-col gap-[11px]">
                            <template v-for="product in bestProductList.slice(1, 4)">
                                <CardBestProduct
                                    :image-url="Common.getThumbnailUrl(product.productImages[2] ? product.productImages[2].image_url : product.productImages[0].image_url)"
                                    :title="product?.title" @click="navigateTo(`/product/detail?id=${product.id}`)"
                                    :category1="product?.category_level1?.name"
                                    :category2="product?.category_level2?.name" />
                            </template>
                        </div>
                    </div>
                    <Line class="mt-[50px]" />
                    <p class="text-center mt-[50px] text-[#2C2B29] font-OptimaLTStd text-[16px] md:text-[26px] lg:text-[28px]"
                        data-aos="fade-in" data-aos-duration="1500" data-aos-delay='100'>
                        A man travels the world over in search of<br />
                        what he needs and returns home to find it.
                    </p>
                    <p
                        class="text-center text-[#2C2B29] mt-[20px] font-OptimaLTStd text-[16px] md:text-[26px] lg:text-[28px]">
                        - George Moore</p>
                    <p
                        class="text-[13px] md:text-[18px] lg:text-[24px] font-bold text-black text-center mt-[50px] lg:mt-[80px]">
                        당신의 공간의 아름다움을 발견하게 도와주는<br />
                        구정마루의 스토리를 만나보세요.
                    </p>
                    <div class="text-center mt-[36px] md:mt-[50px] lg:mt-[40px]">
                        <a href="/brand/story/kujungTime">
                            <button
                                class="w-[178px] md:w-[360px] lg:w-[640px] h-[62px] border-[1px] border-black text-black hover:text-white hover:bg-black text-center text-[18px] leading-[22px]">
                                브랜드 이야기</button>
                        </a>
                    </div>
                </div>
            </PageWrapper>
        </section>
        <section class="h-[150px] lg:h-[200px] flex justify-center items-center text-center relative">
            <img src="/img/maru_guide_lg.png" class="w-full h-full object-fill absolute" />
            <a href="/product/guide/select-guide" class="z-[1]">
                <span class="text-white font-bold text-[24px] md:text-[30px] lg:text[34px]" data-aos="fade-up"
                    data-aos-duration="1000" data-aos-delay="200">마루 선택 가이드</span>
            </a>
        </section>
        <section class="pt-[100px] md:pt-[110px] text-center flex flex-col justify-center items-center">
            <p class="text-[25px] md:text-[40px] mb-[52px] md:mb-[60px] lg:mb-[100px] font-OptimaLTStd">All About Space</p>
            <div class="gap-[20px] z-10">
                <template v-for="(category, index) in productMainCategories">
                    <BtnAllAboutSpace :text="category.name" :selected="category.selected"
                        class="my-[10px] mx-[6px] lg:mx-[10px] w-[112px] lg:w-[172px]"
                        @mouseover="onSelectMainCategory(index)" />
                </template>
            </div>
            <MainRecommendProducts class="mt-[50px]" :index="productMainCategories.findIndex(it => it.selected)"
                :products="productMainCategories[productMainCategories.findIndex(it => it.selected)].products" />
        </section>

        <section class="pt-[72px] md:pt-[120px] lg:pt-[140px] text-center flex flex-col justify-center items-center">
            <h1 class="mb-[50px] md:mb-[60px] lg:mb-[63px]" data-aos="fade-in">랜선집들이</h1>
            <div class="w-full lg:px-[90px] md:ml-0 max-w-[1280px] block md:hidden lg:block" data-aos="fade-up"
                data-aos-duration="1500">
                <Carousel :itemsToShow="3" :wrapAround="true" snap-align="start">
                    <Slide v-for="slide in mainHouseList" :key="slide.id">
                        <div class="w-[116px] md:w-[320px] lg:w-[320px] self-start">
                            <CardMainLanHouseWarming :item="slide" />
                        </div>
                    </Slide>
                </Carousel>
            </div>
            <div class="w-full lg:px-[90px] md:ml-0 max-w-[1280px] hidden md:block lg:hidden" data-aos="fade-up"
                data-aos-duration="1500">
                <Carousel :itemsToShow="2.2" :wrapAround="true" snap-align="start">
                    <Slide v-for="slide in mainHouseList" :key="slide.id">
                        <div class="w-[116px] md:w-[320px] lg:w-[320px] self-start">
                            <CardMainLanHouseWarming :item="slide" />
                        </div>
                    </Slide>
                </Carousel>
            </div>
        </section>

        <section class="bg-[#FFFEF2] mt-[73px] md:[mt-120px] flex justify-center">
            <div class="max-w-[1280px] flex flex-col lg:flex-row justify-center items-center">
                <div class="mt-[100px] md:mt-[120px] lg:mt-0 flex" id="interiorTipBanner">
                    <Carousel class="w-[360px] h-[360px] lg:w-[500px] lg:h-[500px] flex justify-center" :touchDrag="true"
                        :itemsToShow="1" :wrapAround="true" :autoplay="interiorAutoPlay ? 2000 : 0" :transition="500"
                        @slide-end="handleInteriorBannerSlideEnd">
                        <Slide class="w-full h-full p-0" v-for="(item, index) in mainConstructionCaseList" :key="index">
                            <a :href="item.url" target="_blank">
                                <img :src="item.thumb_url"
                                    class="w-[360px] h-[360px] lg:w-[500px] lg:h-[500px] object-cover" />
                            </a>
                        </Slide>
                        <template #addons>
                            <div class="absolute flex flex-row items-center bottom-[22px]">
                                <p class="text-white text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] mr-[7px]">
                                    {{
                                        Number(constructionSlideIndex).toLocaleString('en-US', {
                                            minimumIntegerDigits: 2,
                                            useGrouping: false
                                        }) }}</p>
                                <Pagination />
                                <p class="text-white text-[15px] leading-[20px] md:text-[18px] md:leading-[24px] ml-[7px]">
                                    {{ Number(mainConstructionCaseList?.length).toLocaleString('en-US', {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false
                                    }) }}</p>
                                <font-awesome-icon v-if="interiorAutoPlay" icon="fa-solid fa-circle-pause"
                                    class="text-[15px] lg:text-[18px] ml-[5px] text-white cursor-pointer"
                                    @click="onPauseInteriorSlide" />
                                <font-awesome-icon v-else icon="fa-solid fa-circle-play"
                                    class="text-[15px] lg:text-[18px] ml-[5px] text-white fa-circle-play"
                                    @click="onResumeInteriorSlide" />
                            </div>
                        </template>
                    </Carousel>
                </div>
                <div
                    class="flex flex-col justify-center px-[22px] py-[100px] md:py-[120px] items-center w-full lg:ml-[100px]">
                    <img src="/img/peice.png" class="w-[83px] h-[83px]" />
                    <h1 class="pt-[30px] lg:pt-[60px] pb-[30px] ">최신 인테리어 트렌드 TIP</h1>
                    <p class="text-[15px] lg:text-[18px] leading-[22px] mb-[54px] text-center">마루와 어울리는 인테리어를
                        보고싶다면<br />구정마루로
                        시공 된 고객님들의 홈
                        스타일링을<br />지금 블로그에서 확인하세요</p>
                    <a href="https://blog.naver.com/PostList.nhn?blogId=kujungmaru11&from=postList&categoryNo=60&parentCategoryNo=60"
                        target="_blank">
                        <BtnPrimary text="+ VIEW MORE" class="w-[178px]" />
                    </a>
                </div>
            </div>
        </section>

        <section
            class="flex flex-col relative pb-[172px] md:pb-[325px] lg:pb-[136px] pt-[100px] md:pt-[120px] lg:pt-[130px] px-[20px] md:px-0 text-center">
            <div class="absolute top-[120px] md:top-[140px] lg:top-[170px] right-0 bottom-0 left-0">
                <img src="/img/key-word.png" class="w-full h-full object-contain" />
            </div>
            <h1 class="mb-[50px] md:mb-[60px] lg:mb-[100px]" data-aos="fade-in">#키워드로 검색하세요</h1>
            <div class="flex flex-row gap-[30px] justify-center z-10" data-aos="fade-up" data-aos-duration="1500">
                <div class="flex-1 flex flex-row justify-center gap-x-[20px] lg:gap-x-[50px]">
                    <div class="flex flex-col items-end flex-wrap gap-y-[20px] md:gap-y-[30px] lg:gap-y-[46px] flex-1">
                        <BtnKeyword :text="item.name" v-for="(item, index) in mainSearchTermList"
                            @click="navigateTo(`/search?keyword=${item.name}`)" />
                    </div>
                    <div class="flex flex-col items-start flex-wrap gap-y-[20px] md:gap-y-[30px] lg:gap-y-[46px] flex-1">
                        <BtnKeyword :text="item.name" v-for="(item, index) in mainTagList" class="bg-primary-500"
                            @click="navigateTo(`/search?keyword=${item.name}`)" />
                    </div>
                </div>

            </div>
        </section>

        <section class="bg-[#FFFEF2] pt-[100px] md:pt-[120px] lg:pt-[110px] pb-[100px] md:pb-[120px] text-center">
            <div class="flex items-center justify-center gap-[11px]">
                <h1>구정 ON</h1>
                <img src="/img/icons/youtube.svg" width="28" alt="youtube" />
            </div>
            <p class=" text-warmGray-900 text-body1 mt-[10px]">유튜브에서 구정마루의 다양한 TIP을 확인하세요</p>
            <div class="mt-[70px] mb-[100px]">
                <Carousel id="activeClasses" :itemsToShow="Math.min(3.5, SCREEN_WIDTH / 230)" :wrapAround="true"
                    :autoplay="2000" :transition="500">
                    <Slide v-for="(item, index) in mainYoutubeList" :key="index">
                        <a :href="item.video_url" target="_blank">
                            <img :src="item.thumb_url" :alt="item.title" width="425" height="260" />
                        </a>
                    </Slide>
                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>
            <BtnPrimary text="+ VIEW MORE" class="w-[178px]" :onClick="() => onMoreYoutube()" />
        </section>

        <section class="pt-[100px] md:pt-[120px] lg:pt-[110px] pb-[100px] md:pb-[120px] text-center">
            <div class="flex items-center justify-center gap-[11px]">
                <h1>INSTAGRAM</h1>
                <img src="/img/icons/intagram.svg" width="28" alt="youtube" />
            </div>
            <p class=" text-warmGray-900 text-body1 mt-[10px]">@kujungmaru에서 소식을 확인하세요</p>
            <div class="mt-[70px] mb-[100px]">
                <Carousel :itemsToShow="Math.min(10, SCREEN_WIDTH / 280)" :wrapAround="true" :autoplay="2000">
                    <Slide v-for="(item, index) in mainInstaList" :key="index">
                        <div class="intagram__item">
                            <a :href="item.instagram_url" target="_blank">
                                <img :src="item.thumb_url" :alt="item.title" class="w-full object-cover" />
                            </a>
                        </div>
                    </Slide>
                </Carousel>
            </div>
            <BtnPrimary text="+ VIEW MORE" class="w-[178px]" :onClick="() => onMoreInsta()" />
        </section>

        <section
            class="flex justify-center items-center bg-warmGray-900 pt-[74px] md:pt-[113px] pb-[46px] px-[28px] md:px-[128px]">
            <PageWrapper>
                <p class="text-white text-[18px] leading-[22px] flex cursor-pointer" @click="navigateTo('/service/custom-center/faq')">무엇을 도와드릴까요?</p>
                <div class="flex flex-col gap-[25px] mt-[20px] md:mt-[22px]">
                    <div class="border-b border-white max-w-[233px]"></div>
                    <span class="text-white text-[18px] leading-[22px] cursor-pointer"
                        @click="navigateTo('/brand/showroom/headquarters_showroom')">전시장 안내</span>
                    <div class="border-b border-white max-w-[233px]"></div>
                    <span class="text-white text-[18px] leading-[22px] cursor-pointer"
                        @click="navigateTo('/service/custom-center/smart-as')">A/S 안내</span>
                    <div class="border-b border-white max-w-[233px]"></div>
                    <span class="text-white text-[18px] leading-[22px] cursor-pointer"
                        @click="navigateTo('/product/catalogue/catalogue?type=카탈로그')">카탈로그</span>
                    <div class="border-b border-white max-w-[233px]"></div>
                </div>
            </PageWrapper>
        </section>
    </div>
</template>
<style lang="scss">
.intagram__item {
    height: 260px;
    width: 260px;
    // background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#topBanner {
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

#interiorTipBanner {
    .carousel__slide {
        padding: 0px;
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


#activeClasses {
    .carousel__slide {
        padding: 5;
    }

    .carousel__viewport {
        perspective: 2000px;
    }

    .carousel__track {
        transform-style: preserve-3d;
    }

    .carousel__slide--sliding {
        transition: 0.5s;
    }

    .carousel__slide {
        opacity: 0.9;
        transform: scale(0.8);
    }

    .carousel__slide--active~.carousel__slide {
        transform: scale(0.8);
    }

    .carousel__slide--prev {
        opacity: 1;
        transform: scale(0.9);
    }

    .carousel__slide.carousel__slide--next {
        opacity: 1;
        transform: scale(0.9);
    }

    .carousel__slide--active {
        opacity: 1;
        transform: rotateY(0) scale(1.1);
    }
}
</style>