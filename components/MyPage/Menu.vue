<script lang="ts" setup>
const route = useRoute();
import { SCREEN_WIDTH } from '~~/ts/constants';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const emit = defineEmits(['some-event'])
// props
const props = defineProps({
});

onMounted(() => {
    // carousel이 타 화면에 갔다오면 동작하지 않는것에 대한 해결책
    setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
    }, 1000);
})

const menuList = [
    {
        title: "HOME",
        selected: false,
        title_route: "home",
        subMenu: [
            {
                title: "마이 페이지",
                title_route: "dashboard"
            }
        ]
    },
    {
        title: "나의 관심",
        selected: false,
        title_route: "interest",
        subMenu: [
            {
                title: "최근 본 상품",
                title_route: "recent-product"
            },
            {
                title: "관심 상품",
                title_route: "wish-product"
            },
        ]
    },
    {
        title: "나의 집들이",
        selected: false,
        title_route: "my-construction-ex",
        subMenu: [
            {
                title: "나의 집들이",
                title_route: "list"
            },
        ]
    },
    {
        title: "내가 쓴 글",
        selected: false,
        title_route: "my-writes",
        subMenu: [
            {
                title: "스마트케어\n서비스 신청 내역",
                title_route: "smart-care"
            },
            {
                title: "1:1문의 내역",
                title_route: "inquiry"
            },
        ]
    },
    {
        title: "포인트",
        selected: false,
        title_route: "point",
        subMenu: [
            {
                title: "포인트 내역",
                title_route: "point-history"
            },
        ]
    },
    {
        title: "나의 정보",
        selected: false,
        title_route: "myinfo",
        subMenu: [
            {
                title: "회원정보 수정",
                title_route: "edit-main"
            },
            {
                title: "추가정보 수정",
                title_route: "edit-more"
            },
            {
                title: "회원탈퇴",
                title_route: "withdrawal"
            },
        ]
    },
]
</script>
<template>
    <!-- PC 메뉴 -->
    <div class="hidden lg:flex flex-col gap-y-[30px] mt-[50px] mr-[50px]">
        <div class="flex flex-col gap-y-[15px]" v-for="item in menuList">
            <p class="text-[15px] text-black font-bold">
                {{ item.title }}
            </p>
            <p class="text-[15px] text-warmGray-800 ml-[5px] cursor-pointer whitespace-pre-line break-keep"
                @click="() => { navigateTo('/mypage/' + item.title_route + '/' + subItem.title_route) }"
                v-for="subItem in item.subMenu"
                :class="route?.path?.includes(subItem.title_route) ? 'text-primary-400 font-bold' : ''">
                {{ subItem.title }}
            </p>
        </div>
    </div>

    <!-- 모바일 메뉴 -->
    <div class="flex flex-col lg:hidden w-full mb-[80px] md:mb-[60px]">
        <p class="text-[24px] md:text-[34px] text-black font-bold self-center">
            마이페이지
        </p>
        <Line class="w-full mt-[42px]" />

        <p class="text-[22px] md:text-[24px] text-black font-bold mt-[30px] md:mt-[80px]">
            분류
        </p>
        <div class="flex flex-col lg:hidden max-w-[728px] w-full">
            <div class="">
                <Line class="border-warmGray-600 mt-[10px] md:mt-[15px]" />
                <section class="w-full flex" id="menuContainer">
                    <Carousel class="w-full h-full flex justify-center" snapAlign="start"
                        :itemsToShow="SCREEN_WIDTH > 768 ? 4.5 : 3.5" :transition="500">
                        <Slide class="h-full p-0" v-for="(item, index) in menuList" :key="index">
                            <BtnMyPageMenu :text="item.title" :selected="route?.path.includes(item.title_route)"
                                :onClick="(e: any) => { navigateTo('/mypage/' + item.title_route + '/' + item.subMenu[0].title_route) }" />
                        </Slide>
                        <template #addons>
                            <Navigation />
                        </template>
                    </Carousel>
                </section>
                <Line class="border-warmGray-600" />
            </div>

            <div
                class="mt-[16px] md:mt-[3px] px-[20px] md:px-[44px] py-[22px] md:py-[30px] bg-warmGray-500 min-h-[160px] md:min-h-[120px] border-warmGray-600 border-[1px]">
                <div>
                    <div>
                        <BtnMyPageSubMenu
                            v-for="(subItem, index) in menuList.find(it => route.path.includes(it.title_route))?.subMenu"
                            :key="index" class="mr-[20px] md:mr-[30px] mb-[20px] md:mt-[12px]" :text="subItem.title"
                            :selected="route.path.includes(subItem.title_route)" :onClick="(e: any) => {
                                navigateTo('/mypage/' + menuList.find(it => route.path.includes(it.title_route))?.title_route + '/' + subItem.title_route)
                            }" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#menuContainer {
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