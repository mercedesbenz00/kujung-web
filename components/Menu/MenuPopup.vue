<script lang="ts" setup>
import { useStore } from '~/stores/common';
import { BRAND_SUBMENU_LIST, PRODUCT_SUBMENU_LIST, CONSTRUCTION_SUBMENU_LIST, SMARTSERVICE_SUBMENU_LIST, SERVICE_SUBMENU_LIST, SCREEN_HEIGHT, SCREEN_WIDTH } from '~~/ts/constants';
const props = defineProps({
    onHideMenu: {
        type: Function,
        default() {
        }
    }
});

const store = useStore();

watch(() => store.isMenuPopup, (newConst, oldConst) => {
    if (newConst) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
})

const menus = [
    {
        title: '브랜드',
        base_route: "brand",
        sub_menu_list: BRAND_SUBMENU_LIST,
    },
    {
        title: '제품소개',
        base_route: "product",
        sub_menu_list: PRODUCT_SUBMENU_LIST,
    },
    {
        title: '시공사례',
        base_route: "construction-ex",
        sub_menu_list: CONSTRUCTION_SUBMENU_LIST,
    },
    {
        title: '살면서! 마루교체',
        base_route: "smartservice",
        sub_menu_list: SMARTSERVICE_SUBMENU_LIST,
    },
    {
        title: '서비스',
        base_route: "service",
        sub_menu_list: SERVICE_SUBMENU_LIST,
    },
]

const onMenuItemClick = (p_route: string) => {
    store.setIsMenuPopup(false);
    if (p_route.includes("http")) {
        window.open(p_route.substring(p_route.indexOf("http")), '_blank');
    } else {
        navigateTo(p_route)
    }
}

</script>

<template>
    <el-collapse-transition>
        <el-scrollbar always :height="SCREEN_HEIGHT - (SCREEN_WIDTH > 768 ? 126 : 103)" class="bg-warmGray-400">
            <div>
                <div class="flex flex-col bg-warmGray-400 lg:hidden min-h-[60vh]">
                    <i class="las la-times self-end text-[25px] md:text-[35px] font-bold p-[15px] md:p-[30px] cursor-pointer"
                        @click="store.setIsMenuPopup(false)"></i>

                    <div class="flex flex-col px-[17px] flex-1 menu-popup-collapse">
                        <el-collapse class="" accordion>
                            <el-collapse-item :name="item.title" v-for="(item, index) in menus" :key="index">
                                <template #title class="flex flex-col">
                                    <div class="flex flex-col">
                                        <div class="flex flex-row items-center md:items-center">
                                            <p class="text-[15px] md:text-[18px] font-bold leading-[22px]">
                                                {{ item.title }}
                                            </p>
                                        </div>
                                    </div>
                                </template>

                                <template v-for="subMenu in item.sub_menu_list" :key="subMenu.title">
                                    <div v-if="subMenu.children.length > 0" class="menu-popup-sub-collapse">
                                        <el-collapse class="" accordion>
                                            <el-collapse-item :name="subMenu.title" :key="subMenu.title">
                                                <template #title class="flex flex-col">
                                                    <div class="flex flex-col py-[10px] md:py-[20px]">
                                                        <div class="flex flex-row items-center md:items-center">
                                                            <p class="text-[12px] md:text-[15px] leading-[22px]">
                                                                {{ subMenu.title }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-for="subItem in subMenu.children">
                                                    <p class="text-warmGray-900 text-[12px] md:text-[15px] leading-[40px] ml-[9px] cursor-pointer"
                                                        @click="() => { onMenuItemClick(`/${item.base_route}/${subMenu.title_route}/${subItem.title_route}`) }">
                                                        {{ subItem.title }}
                                                    </p>
                                                </template>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                    <div v-else>
                                        <p class="text-warmGray-900 text-[12px] md:text-[15px] leading-[40px] cursor-pointer ml-[9px] "
                                            @click="() => { onMenuItemClick(`/${item.base_route}/${subMenu.title_route}`) }">
                                            {{ subMenu.title }}
                                        </p>
                                    </div>
                                </template>
                            </el-collapse-item>
                        </el-collapse>
                    </div>

                    <MenuFooter class="mt-[70px]" />
                </div>
            </div>
        </el-scrollbar>
    </el-collapse-transition>
</template>