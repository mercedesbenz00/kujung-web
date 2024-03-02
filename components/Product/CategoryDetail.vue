<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { Common } from '~~/ts/_utils/common';
import { Category } from '~/ts/interfaces/Category';

const props = defineProps({
    category: {
        type: Object as PropType<Category>,
        default: undefined
    }
});

</script>


<template>
    <div class="flex flex-col w-full max-w-[728px] lg:max-w-[1024px]">
        <ProductRecommendList class="mb-[50px] md:mb-[120px] block lg:hidden" />
        <div class="flex flex-col lg:hidden px-[10px] md:px-[0px]">
            <p class="text-[18px] md:text-[24px] font-bold text-black">{{ props.category?.name }} 안내</p>
            <Line class="mt-[10px]" />
        </div>
        <div class="mt-[38px] md:mt-[27px] lg:mt-[0px] flex flex-col">
            <img v-for="image in props.category?.categoryImages" :src="image.image_url" class="" />
        </div>
        <div class="flex flex-row w-full">
            <div class="mt-[38px] md:mt-[27px] flex w-full" id="youtubeBanner2">
                <div v-if="props.category?.categoryYoutubes?.length == 1" class="w-full flex justify-center relative">
                    <iframe :src="Common.getYoutubeUrl(Common.getYoutubeIdFromURL(props.category?.categoryYoutubes[0].url))"
                        class="w-full h-[320px] md:h-[680px]" title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen />
                </div>
                <Carousel v-else class="w-full flex justify-center relative" :touchDrag="false" :itemsToShow="1"
                    :wrapAround="false" :transition="500">
                    <Slide class="p-0" v-for="(item, index) in props.category?.categoryYoutubes" :key="index">
                        <iframe :src="Common.getYoutubeUrl(Common.getYoutubeIdFromURL(item.url))"
                            class="w-full h-[320px] md:h-[680px]" title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen />
                    </Slide>
                    <template #addons>
                        <Navigation />
                        <Pagination />
                    </template>
                </Carousel>
            </div>
        </div>

        <ProductList :category="category" class="block lg:hidden mt-[50px] mb-[100px] md:mb-[80px]" />

    </div>
</template>

<style lang="scss">
#youtubeBanner2 {
    .carousel__slide {
        padding: 0px;
    }

    .carousel__viewport {
        width: 100%;
    }

    .carousel__prev,
    .carousel__next {
        background: rgba(255, 255, 255, 0.5);
        // width: 50px;
        width: 0px !important;
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
        position: absolute;
        bottom: 37px;
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
        opacity: 0.5;
    }

}
</style>