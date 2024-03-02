<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { useStore } from '~/stores/common';
import { Common } from '~~/ts/_utils/common';
import ModalSearch from "~~/components/ModalSearch.vue";
import { useModal } from 'vue-final-modal';

const store = useStore();
const isBrand = computed(() => store.isBrand);
const isProduct = computed(() => store.isProduct);
const isConstructionEx = computed(() => store.isConstructionEx);
const isSmartService = computed(() => store.isSmartService);
const isService = computed(() => store.isService);
const showNavbar = computed(() => store.showNavbar);
const brandMenuele = ref(null);
const brandContainerEle = ref(null);

const handleBrand = () => {
    store.setIsBrand(!store.isBrand);
}

onClickOutside(
    brandContainerEle,
    (event) => {
        store.setIsBrand(false);
    },
    {
        ignore: [brandMenuele]
    }
)

const onLogout = () => {
    store.setIsMenuPopup(false)
    sessionStorage.clear()
    store.setProfileInfo(null)
    store.setIsLoggedIn(false)
    location.href = "/"
}

const onSearch = () => {
    store.setIsMenuPopup(false)
    const m = useModal({
        component: ModalSearch,
        attrs: {
            title: '',
            onConfirm(p_keyword: string | null) {
                if (p_keyword) {
                    navigateTo(`/search?keyword=${p_keyword}`)
                }
                store.setCurModalIndicator(null)
                m.close()
            },
        },
        slots: {
            default: ``,
        },
    })
    store.setCurModalIndicator(m)
    m.open()
}

