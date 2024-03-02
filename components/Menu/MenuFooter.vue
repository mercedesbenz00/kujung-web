<script lang="ts" setup>
import { useStore } from '~/stores/common';
import { SCREEN_HEIGHT } from '~~/ts/constants';
const props = defineProps({
    onHideMenu: {
        type: Function,
        default() {
        }
    }
});

const store = useStore();

const selectedSubMenuIdx = ref(0)

</script>

<template>
    <el-collapse-transition>
        <div>
            <div class="block lg:hidden px-[40px] md:px[50px] pt-[35px] md:pt-[25px] pb-[44px] md:pb-[32px]">
                <div class="flex flex-row">
                    <a href="/smartstore">
                        <p class="text-[14px] font-bold text-warmGray-800 hover:text-primary-400 cursor-pointer">스마트 스토어</p>
                    </a>
                    <a href="/product/guide/select-guide">
                        <p class="text-[14px] font-bold text-warmGray-800 hover:text-primary-400 cursor-pointer ml-[30px]">
                            좋은 마루 고르는 법</p>
                    </a>
                    <p class="text-[14px] font-bold text-warmGray-800 hover:text-primary-400 cursor-pointer ml-[30px]">
                        약관
                    </p>
                </div>
                <ul class="flex items-center gap-[18px] mt-[25px]">
                    <li class="cursor-pointer">
                        <img src="/img/icons/menu/blog.svg" alt="blog" width="30" height="30" />
                    </li>
                    <li class="cursor-pointer">
                        <img src="/img/icons/menu/intagram.svg" alt="intagram" width="30" height="30" />
                    </li>
                    <li class="cursor-pointer">
                        <img src="/img/icons/menu/youtube.svg" alt="youtube" width="30" height="30" />
                    </li>
                </ul>
            </div>

            <div class="hidden lg:flex items-center gap-[54px]">
                <ul class="flex gap-[40px]">
                    <a href="/smartstore">
                        <li class=" text-gray-800 text-body2 font-bold cursor-pointer hover:text-primary-400">스마트
                            스토어
                        </li>
                    </a>
                    <a href="/product/guide/select-guide">
                        <li class=" text-gray-800 text-body2 font-bold cursor-pointer hover:text-primary-400">좋은 마루 고르는 법
                        </li>
                    </a>
                    <li class=" text-gray-800 text-body2 font-bold cursor-pointer hover:text-primary-400">약관</li>
                </ul>
                <ul class="flex items-center gap-[18px]">
                    <li class="cursor-pointer">
                        <a target="_blank" href="https://blog.naver.com/kujungmaru11">
                            <img src="/img/icons/menu/blog.svg" alt="blog" width="30" height="30" />
                        </a>
                    </li>
                    <li class="cursor-pointer">
                        <a target="_blank" href="https://www.instagram.com/kujungmaru">
                            <img src="/img/icons/menu/intagram.svg" alt="intagram" width="30" height="30" />
                        </a>
                    </li>
                    <li class="cursor-pointer">
                        <a target="_blank" href="https://www.youtube.com/@ON-dv2vs">
                            <img src="/img/icons/menu/youtube.svg" alt="youtube" width="30" height="30" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </el-collapse-transition>
</template>