<script setup lang="ts">
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import { Product } from "~/ts/interfaces/Product";
import { api } from '~~/ts/api';
import { SCREEN_WIDTH } from '~~/ts/constants';

const props = defineProps({
    isGlobalRecommend: {
        type: Boolean,
        default: false
    }
});

const list = ref<Product[]>([])

onMounted(() => {
    // carousel이 타 화면에 갔다오면 동작하지 않는것에 대한 해결책
    setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
    }, 1000);
    loadProductList()
})

const loadProductList = async () => {
    var payLoad = { recommended: true }
    const res = await api.post(`/product/list`, payLoad)
    if (res.success) {
        list.value = res.data.items
    }
}
</script>


<template>
    <el-collapse-transition v-show="list.length > 0">
        <div class="w-full bg-warmGray-200 py-[34px] md:py-[40px] lg:py-[70px] flex justify-center">
            <div class="flex flex-col w-full max-w-[1080px]">
                <div class="w-full px-[8px]">
                    <p class="text-[18px] md:text-[24px] text-black font-bold">
                        {{ isGlobalRecommend ? "구정마루의 추천 상품" : "고객님이 좋아하실 만한 추천 제품" }}
                    </p>
                    <Line class="block lg:hidden mt-[10px]" />
                </div>
                <div class="mt-[30px] lg:mt-[20px] flex w-full" id="recommendList">
                    <Carousel class="w-full flex justify-center"
                        :itemsToShow="SCREEN_WIDTH > 1024 ? 4 : 3" :wrapAround="false" snapAlign="start" :transition="500">
                        <Slide class="p-0" v-for="(item, index) in list" :key="index">
                            <CardProduct :product="item" />
                        </Slide>
                        <template #addons>
                            <Navigation />
                        </template>
                    </Carousel>
                </div>
            </div>
        </div>
    </el-collapse-transition>
</template>

<style lang="scss">
#recommendList {
    .carousel__slide {
        padding: 0px;
        position: relative;
    }

    .carousel__prev,
    .carousel__next {
        background: rgba(48, 48, 45, 0.5);
        width: 26px;
        height: 26px;
        margin: 0;
        position: absolute;
        top: 50px;

        @media (min-width: 768px) {
            width: 48px;
            height: 48px;
            top: 100px;
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