</script>
<template>
    <div class="flex flex-col top-0 fixed w-full z-20">
        <div class="banner bg-primary-600 py-[14px] flex justify-center px-[20px] md:px-0">
            <PageWrapper>
                <ul class="flex gap-2 float-right">
                    <div v-if="!store.isLoggedIn" class="flex gap-2">
                        <li class="banner-text" @click="() => {
                            store.setIsMenuPopup(false)
                            navigateTo('/login')
                        }">로그인</li>
                        <li class="banner-text">|</li>
                        <li class="banner-text" @click="() => {
                            store.setIsMenuPopup(false)
                            navigateTo('/signup')
                        }">
                            회원가입
                        </li>
                    </div>
                    <div v-if="store.isLoggedIn" class="flex gap-2">
                        <li class="banner-text" @click="onLogout">로그아웃</li>
                        <li class="banner-text">|</li>
                        <li class="banner-text" @click="() => {
                            store.setIsMenuPopup(false)
                            navigateTo('/mypage/home/dashboard')
                        }">
                            {{ store.profileInfo?.nickname }} 님
                        </li>
                    </div>
                    <select class="bg-transparent banner-text">
                        <option>KOR</option>
                    </select>
                </ul>
            </PageWrapper>
        </div>
        <el-collapse-transition>
            <div v-if="showNavbar || store.isMenuPopup">
                <div class="menu bg-[#f2efe2] py-[16px] md:py-0 md:h-[80px] flex items-center justify-center">
                    <PageWrapper>
                        <div class="w-full h-full flex items-center justify-between px-[20px] lg:px-0">
                            <div class="h-full flex items-center gap-[56px] lg:gap-[68px]">
                                <div class="flex items-center gap-[25px]">
                                    <img src="/img/logos/logo.svg" alt="logo" @click="() => {
                                        store.setIsMenuPopup(false)
                                        navigateTo('/')
                                    }"
                                        class="cursor-pointer w-[25px] md:w-[42px] lg:w-[34px] h-[25px] md:h-[42px] lg:h-[34px]" />
                                </div>
                                <ul class="hidden lg:flex gap-[40px] lg:gap-[56px] h-full">
                                    <li ref="brandMenuele"
                                        class="border-b-[7px] border-b-transparent hover:border-b-[7px] hover:border-primary-400 flex items-center"
                                        @mouseover="store.setIsBrand(true);" @mouseleave=" store.setIsBrand(false);">
                                        <span>브랜드</span>
                                    </li>
                                    <li class="border-b-[7px] border-b-transparent hover:border-b-[7px] hover:border-primary-400 flex items-center"
                                        @mouseover=" store.setIsProduct(true);" @mouseleave=" store.setIsProduct(false);">
                                        <span>제품소개</span>
                                    </li>
                                    <li class="border-b-[7px] border-b-transparent hover:border-b-[7px] hover:border-primary-400 flex items-center"
                                        @mouseover=" store.setIsConstructionEx(true);"
                                        @mouseleave=" store.setIsConstructionEx(false);">
                                        <span>시공사례</span>
                                    </li>
                                    <li class="border-b-[7px] border-b-transparent hover:border-b-[7px] hover:border-primary-400 flex items-center"
                                        @mouseover=" store.setIsSmartService(true);"
                                        @mouseleave=" store.setIsSmartService(false);">
                                        <span>살면서! 마루교체</span>
                                    </li>
                                    <li class="border-b-[7px] border-b-transparent hover:border-b-[7px] hover:border-primary-400 flex items-center"
                                        @mouseover=" store.setIsService(true);" @mouseleave=" store.setIsService(false);">
                                        <span>서비스</span>
                                    </li>
                                </ul>
                            </div>
                            <ul class="flex items-center gap-[10px] md:gap-[30px]">
                                <li @click="onSearch">
                                    <img src="/img/icons/navbar/search.png"
                                        class="w-[25px] h-[25px] md:w-[40px] md:h-[40px] lg:w-[26px] lg:h-[26px]"
                                        alt="search" />
                                </li>
                                <li v-if="store.isLoggedIn" class="hidden md:flex" @click="() => {
                                    store.setIsMenuPopup(false)
                                    navigateTo('/mypage/interest/wish-product')
                                }">
                                    <img src="/img/icons/navbar/favorite.png"
                                        class="w-[25px] md:w-[40px] md:h-[40px] lg:w-[26px] h-[25px] lg:h-[26px]"
                                        alt="favorite" />
                                </li>
                                <li v-if="store.isLoggedIn" class="hidden md:flex" @click="() => {
                                    store.setIsMenuPopup(false)
                                    navigateTo('/mypage/home/dashboard')
                                }">
                                    <img src="/img/icons/navbar/person.png"
                                        class="w-[25px] md:w-[40px] md:h-[40px] lg:w-[26px] h-[25px] lg:h-[26px]"
                                        alt="person" />
                                </li>
                                <li>
                                    <img src="/img/icons/menu.svg" alt="toogle menu"
                                        @click="store.setIsMenuPopup(!store.isMenuPopup)"
                                        class="cursor-pointer w-[25px] h-[25px] md:w-[40px] md:h-[40px] lg:hidden" />
                                </li>
                            </ul>
                        </div>
                    </PageWrapper>
                </div>
            </div>
        </el-collapse-transition>
        <div ref="brandContainerEle">
            <MenuPopup v-show="store.isMenuPopup" />
            <MenuBrand v-show="isBrand" :onHideMenu="() => store.setIsBrand(false)" />
            <MenuProduct v-show="isProduct" :onHideMenu="() => store.setIsProduct(false)" />
            <MenuConstructionEx v-show="isConstructionEx" :onHideMenu="() => store.setIsConstructionEx(false)" />
            <MenuSmartService v-show="isSmartService" :onHideMenu="() => store.setIsSmartService(false)" />
            <MenuService v-show="isService" :onHideMenu="() => store.setIsService(false)" />
        </div>
    </div>
</template>

<style scoped>
.banner-text {
    @apply font-bold text-[13px] leading-[18px] text-white cursor-pointer;
    text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
}

.menu {
    box-shadow: 0px 3px 2px rgba(86, 86, 86, 0.1);
    backdrop-filter: blur(4px);
}

.menu li {
    @apply font-bold text-[18px] leading-[22px] text-warmGray-800 cursor-pointer;
    /* text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25); */
}
</style>