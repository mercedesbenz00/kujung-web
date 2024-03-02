<script lang="ts" setup>
import { useStore } from '~/stores/common';
import { CONSTRUCTION_SUBMENU_LIST } from '~~/ts/constants';

const props = defineProps({
    onHideMenu: {
        type: Function,
        default() {
        }
    }
});

const store = useStore();
const selectedSubMenuIdx = ref(0)
const hovering = ref(false)

const onItemClick = (p_navRoute: string) => {
    props.onHideMenu()
    navigateTo(p_navRoute)
    // location.href = p_navRoute
}

const onSubtitleTitleClick = (index: number) => {
    if (CONSTRUCTION_SUBMENU_LIST[index].children.length > 0) {
        return
    }
    if (hovering.value) {
        hovering.value = false
        return
    }
    onItemClick(`/construction-ex/${CONSTRUCTION_SUBMENU_LIST[index].title_route}`)
}

const onSubtitleHover = (e: any, index: number) => {
    selectedSubMenuIdx.value = index
    hovering.value = true
    e.toElement.click()
}

</script>

<template>
    <el-collapse-transition>
        <div class="relative flex bg-warmGray-400 bg-opacity-30 lg:rounded-br-[200px]"
            @mouseover="store.setIsConstructionEx(true);" @mouseleave="store.setIsConstructionEx(false)">
            <div class="lg:hidden">
                <i class="absolute right-0 top-0 las la-times self-end text-[25px] md:text-[35px] font-bold p-[15px] md:p-[30px] cursor-pointer"
                    @click="store.setIsConstructionEx(false)"></i>
            </div>

            <!-- LG 메뉴 사진 부분 -->
            <div class="pl-[132px] pr-[50px] py-[40px] bg-[#c2bfb54d] hidden lg:block">
                <img :src="CONSTRUCTION_SUBMENU_LIST[selectedSubMenuIdx].img" width="372" height="220" />
                <div class="pl-1">
                    <p class="text-body1 mt-[24px] mb-[50px]">{{ CONSTRUCTION_SUBMENU_LIST[selectedSubMenuIdx].title }}</p>
                    <p class="text-body2">{{ CONSTRUCTION_SUBMENU_LIST[selectedSubMenuIdx].desc }}</p>
                </div>
            </div>

            <!-- 메뉴 텍스트 부분 -->
            <div class="px-[30px] md:px-[50px] py-[40px] flex flex-col justify-between gap-[78px]">
                <div class="flex gap-[56px] h-[350px] ">
                    <el-tabs tab-position="left" class="menu-tabs">
                        <template v-for="(subMenu, index) in CONSTRUCTION_SUBMENU_LIST">
                            <el-tab-pane>
                                <template #label>
                                    <span @click=" onSubtitleTitleClick(index)"
                                        @mouseover="(e: any) => onSubtitleHover(e, index)"
                                        class="font-bold text-[15px] md:text-[17px] lg:text-[22px] leading-[20px] md:leading-[22px] lg:leading-[30px]">
                                        {{ subMenu.title }}
                                    </span>
                                </template>
                                <div class="flex" v-if="CONSTRUCTION_SUBMENU_LIST[selectedSubMenuIdx].children.length > 0">
                                    <div class="hidden lg:block h-[350px] border-l-[0.5px] border-warmGray-600 "></div>
                                    <ul
                                        class="flex flex-col gap-[16px] md:gap-[30px] lg:gap-[20px] px-[20px] lg:px-[50px] lg:py-2">
                                        <template v-for="  child   in   subMenu.children  ">
                                            <li class="text-body1 cursor-pointer hover:text-primary-400"
                                                @click=" onItemClick(`/construction-ex/${subMenu.title_route}/${child.title_route}`)">
                                                {{ child.title }}
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                            </el-tab-pane>
                        </template>
                    </el-tabs>
                </div>
                <!-- 모바일에서의 메뉴 사진 부분 -->
                <div
                    class="mx-[-30px] md:mx-[-50px] lg:mx-[0] px-[10px] md:px-[30px] py-[40px] flex flex-row items-center lg:hidden">
                    <img :src="CONSTRUCTION_SUBMENU_LIST[selectedSubMenuIdx].img" class="w-[160px] md:w-[200px] h-[94px] md:h-[120px]">
                    <div class="ml-[14px] md:ml-[34px]">
                        <p class="text-[15px] md:text-[18px] leading-[20px] md:leading-[24px] mb-[10px]">{{
                            CONSTRUCTION_SUBMENU_LIST[selectedSubMenuIdx].title }}</p>
                        <p class="text-[13px] md:text-[15px] leading-[18px] md:leading-[20px]">{{
                            CONSTRUCTION_SUBMENU_LIST[selectedSubMenuIdx].desc }}</p>
                    </div>
                </div>

                <MenuFooter class="mx-[-30px] md:mx-[-50px] lg:mx-[0]" />
            </div>
        </div>
    </el-collapse-transition>
</template>